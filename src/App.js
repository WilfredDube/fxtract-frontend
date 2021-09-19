// import logo from "./logo.svg";
// import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import SignIn from "./components/view/SignIn";
import SignUp from "./components/view/SignUp";
import ForgotPassword from "./components/view/ForgotPassword";
import VerifyEmail from "./components/view/VerifyEmail";
import ProjectViewer from "./components/cad-viewer/ProjectViewer";
import ProjectContextProvider from "./contexts/ProjectContext";
import ProjectListView from "./components/project/ProjectListView";
import ResetPassword from "./components/view/ResetPassword";
import AuthContextProvider from "./contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: theme.mixins.toolbar,
}));

const App = () => {
  const classes = useStyles();
  return (
    // <Provider store={FxtractDataStore}>
    <AuthContextProvider>
      <Router>
        <div className={classes.toolbarMargin} />
        <Switch>
          <Route path="/signin" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/forgot-password" component={ForgotPassword} exact />
          <Route path="/verify-email" component={VerifyEmail} exact />
          <Route path="/reset-password" component={ResetPassword} exact />
          <ProjectContextProvider>
            <Route path="/projects" component={ProjectListView} exact />
            <Route path="/view" component={ProjectViewer} exact />
          </ProjectContextProvider>
          <Redirect to="/signin" />
        </Switch>
      </Router>
    </AuthContextProvider>
    // </Provider>
  );
};

export default App;
