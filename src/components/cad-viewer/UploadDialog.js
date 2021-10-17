import React, { useContext, useState } from "react";
import {
  FormControl,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Typography,
  withStyles,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { blueGrey } from "@material-ui/core/colors";
import ViewerDialog from "./ViewerDialog";
import { MaterialContext } from "../../contexts/MaterialContext";
import { CADViewerContext } from "../../contexts/CADViewerContext";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  dropZoneBackground: {
    backgroundColor: blueGrey[50], //theme.palette.background.default,
  },
}));

export default function UploadDialog({ dialogOpen, setDialogOpen }) {
  const classes = useStyles();
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [files, setFiles] = useState([]);
  const { material } = useContext(MaterialContext);
  const { uploadFiles } = useContext(CADViewerContext);

  const onChange = (files) => {
    setFiles(files);
  };

  const handleChange = (e) => {
    setSelectedMaterial(e.target.value);
  };

  const uploadHandler = (e) => {
    let fd = new FormData();

    for (let i in files) {
      fd.append("files", files[i]);
    }

    fd.set("material", selectedMaterial);

    uploadFiles(fd);

    setSelectedMaterial("");
    setDialogOpen(false);
  };

  return (
    <ViewerDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      title="Upload Step files"
      btnText="Upload"
      cancel={true}
      onButtonClick={uploadHandler}
      // margin
      // padding
    >
      <Typography>Material</Typography>
      <FormControl fullWidth style={{ marginBottom: 8 }}>
        <Select
          fullWidth
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={selectedMaterial}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {material.map((m) => (
            <MenuItem key={m.name} value={m.name}>
              {m.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DropzoneArea
        useChipsForPreview
        className={classes.dropZoneBackground}
        filesLimit={5}
        clearOnUnmount={true}
        onChange={onChange}
      />
    </ViewerDialog>
  );
}
