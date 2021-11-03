import React, { useContext } from "react";
import ProcessingPlanTable from "./ProcessingPlanTable";
import ViewerDialog from "./ViewerDialog";
import GetAppIcon from "@material-ui/icons/GetApp";
import { CADViewerContext } from "../../contexts/CADViewerContext";

export default function ProcessingPlanDialog({ dialogOpen, setDialogOpen }) {
  const { processingplan } = useContext(CADViewerContext);

  const downloadFile = () => {
    window.open(processingplan.pdf_url);
  };

  return (
    <ViewerDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      title="Processing plan"
      btnText="Download"
      btnIcon={<GetAppIcon />}
      cancel={true}
      maxwidth="lg"
      onButtonClick={downloadFile}
      //   header={<ProcessHeader />}
      // onButtonClick
      // margin
      // padding
    >
      <ProcessingPlanTable />
    </ViewerDialog>
  );
}
