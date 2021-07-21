import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CreateDialog({
  dialogOpen,
  setDialogOpen,
  project,
  btnText,
  dialogTitle
}) {
  // eslint-disable-next-line
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // eslint-disable-next-line
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onDialogClose = () => {
    setDialogOpen(false);
    // setTitle("");
    // setDescription("");
  };
  // eslint-disable-next-line
  const onSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };
  const onCreate = () => {
    setSnackbarOpen(true);
    setSnackbarMessage(`${title} ${description} created`);
    console.log(title);
    console.log(description);
    onDialogClose();
  };

  useEffect(() => {
    if (project != null) {
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  return (
    <Dialog open={dialogOpen} onClose={onDialogClose}>
      <DialogTitle>{dialogTitle || "New" } Project</DialogTitle>
      <DialogContent dividers>
        <TextField
          variant="outlined"
          autoFocus
          margin="normal"
          label="Title"
          InputProps={{ name: "title" }}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Description"
          InputProps={{ name: "description" }}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          fullWidth
          multiline
          rows={5}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={onCreate} color="primary">
          {btnText || "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
