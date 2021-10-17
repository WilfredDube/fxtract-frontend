import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import ConfirmDialog from "../view/ConfirmDialog";
import CreateDialog from "../view/CreateDialog";
import { Link } from "react-router-dom";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import { green } from "@material-ui/core/colors";
import { AuthContext } from "../../contexts/AuthContext";

const convertTimestamp = (timestamp) => {
  const milliseconds = timestamp * 1000; // 1575909015000
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15

  return humanDateFormat;
};

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  actions: {
    justifyContent: "flex-end",
  },
  green: {
    color: "#fff",
    backgroundColor: green[100],
  },
}));

function ProjectCard({ project, editProject, removeProject }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const { setBreadCrumbProject, setBreadCrumbFile } =
    useContext(CADViewerContext);
  const { user } = useContext(AuthContext);

  const openForEdit = (project) => {
    setRecordForEdit(project);
    setDialogOpen(true);
  };

  const handleSelection = () => {
    setBreadCrumbFile("");
    setBreadCrumbProject(project);
  };

  return (
    <div>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          title={project.title}
          subheader={convertTimestamp(project.created_at)}
          action={
            <IconButton onClick={() => setOpen(true)}>
              <DeleteOutlined size="small" />
            </IconButton>
          }
          avatar={
            // <Avatar>
            //   <AccountCircleOutlined />
            // </Avatar>
            <Avatar
              // size={4}
              className={classes.green}
              // sx={{ bgcolor: green[500] }}
            >
              {user.firstname[0]}
            </Avatar>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography color="textSecondary">{project.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              openForEdit(project);
            }}
            style={{ maginRight: "0px" }}
          >
            Edit
          </Button>
          <Button
            onClick={handleSelection}
            size="small"
            color="primary"
            component={Link}
            to="/view"
          >
            Open
          </Button>
        </CardActions>
      </Card>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        project={project}
        removeProject={removeProject}
      />
      <CreateDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        project={recordForEdit}
        editProject={editProject}
        btnText="Save"
        dialogTitle="Edit"
      />
    </div>
  );
}

export default ProjectCard;
