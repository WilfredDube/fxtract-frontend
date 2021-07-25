import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { TextField, Typography } from "@material-ui/core";

export default function ConfirmDialog({ title, open, setOpen }) {
  //   const [open, setOpen] = useState(false);
  //   const onShowConfirm = () => {
  //     setOpen(true);
  //   };

  const onDialogClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog maxWidth="sm" open={open} onClose={onDialogClose}>
        <DialogTitle>
          <span style={{ fontSize: "1.5rem" }}>
            <span style={{ fontWeight: "560" }}>Delete Project:</span> {title}
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
            <span style={{ fontWeight: "bold" }}>{title}</span>
          </Typography>
          <TextField
            autoFocus
            margin="normal"
            InputProps={{ name: "title" }}
            //   onChange={(e) => setFirst(e.target.value)}
            value=""
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={onConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
