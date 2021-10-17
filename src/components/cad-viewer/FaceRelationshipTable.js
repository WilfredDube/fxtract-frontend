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

export default function FaceRelationshipTable() {
  const classes = useStyles();
  const { bendFeatures } = useContext(CADViewerContext);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Face ID</StyledTableCell>
            <StyledTableCell>Bend ID</StyledTableCell>
            <StyledTableCell>Face ID</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bendFeatures.map((bend) => (
            <StyledTableRow key={bend.bend_id}>
              <StyledTableCell component="th" scope="row">
                {bend.first_face_id}
              </StyledTableCell>
              <StyledTableCell>{bend.bend_id}</StyledTableCell>
              <StyledTableCell>{bend.second_face_id}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
