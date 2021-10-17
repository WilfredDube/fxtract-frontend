import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ProjectContext = createContext();

const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [count, setProjectCount] = useState(0);
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    return await axios
      .get("/api/user/projects")
      .then((response) => {
        if (response.data.status === true) {
          setProjectCount(response.data.data.length);
          setProjects(response.data.data);
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

  const addProject = async (project) => {
    await axios
      .post("/api/user/projects", project)
      .then((response) => {
        if (response.statusText === "OK") {
          setProjects([response.data, ...projects]);
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

  const editProject = async (editedProject) => {
    await axios
      .put("/api/user/projects", editedProject)
      .then((response) => {
        if (response.statusText === "OK") {
          const allProjects = projects.filter(
            (project) => project.id !== editedProject.id
          );
          setProjects([response.data, ...allProjects]);
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

  const findProject = (value) => {
    if (value !== "") {
      const found = projects.filter((p) =>
        p.title.toLowerCase().includes(value)
      );
      setProjects([...found]);
    } else {
      setProjects([...searchList]);
    }
  };

  const removeProject = async (id) => {
    console.log(id);
    await axios
      .delete("/api/user/projects/" + id)
      .then((response) => {
        if (response.statusText === "OK") {
          const newProjects = projects.filter((project) => project.id !== id);

          setProjects([...newProjects]);
          console.log("Deleted...");

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
    <ProjectContext.Provider
      value={{
        loading,
        loadProjects,
        projects,
        count,
        addProject,
        editProject,
        findProject,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
