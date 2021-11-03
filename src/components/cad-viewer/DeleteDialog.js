import React, { Fragment, useContext } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
// import { CADViewerContext } from "../../contexts/CADViewerContext";

export default function DeleteDialog({
  title,
  fileid,
  open,
  setOpen,
  deleteCadFile,
}) {
  // const { deleteCadFile } = useContext(CADViewerContext);

  const onDialogClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    setOpen(false);
    deleteCadFile(fileid);
  };

  return (
    <Fragment>
      <Dialog maxWidth="md" open={open} onClose={onDialogClose}>
        <DialogTitle>Delete file</DialogTitle>
        <DialogContent dividers>
          <DialogContentText variant="body1">
            Do you really want to delete {title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            No
          </Button>
          <Button variant="contained" onClick={onConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
