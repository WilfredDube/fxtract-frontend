import axios from "axios";
import React, { useState } from "react";

const authUrl = "/api/auth/login";
const signoutUrl = "/api/auth/logout";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(-1);

  const authenticate = async (credentials) => {
    return await axios.post(authUrl, credentials).then((response) => {
      if (response.data.status === true) {
        setUserRole(response.data.data.role);
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    });
  };

  const signout = async () => {
    return await axios.post(signoutUrl).then((response) => {
      if (response.data.status === true) {
        setUserRole(-1);
        setIsAuthenticated(false);
        return true;
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, authenticate, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
