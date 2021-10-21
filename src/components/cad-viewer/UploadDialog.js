import React, { useContext } from "react";
import {
  FormControl,
  FormHelperText,
  InputBase,
  makeStyles,
  MenuItem,
  Select,
  Typography,
  withStyles,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { blueGrey, red } from "@material-ui/core/colors";
import ViewerDialog from "./ViewerDialog";
import { MaterialContext } from "../../contexts/MaterialContext";
import { CADViewerContext } from "../../contexts/CADViewerContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";

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

const validationSchema = Yup.object().shape({
  materialtype: Yup.string().required("Material must be selected.").default(""),
  upload: Yup.mixed()
    .required("Please upload some STEP/STP files.")
    .test("fileSize", "Please upload some STEP/STP files", (value) => {
      return value.length > 0;
    }),
  // .test(
  //   "duality",
  //   "Upload a STEP file and its corresponding OBJ file",
  //   (value) => {
  //     return value.length % 2 === 0;
  //   }
  // ),
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  dropZoneBackground: {
    backgroundColor: blueGrey[50], //theme.palette.background.default,
  },
  error: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: red[500],
    color: "#fff",
    fontSize: "1rem",
  },
}));

export default function UploadDialog({ dialogOpen, setDialogOpen }) {
  const classes = useStyles();
  const { material } = useContext(MaterialContext);
  const { uploadFiles } = useContext(CADViewerContext);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const uploadHandler = (data) => {
    let fd = new FormData();

    for (const file of data.upload) {
      fd.append("files", file);
    }

    fd.set("material", data.materialtype);

    uploadFiles(fd);

    setDialogOpen(false);
    reset({ materialtype: "", errors: {} });
  };

  return (
    <ViewerDialog
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      title="Upload Step files"
      btnText="Upload"
      cancel={true}
      onButtonClick={handleSubmit(uploadHandler)}
    >
      <Typography>Material</Typography>
      <FormControl
        fullWidth
        style={{ marginBottom: 8 }}
        error={errors["materialtype"]?.message ? true : false}
      >
        <Controller
          name="materialtype"
          control={control}
          rules={{ required: true }}
          render={({ field: { value } }) => (
            <Select
              value={value}
              onChange={(e) => setValue("materialtype", e.target.value)}
              input={<BootstrapInput />}
            >
              {material.map((m) => (
                <MenuItem key={m.name} value={m.name}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          )}
          defaultValue="" // make sure to set up defaultValue
        />
        <FormHelperText>{errors["materialtype"]?.message}</FormHelperText>
      </FormControl>

      <FormControl fullWidth style={{ marginBottom: 8 }}>
        <Controller
          name="upload"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DropzoneArea
              {...field}
              useChipsForPreview
              className={classes.dropZoneBackground}
              filesLimit={5}
              clearOnUnmount={true}
            />
          )}
          defaultValue="" // make sure to set up defaultValue
        />
        {errors.upload && (
          <FormHelperText className={classes.error}>
            {errors.upload.message}
          </FormHelperText>
        )}
      </FormControl>
    </ViewerDialog>
  );
}
