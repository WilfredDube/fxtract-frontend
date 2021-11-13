import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

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
  const [authErr, setAuthErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currLocation, setCurrLocation] = useState("");

  const isLoggedIn = useCallback(async () => {
    setLoading(true);
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
            setLoading(false);
            signout();
            setIsAuthenticated(false);
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
        if (!error.response) {
          setAuthErr(
            error.message + ": Please check your internet connection."
          );
        }
      });
  }, []);

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  const authenticate = async (credentials) => {
    setLoading(true);
    return await axios
      .post(authUrl, credentials)
      .then((response) => {
        if (response.data.status === true) {
          setUser(response.data.data);
          setUserRole(response.data.data.role);
          setIsAuthenticated(true);
          setCurrLocation("/projects");
          setAuthErr(null);
          setLoading(false);
          return true;
        } else {
          return false;
        }
      })
      .catch(function (error) {
        setLoading(false);
        if (error.response) {
          setAuthErr(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log("Error", error.message);
        }
      });
  };

  const signout = async () => {
    setLoading(true);
    return await axios
      .post(signoutUrl)
      .then((response) => {
        if (response.data.status === true) {
          setUserRole(-1);
          setIsAuthenticated(false);
          setLoading(false);
          return true;
        }
      })
      .catch(function (error) {
        setLoading(false);
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
          // console.log("Error", error.message);
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
        authErr,
        setAuthErr,
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
