import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
// import { useSocket } from "../useSocket";
// import { getWebSocket } from "../utils/socket";
// import { taskData } from "../components/notifications/data";

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [count, setTaskCount] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { response, setResponse } = useSocket();

  // let wsocket = null;

  useEffect(() => {
    loadTasks();
    // setUpWebSocketConnection();
    return () => {
      setTasks([]); // This worked for me
    };
  }, []);

  // useEffect(() => {
  //   console.log("Task: ", response);
  //   if (response !== null) {
  //     if (response.type === "task") {
  //       if (response.data) {
  //         setTasks([...tasks, response.data]);
  //         setResponse(null);
  //       }
  //     }
  //   }
  // }, [response, tasks, setTasks, setResponse]);

  // const setUpWebSocketConnection = () => {
  //   wsocket = getWebSocket();

  //   // wsocket.onmessage = async (msg) => {
  //   //   var obj = JSON.parse(msg.data);

  //   //   if (obj.message !== "files") {
  //   //     // setSnackOpen(true);
  //   //     // setMessage(obj.message);
  //   //     // setCount(count + 1);
  //   //     console.log("Task: " + obj.message);
  //   //   }
  //   // };
  // };

  const loadTasks = async () => {
    return await axios
      .get("/api/user/tasks")
      .then((response) => {
        if (response.data.status === true) {
          setTaskCount(response.data.data.length);
          setTasks(response.data.data);
          setSearchList(response.data.data);
          setLoading(false);

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

  const addTask = async (project) => {
    await axios
      .post("/api/user/tasks", project)
      .then((response) => {
        if (response.statusText === "OK") {
          setTasks([response.data, ...tasks]);
          console.log("Saved...");

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

  const editTask = async (editedTask) => {
    await axios
      .put("/api/user/tasks", editedTask)
      .then((response) => {
        if (response.statusText === "OK") {
          const allTasks = tasks.filter(
            (project) => project.id !== editedTask.id
          );
          setTasks([response.data, ...allTasks]);
          console.log("Updated...");

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

  const findTask = (value) => {
    if (value !== "") {
      const found = tasks.filter((p) => p.title.toLowerCase().includes(value));
      setTasks([...found]);
    } else {
      setTasks([...searchList]);
    }
  };

  const removeTask = async (id) => {
    await axios
      .delete("/api/user/tasks/" + id)
      .then((response) => {
        if (response.statusText === "OK") {
          const newTasks = tasks.filter((project) => project.id !== id);

          setTasks([...newTasks]);

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

  return (
    <TaskContext.Provider
      value={{
        loading,
        loadTasks,
        tasks,
        count,
        addTask,
        editTask,
        findTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
