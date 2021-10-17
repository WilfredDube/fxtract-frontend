import React, { useContext, useState } from "react";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import FileListChooser from "./FileListChooser";
import ViewerDialog from "./ViewerDialog";

export default function ProcessDialog({ dialogOpen, setDialogOpen }) {
  const [selectedFiles, setSelectionModel] = useState([]);
  const { processMany } = useContext(CADViewerContext);

  return (
    <ViewerDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      title="Select files to process"
      btnText="Process files"
      cancel={true}
      maxwidth="sm"
      onButtonClick={() => {
        processMany(selectedFiles);
        setDialogOpen(false);
      }}
      processButtonDisabled={selectedFiles.length === 0}
    >
      <FileListChooser setSelectionModel={setSelectionModel} />
    </ViewerDialog>
  );
}
