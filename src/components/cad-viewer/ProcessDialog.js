import React from "react";
import ProcessHeader from "./ProcessHeader";
import FileListChooser from "./FileListChooser";
import ViewerDialog from "./ViewerDialog";

export default function ProcessDialog({
  dialogOpen,
  setDialogOpen
}) {
 
  return (
    <ViewerDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      title="Select files to process"
      btnText="Process files"
      cancel={true}
      header={<ProcessHeader />}
      // onButtonClick
      // margin
      // padding
    >
      <FileListChooser />
    </ViewerDialog>
  );
}
