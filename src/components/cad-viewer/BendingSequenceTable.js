import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "operation_no", label: "Operation No", minWidth: 50 },
  { id: "bend_id", label: "Bend ID", minWidth: 50 },
  { id: "bend_angle", label: "Bend Angle", minWidth: 50 },
  { id: "bend_length", label: "Bend Length", minWidth: 50 },
  { id: "bend_radius", label: "Bend Radius", minWidth: 50 },
  { id: "bend_direction", label: "Bend Direction", minWidth: 100 },
  { id: "tool", label: "Tool", minWidth: 50 },
];

function createData(
  operation_no,
  bend_id,
  bend_angle,
  bend_length,
  bend_radius,
  bend_direction,
  tool
) {
  //   const density = population / size;
  return {
    operation_no,
    bend_id,
    bend_angle,
    bend_length,
    bend_radius,
    bend_direction,
    tool,
  };
}

const rows = [
  createData(1, "B1", 60, 50, 2, "INSIDE", "F2"),
  createData(2, "B2", 90, 500, 2, "OUTSIDE", "F2"),
  createData(3, "B3", 30, 30, 2, "INSIDE", "F2"),
  createData(4, "B4", 90, 500, 2, "INSIDE", "F2"),
  createData(5, "B5", 80, 200, 2, "INSIDE", "F2"),
  createData(6, "B5", 80, 200, 2, "INSIDE", "F2"),
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

export default function BendingSequenceTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.bend_id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
