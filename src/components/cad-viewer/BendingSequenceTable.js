import React, { Fragment, useContext } from "react";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { blueGrey } from "@material-ui/core/colors";

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

const columns = [
  { id: "operation_no", label: "Operation No", minWidth: 50 },
  { id: "bend_id", label: "Bend ID", minWidth: 50 },
  { id: "angle", label: "Bend Angle", minWidth: 50 },
  { id: "length", label: "Bend Length", minWidth: 50 },
  { id: "radius", label: "Bend Radius", minWidth: 50 },
  { id: "direction", label: "Bend Direction", minWidth: 100 },
  { id: "tool", label: "Tool", minWidth: 50 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
  container: {
    maxHeight: 400,
  },
});

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function BendingSequenceTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { processingplan, bendFeatures } = useContext(CADViewerContext);
  var op = 1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {processingplan.bend_sequences
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((bend) => {
                return (
                  <StyledTableRow
                    key={
                      bend.bend_id *
                      randomBetween(op, Math.round(1000 * Math.random()))
                    }
                  >
                    <StyledTableCell
                      key={
                        op * randomBetween(op, Math.round(1000 * Math.random()))
                      }
                      component="th"
                      scope="row"
                    >
                      {op++}
                    </StyledTableCell>
                    <StyledTableCell
                      key={
                        bend.bend_id +
                        op * randomBetween(op, Math.round(1000 * Math.random()))
                      }
                    >
                      {bend.bend_id}
                    </StyledTableCell>
                    {bendFeatures
                      .filter((b) => b.bend_id === bend.bend_id)
                      .map((feature) => {
                        return (
                          <Fragment key={Math.round(10 * Math.random())}>
                            <StyledTableCell
                              key={
                                bend.bend_id +
                                feature.angle +
                                op *
                                  randomBetween(
                                    op,
                                    Math.round(1000 * Math.random())
                                  )
                              }
                            >
                              {feature.angle}
                            </StyledTableCell>
                            <StyledTableCell
                              key={
                                bend.bend_id +
                                feature.length +
                                op *
                                  randomBetween(
                                    op,
                                    Math.round(1000 * Math.random())
                                  )
                              }
                            >
                              {feature.length}
                            </StyledTableCell>
                            <StyledTableCell
                              key={
                                bend.bend_id +
                                feature.radius +
                                op *
                                  randomBetween(
                                    op,
                                    Math.round(1000 * Math.random())
                                  )
                              }
                            >
                              {feature.radius}
                            </StyledTableCell>
                            <StyledTableCell
                              key={
                                bend.bend_id +
                                feature.direction +
                                op *
                                  randomBetween(
                                    op,
                                    Math.round(1000 * Math.random())
                                  )
                              }
                            >
                              {feature.direction === 1 ? "Inside" : "Outside"}
                            </StyledTableCell>
                            <StyledTableCell
                              key={
                                bend.bend_id +
                                feature.tool_id +
                                randomBetween(
                                  op * op,
                                  Math.round(10000 * Math.random())
                                )
                              }
                            >
                              {feature.tool_id}
                            </StyledTableCell>
                          </Fragment>
                        );
                      })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={bendFeatures.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
