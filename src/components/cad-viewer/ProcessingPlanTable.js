import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import BendingSequenceTable from "./BendingSequenceTable";
import { CADViewerContext } from "../../contexts/CADViewerContext";

const useStyles = makeStyles({
  table: {
    // minWidth: 700,
    "& .MuiTableCell-root": {
      borderLeft: "1px solid rgba(224, 224, 224, 1)",
    },
  },
});

const convertTimestamp = (timestamp) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const milliseconds = timestamp * 1000; // 1575909015000
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleDateString("en-UK", options); //2019-12-9 10:30:15

  return humanDateFormat;
};

export default function ProcessingPlanTable() {
  const classes = useStyles();
  const { processingplan } = useContext(CADViewerContext);

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              Units: <b>Degrees, mm, kN, sec</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" width="10%">
              Engineer: <b>{processingplan.engineer}</b>
            </TableCell>
            <TableCell align="left" width="10%">
              Checked by: <b></b>
            </TableCell>
            <TableCell align="left" width="10%">
              Date created: <b>{convertTimestamp(processingplan.created_at)}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              PROCESSING PLAN SHEET: <b>{processingplan.project_title}</b>
            </TableCell>
            <TableCell align="left">
              <b>Modules: {processingplan.modules}</b>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left" colSpan={2}>
              Part name: <b>{processingplan.filename}</b>
            </TableCell>
            <TableCell align="left">
              Part no: <b>{processingplan.part_no}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              Material: <b>{processingplan.material}</b>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2">
                Bending force: <b>{processingplan.bending_force.toFixed(1)}</b>
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left">
              <Typography variant="subtitle2">
                Number of tools: <b>{processingplan.tools}</b>
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2">
                Number of rotations: <b>{processingplan.rotations}</b>
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2">
                Number of flips: <b>{processingplan.flips}</b>
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">
              Quantity: <b>1</b>
            </TableCell>
            <TableCell align="left">
              Planning time: <b>{processingplan.processing_time.toFixed(3)}</b>
            </TableCell>
            <TableCell align="left">
              Estimated production time:{" "}
              <b>{processingplan.estimated_manufacturing_time}</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <BendingSequenceTable />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
