import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const ViewerDialog = ({
  children,
  dialogOpen,
  setDialogOpen,
  title,
  header,
  btnText,
  btnIcon,
  cancel,
  onButtonClick,
  margin,
  padding,
}) => {
  const onDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog fullWidth open={dialogOpen} onClose={onDialogClose} maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      {header}
      <DialogContent
        dividers
        style={{ padding: { padding }, margin: { margin } }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        {cancel && (
          <Button onClick={onDialogClose} color="primary">
            Cancel
          </Button>
        )}
        <Button variant="contained" onClick={onButtonClick} color="primary">
          {btnText} {btnIcon}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewerDialog;
