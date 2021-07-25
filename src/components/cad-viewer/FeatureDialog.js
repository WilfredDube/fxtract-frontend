import React from "react";
import FeatureTable from "./FeatureTable";
import ViewerDialog from "./ViewerDialog";

export default function FeatureDialog({
  dialogOpen,
  setDialogOpen
}) {

  return (
    <ViewerDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      title="Features: file.step"
      btnText="Done"
      cancel={false}
      onButtonClick={() => setDialogOpen(false)}
      // margin
      // padding
    >
      <FeatureTable />
    </ViewerDialog>
  );
}
