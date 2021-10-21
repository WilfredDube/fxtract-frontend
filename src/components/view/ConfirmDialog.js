import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { TextField, Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { projectDeletionData } from "./formdata";

export default function ConfirmDialog({
  project,
  open,
  setOpen,
  removeProject,
}) {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .oneOf([project.title, null], "Project name does not match")
      .required("Project name required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onDialogClose = () => {
    setOpen(false);
  };

  const onConfirm = (data) => {
    removeProject(project.id);
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog maxWidth="sm" open={open} onClose={onDialogClose}>
        <DialogTitle>
          <span style={{ fontSize: "1.5rem" }}>
            <span style={{ fontWeight: "560" }}>Delete Project:</span>{" "}
            {project.title}
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1">
            This deletes the project, all the CAD files it contains, and their
            features and processing plans. This action cannot be undone.
            <br />
          </DialogContentText>{" "}
          <Typography color="error" variant="body1">
            Please type the name of the project to confirm deletion:{" "}
            <span style={{ fontWeight: "bold" }}>{project.title}</span>
          </Typography>
          <TextField
            autoFocus
            margin="normal"
            fullWidth
            placeholder={projectDeletionData.label}
            name={projectDeletionData.name}
            type={projectDeletionData.type}
            {...register(projectDeletionData.name, { required: true })}
            helperText={errors[projectDeletionData.name]?.message}
            error={errors[projectDeletionData.name]?.message ? true : false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onConfirm)}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
