import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";

export const ProjectContext = createContext();

const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      const { data } = await axios.get("/api/user/projects", {
        signal: controller.signal,
      });

      setProjects(data.data);
      setSearchList(data.data);
    })();
    return () => {
      mountedRef.current = false;
      controller?.abort();
    };
  }, []);

  const addProject = async (project) => {
    await axios.post("/api/user/projects", project).then((response) => {
      if (response.statusText === "OK") {
        setProjects([response.data, ...projects]);
        console.log("Saved...");

        return true;
      } else {
        return false;
      }
    });
  };

  const editProject = async (editedProject) => {
    await axios.put("/api/user/projects", editedProject).then((response) => {
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
    await axios.delete("/api/user/projects/" + id).then((response) => {
      if (response.statusText === "OK") {
        const newProjects = projects.filter((project) => project.id !== id);

        setProjects([...newProjects]);
        console.log("Deleted...");

        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, editProject, findProject, removeProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
