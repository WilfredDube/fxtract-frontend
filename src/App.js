// import logo from "./logo.svg";
import "./App.css";

import { FxtractDataStore } from "./state/DataStore";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ProjectConnector } from "./components/project/ProjectConnector";
import { makeStyles } from "@material-ui/core";
import SignIn from "./components/view/SignIn";
import SignUp from "./components/view/SignUp";
import ForgotPassword from "./components/view/ForgotPassword";
import VerifyEmail from "./components/view/VerifyEmail";
import ProjectViewer from "./components/cad-viewer/ProjectViewer";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: theme.mixins.toolbar,
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={FxtractDataStore}>
      <Router>
        <div className={classes.toolbarMargin} />
        <Switch>
          <Route path="/" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/forgot-password" component={ForgotPassword} exact />
          <Route path="/verify-email" component={VerifyEmail} exact />
          <Route path="/projects" component={ProjectConnector} exact />
          <Route path="/view" component={ProjectViewer} exact />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
