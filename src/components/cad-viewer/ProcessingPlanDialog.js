import React from "react";
import ProcessingPlanTable from "./ProcessingPlanTable";
import ViewerDialog from "./ViewerDialog";
import GetAppIcon from "@material-ui/icons/GetApp";

export default function ProcessingPlanDialog({ dialogOpen, setDialogOpen }) {
  return (
    <ViewerDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      title="Processing plan"
      btnText="Download"
      btnIcon={<GetAppIcon />}
      cancel={true}
      maxwidth="lg"
      //   header={<ProcessHeader />}
      // onButtonClick
      // margin
      // padding
    >
      <ProcessingPlanTable />
    </ViewerDialog>
  );
}
