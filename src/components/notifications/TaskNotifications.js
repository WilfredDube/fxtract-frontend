import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
// import { TaskContext } from "../../contexts/TaskContext";
import NotificationCard from "./NotificationCard";
import { useQuery } from "react-query";
import Loading from "../project/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  paperHeader: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  textfield: {
    "& .MuiOutlinedInput-root": {
      position: "relative",
      borderRadius: 0,
    },
  },
}));

const getTasks = async () => {
  return await axios.get("/api/user/tasks");
};

const TaskNotifications = () => {
  const classes = useStyles();
  const { data, isLoading, isError, error } = useQuery("tasks", getTasks);

  if (isLoading) {
    return <Loading message="Loading tasks" />;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  const title = "Notifications";
  return (
    <>
      <Paper elevation={0} square className={classes.paperHeader}>
        <Container>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="h5">{title}</Typography>{" "}
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <div
        className={classes.paperHeader}
        style={{ padding: 10, background: "#F2F4F8" }}
      >
        <Container>
          {data.data.data
            .sort(function (a, b) {
              if (a.created_at > b.created_at) return -1;
              if (a.created_at < b.created_at) return 1;
              return 0;
            })
            .map((task, key) => {
              return <NotificationCard key={key} task={task} />;
            })}
        </Container>
      </div>
    </>
  );
};

export default TaskNotifications;
