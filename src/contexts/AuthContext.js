import axios from "axios";
import React, { useEffect, useState } from "react";

const authUrl = "/api/auth/login";
const signoutUrl = "/api/auth/logout";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  authenticate: () => {},
  signout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(-1);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [currLocation, setCurrLocation] = useState("");

  const isLoggedIn = async () => {
    return await axios
      .get("/api/user/profile")
      .then((response) => {
        if (response.data.status === true) {
          setUser(response.data.data);
          setUserRole(response.data.data.role);
          setIsAuthenticated(true);
          setLoading(false);
          setCurrLocation("/projects");

          return true;
        } else {
          return false;
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 403) {
            console.log("deactivate loading");
            setLoading(false);
            signout();
            setIsAuthenticated(false);
            console.log("signed out");
          }
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          //// console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const authenticate = async (credentials) => {
    return await axios
      .post(authUrl, credentials)
      .then((response) => {
        if (response.data.status === true) {
          setUser(response.data.data);
          setUserRole(response.data.data.role);
          setIsAuthenticated(true);
          setCurrLocation("/projects");
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

  const signout = async () => {
    return await axios
      .post(signoutUrl)
      .then((response) => {
        if (response.data.status === true) {
          setUserRole(-1);
          setIsAuthenticated(false);
          return true;
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
    <AuthContext.Provider
      value={{
        loading,
        currLocation,
        setCurrLocation,
        isAuthenticated: isAuthenticated,
        userRole,
        user: user,
        authenticate: authenticate,
        signout: signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
