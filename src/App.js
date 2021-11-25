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
import Profile from "./components/view/Profile";
import NavBar from "./components/NavBar";
import CADViewerContextProvider from "./contexts/CADViewerContext";
import AccountLoading from "./components/view/AccountLoading";
import MaterialContextProvider from "./contexts/MaterialContext";
import TaskNotifications from "./components/notifications/TaskNotifications";
import TaskContextProvider from "./contexts/TaskContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const useStyles = makeStyles((theme) => ({
  toolbarMargin: theme.mixins.toolbar,
}));

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Router>
            <div className={classes.toolbarMargin} />
            <Switch>
              <Route path="/" component={AccountLoading} exact />
              <Route path="/signin" component={SignIn} exact />
              <Route path="/signup" component={SignUp} exact />
              <Route path="/forgot-password" component={ForgotPassword} exact />
              <Route path="/verify-email" component={VerifyEmail} exact />
              <Route path="/reset-password" component={ResetPassword} exact />
              <ProjectContextProvider>
                <CADViewerContextProvider>
                  <NavBar />
                  <Route path="/projects" component={ProjectListView} exact />

                  <MaterialContextProvider>
                    <Route path="/view" component={ProjectViewer} exact />
                  </MaterialContextProvider>
                  <TaskContextProvider>
                    <Route
                      path="/notifications"
                      component={TaskNotifications}
                      exact
                    />
                  </TaskContextProvider>
                  <Route path="/profile" component={Profile} exact />
                </CADViewerContextProvider>
              </ProjectContextProvider>
              <Redirect to="/signin" />
            </Switch>
          </Router>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
