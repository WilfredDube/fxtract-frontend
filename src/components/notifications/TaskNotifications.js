import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import NotificationCard from "./NotificationCard";

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

const TaskNotifications = () => {
  const classes = useStyles();
  const { tasks } = useContext(TaskContext);

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
          {tasks
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
