import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { projectCreationData } from "./formdata";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function CreateDialog({
  addProject,
  dialogOpen,
  setDialogOpen,
  project,
  editProject,
  btnText,
  dialogTitle,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onDialogClose = () => {
    setValue("title", "");
    setValue("description", "");
    setDialogOpen(false);
  };

  const onCreate = (data) => {
    if (!project) {
      const newProject = {
        title: data.title,
        description: data.description,
      };

      addProject(newProject);
      reset();
    } else {
      const editedProject = {
        ...project,
        title: data.title,
        description: data.description,
      };
      editProject(editedProject);
    }

    onDialogClose();
  };

  useEffect(() => {
    if (project != null) {
      reset({
        title: project.title,
        description: project.description,
      });
    } else {
      setValue("title", "");
      setValue("description", "");
    }
  }, [project, reset, setValue]);

  return (
    <Dialog open={dialogOpen} onClose={onDialogClose}>
      <DialogTitle>{dialogTitle || "New"} Project</DialogTitle>
      <DialogContent dividers>
        {projectCreationData.map((input, key) => (
          <TextField
            key={key}
            variant="outlined"
            margin="normal"
            fullWidth
            label={input.label}
            name={input.name}
            type={input.type}
            multiline={input.multiline}
            rows={input.rows}
            {...register(input.name, { required: true })}
            helperText={errors[input.name]?.message}
            error={errors[input.name]?.message ? true : false}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onCreate)}
          color="primary"
        >
          {btnText || "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
