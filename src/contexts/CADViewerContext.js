import axios from "axios";
import React, { createContext, useState } from "react";
import { decryptData } from "../utils/utils";

export const CADViewerContext = createContext();

const CADViewerContextProvider = ({ children }) => {
  const salt = process.env.SALT || "6d090796-ecdf-11ea-adc1-0242ac120003";
  const [viewerState, setViewerState] = useState({
    open: false,
    projectname: "",
    projectid: "",
    openfile: "",
    openfilematerial: "",
    cadFiles: [],
    cadFilesCount: 0,
    bendFeatures: [],
    toProcess: [],
    processingplan: null,
    paneldisabled: true,
    processplanButtonDisabled: true,
  });

  const [snackOpen, setSnackOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [ws, setws] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setUpWebSocketConnection = () => {
    let wsocket = new WebSocket("ws://localhost:8000/api/user/ws");

    wsocket.onopen = () => {
      // console.log("Connection successful");
    };

    wsocket.onclose = () => {
      // console.log("Connection closed");
    };

    wsocket.onmessage = async (msg) => {
      var obj = JSON.parse(msg.data);

      if (obj.message !== "files") {
        setSnackOpen(true);
        setMessage(obj.message);
        setCount(count + 1);
      }

      if (obj.message === "files") {
        const p = localStorage.getItem("_p");
        const pdata = decryptData(p, salt);

        const o = localStorage.getItem("_o");
        const odata = JSON.parse(decryptData(o, salt));

        await setViewerState({
          ...viewerState,
          projectname: pdata ? pdata : viewerState.projectname,
          projectid: viewerState.projectid,
          cadFiles: [...obj.data],
          cadFilesCount: obj.data.length,
          toProcess: obj.data.filter(
            (c) => c.feature_props.process_level !== 2
          ),
          openfile: odata ? odata : viewerState.openfile,
        });
      }
    };

    wsocket.onerror = (err) => {
      // console.log("Websocket:", err);
    };

    setws(wsocket);
  };

  const [count, setCount] = useState(0);

  const setBreadCrumbProject = async (project) => {
    axios
      .get("/api/user/projects/" + project.id + "/files")
      .then((response) => {
        if (response.statusText === "OK") {
          setViewerState({
            ...viewerState,
            projectname: project.title,
            projectid: project.id,
            cadFiles: [...response.data.data],
            cadFilesCount: response.data.data.length,
            toProcess: response.data.data.filter(
              (c) => c.feature_props.process_level !== 2
            ),
            openfile: "",
            paneldisabled: true,
            processplanButtonDisabled: true,
          });

          // setSnack({ ...snack, open: false, message: "" });

          if (!ws) {
            setUpWebSocketConnection();
          }

          return true;
        } else {
          return false;
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const setBreadCrumbFile = async (file, level) => {
    if (level === 1) {
      setViewerState({
        ...viewerState,
        openfile: file,
        openfilematerial: file.material_id,
        bendFeatures: [...file.bend_features],
        paneldisabled: false,
        processplanButtonDisabled: true,
      });
    } else if (level === 2) {
      await axios
        .get("/api/user/process/" + file.id)
        .then((response) => {
          if (response.statusText === "OK") {
            setViewerState({
              ...viewerState,
              openfile: file,
              openfilematerial: file.material_id,
              bendFeatures: [...file.bend_features],
              processingplan: response.data.data,
              paneldisabled: false,
              processplanButtonDisabled: false,
            });

            return true;
          } else {
            return false;
          }
        })
        .catch(function (error) {
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          console.log("Error", error.message);
          console.log(error.config);
        });
    } else
      setViewerState({
        ...viewerState,
        openfile: file,
        openfilematerial: file.material_id,
        bendFeatures: [],
        paneldisabled: true,
        processplanButtonDisabled: true,
      });
  };

  const deleteCadFile = async (id) => {
    axios
      .delete("/api/user/projects/" + viewerState.projectid + "/files/" + id)
      .then((response) => {
        if (response.statusText === "OK") {
          const newCadFileList = viewerState.cadFiles.filter(
            (p) => p.id !== id
          );

          setViewerState({
            ...viewerState,
            cadFiles: newCadFileList,
            openfile: "",
            paneldisabled: true,
          });

          return true;
        } else {
          return false;
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const processMany = async (selectedFiles) => {
    ws.send(JSON.stringify(selectedFiles));
  };

  const uploadFiles = async (formData) => {
    setLoading(true);
    await axios
      .post(
        "/api/user/projects/" + viewerState.projectid + "?operation=upload",
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      )
      .then((response) => {
        if (response.data.status === true) {
          setSuccess(true);
          setViewerState({
            ...viewerState,
            cadFiles: [...response.data.data, ...viewerState.cadFiles],
          });
          // setSuccess(false);
          // setLoading(false);
          return true;
        } else {
          return false;
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const setOpen = (open) => {
    setViewerState({ ...viewerState, open });
    setViewerState({ ...viewerState, openfile: "" });
  };

  return (
    <CADViewerContext.Provider
      value={{
        ...viewerState,
        setOpen,
        setBreadCrumbProject,
        setBreadCrumbFile,
        deleteCadFile,
        processMany,
        uploadFiles,
        snackOpen,
        message,
        setMessage,
        count,
        setCount,
        setSnackOpen,
        ws,
        setUpWebSocketConnection,
        loading,
        success,
      }}
    >
      {children}
    </CADViewerContext.Provider>
  );
};

export default CADViewerContextProvider;
