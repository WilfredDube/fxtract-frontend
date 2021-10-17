import React, { useContext } from "react";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import FeatureTable from "./FeatureTable";
import ViewerDialog from "./ViewerDialog";

export default function FeatureDialog({ dialogOpen, setDialogOpen }) {
  const { openfile } = useContext(CADViewerContext);
  return (
    <ViewerDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      title={"Features: " + openfile.filename}
      btnText="Done"
      cancel={false}
      maxwidth="md"
      onButtonClick={() => setDialogOpen(false)}
    >
      <FeatureTable />
    </ViewerDialog>
  );
}
