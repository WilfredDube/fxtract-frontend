import * as React from "react";
import { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import { Avatar, Icon, IconButton, makeStyles } from "@material-ui/core";
import { amber, green, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  orange: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[800],
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  size: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

export default function FileListChooser({ setSelectionModel }) {
  const classes = useStyles();
  const { toProcess } = useContext(CADViewerContext);

  const getColor = (level) => {
    switch (level) {
      case 0:
        return `${classes.red}`;
      case 1:
        return `${classes.orange}`;
      case 2:
        return `${classes.green}`;
      default:
        return ``;
    }
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "filename",
      headerName: "Select all",
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: "processLevel",
      headerName: " ",
      width: 50,
      editable: false,
      renderCell: (cellValues) => {
        return (
          <IconButton edge="end" aria-label="comments">
            <Avatar
              className={[
                getColor(cellValues.row.processLevel),
                classes.size,
              ].join(" ")}
            >
              <Icon />
            </Avatar>
          </IconButton>
        );
      },
    },
  ];

  const rows = [];
  toProcess.map((file) => {
    return rows.push({
      id: file.id,
      filename: file.filename,
      processLevel: file.feature_props.process_level,
    });
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        disableColumnMenu
        disableMultipleColumnsSorting
        disableExtendRowFullWidth={false}
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection);
        }}
      />
    </div>
  );
}
