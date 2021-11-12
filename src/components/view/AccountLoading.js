import "../../App.css";

import React, { useContext } from "react";
import {
  Typography,
  CircularProgress,
  CssBaseline,
  Container,
} from "@material-ui/core";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
// }));

function AccountLoading() {
  // const classes = useStyles();
  const { currLocation, isAuthenticated, authErr, loading } =
    useContext(AuthContext);

  if (authErr != null) {
    return <div>{authErr}</div>;
  }

  if (!isAuthenticated && !loading) {
    return <Redirect to={"/signin"} />;
  }

  if (!loading && isAuthenticated) {
    return <Redirect to={currLocation} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="App">
        <header className="mid">
          <CircularProgress
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <Typography color="primary" style={{ fontSize: "2rem", margin: 50 }}>
            Fxtract
          </Typography>
        </header>
      </div>
    </Container>
  );
}

export default AccountLoading;

// import "./index.css";
// import React from "react";
// import { useQuery } from "react-query";
// import { isLoggedIn } from "../../api/userApi";
// import {
//   CircularProgress,
//   Container,
//   CssBaseline,
//   Typography,
// } from "@mui/material";
// import { Navigate } from "react-router-dom";

// function AccountLoading() {
//   const { status, isError } = useQuery("user", isLoggedIn, {
//     onError: (error) => {},
//   });

//   return (
//     <>
//       {status === "success" ? (
//         <Navigate to={"/projects"} /> // redirect to projects
//       ) : isError ? (
//         <Navigate to={"/signin"} /> // Redirect to signin page
//       ) : (
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <div className="App">
//             <header className="App-header">
//               <CircularProgress
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                 }}
//               >DSJDNSKJD</CircularProgress>
//               <Typography
//                 color="primary"
//                 style={{ fontSize: "2rem", margin: 50 }}
//               >
//                 Fxtract
//               </Typography>
//             </header>
//           </div>
//         </Container>
//       )}
//     </>
//   );
// }

// export default AccountLoading;
// .App-header {
//   /* background-color: #282c34; */
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-size: calc(10px + 2vmin);
//   color: white;
// }
