import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const MaterialContext = createContext();

const MaterialContextProvider = ({ children }) => {
  const [material, setMaterial] = useState([]);

  useEffect(() => {
    loadMaterial();
  }, []);

  const loadMaterial = async () => {
    return await axios
      .get("/api/user/materials")
      .then((response) => {
        if (response.data.status === true) {
          setMaterial(response.data.data);

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
    <MaterialContext.Provider value={{ material, loadMaterial }}>
      {children}
    </MaterialContext.Provider>
  );
};

export default MaterialContextProvider;
