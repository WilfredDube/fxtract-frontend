import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Container, Grid, makeStyles } from "@material-ui/core";

const GreenCheckbox = withStyles({
  root: {
    // color: green[400],
    // "&$checked": {
    //     color: green[600],
    // },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    background: green[400],
  },
}));

export default function ProcessHeader() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Container className={classes.root}>
      <FormGroup
        row
        style={{
          // justifyContent: "center",
          position: "sticky",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                />
              }
              label="Select all"
            />
          </Grid>
          {/* <Grid item>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                />
              }
              label="Process planning"
            />
          </Grid> */}
        </Grid>
      </FormGroup>
    </Container>
  );
}
