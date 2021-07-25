import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { blueGrey } from "@material-ui/core/colors";

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: blueGrey[50], //theme.palette.background.default,
    backgroundColor: blueGrey[200],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(159, 6.0, 24, 4.0),
  createData(237, 9.0, 37, 4.3),
  createData(262, 16.0, 24, 6.0),
  createData(305, 3.7, 67, 4.3),
  createData(356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function BendFeatureSummaryTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Bend ID</StyledTableCell>
            <StyledTableCell>Angle</StyledTableCell>
            <StyledTableCell>Length</StyledTableCell>
            <StyledTableCell>Radius</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
