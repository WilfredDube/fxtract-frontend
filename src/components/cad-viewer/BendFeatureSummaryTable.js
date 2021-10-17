import React, { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { blueGrey } from "@material-ui/core/colors";
import { CADViewerContext } from "../../contexts/CADViewerContext";

const StyledTableCell = withStyles((theme) => ({
  head: {
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

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function BendFeatureSummaryTable() {
  const classes = useStyles();
  const { bendFeatures } = useContext(CADViewerContext);

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
          {bendFeatures.map((bend) => (
            <StyledTableRow key={bend.bend_id}>
              <StyledTableCell component="th" scope="row">
                {bend.bend_id}
              </StyledTableCell>
              <StyledTableCell>{bend.angle}</StyledTableCell>
              <StyledTableCell>{bend.length}</StyledTableCell>
              <StyledTableCell>{bend.radius}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
