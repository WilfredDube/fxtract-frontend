import React from "react";
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

const useStyles = makeStyles({
  table: {
    // minWidth: 700,
    "& .MuiTableCell-root": {
      borderLeft: "1px solid rgba(224, 224, 224, 1)",
    },
  },
});

export default function ProcessingPlanTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={1}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              PROCESSING PLAN SHEET: "project"
            </TableCell>
            <TableCell align="left">Page: 1/1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              Units: Degrees, mm, kN, sec
            </TableCell>
            <TableCell align="left">Modules: 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              Part name: "file"
            </TableCell>
            <TableCell align="left">Part no: "number"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" width="10%">
              Engineer: "name"
            </TableCell>
            <TableCell align="left" width="10%">
              Checked by: "name"
            </TableCell>
            <TableCell align="left" width="10%">
              Date created: "date"
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Material: "name"</TableCell>
            <TableCell align="left">
              Machine parameters: "name"
              <Typography variant="subtitle2">
                Number of tools: "number"
              </Typography>
              <Typography variant="subtitle2">
                Bending force: "force"
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="subtitle2">
                Number of tools: "number"
              </Typography>
              <Typography variant="subtitle2">
                Bending force: "force"
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Quantity: "number"</TableCell>
            <TableCell align="left">Planning time: "time"</TableCell>
            <TableCell align="left">
              Estimated production time: "time"
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
