import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Paper,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  marginAutoContainer: {
    width: 500,
    height: 80,
    display: "flex",
    backgroundColor: "gold",
  },
  marginAutoItem: {
    margin: "auto",
  },
  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#ececec",
    // backgroundColor: theme.palette.background.default,
    // color: theme.palette.text.secondary,
  },
  card: {
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ececec",
    // backgroundColor: theme.palette.background.default,
  },
  cardMedia: {
    padding: "30%", // 16:9
    backgroundSize: "contain",
    // width: "40%",
    // paddingLeft: "12%",
    // paddingRight: "12%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const ProcessStep = ({ image, header, summary }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Card className={classes.card} elevation={0}>
        <CardMedia
          className={classes.cardMedia}
          image={process.env.PUBLIC_URL + image}
          title="Image title"
        />
        <CardHeader
          title={header}
          style={{
            textAlign: "center",
          }}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h6"
            style={{
              textAlign: "center",
            }}
          >
            {summary}
          </Typography>
        </CardContent>
      </Card>
      {/* <Grid
        container
        // display="flex"
        direction="column"
        // width={"40%"}
        // height={80}
        // bgcolor="lightblue"
      >
        <Grid item spacing={4}>
          <Paper className={classes.paper} elevation={0}>
            <img
              src={process.env.PUBLIC_URL + "/design.svg"}
              width={"50%"}
              alt="logo"
            />
          </Paper>
        </Grid>
        <Grid>
          <Typography
            variant="h6"
            style={{
              textAlign: "center",
            }}
          >
            Design anywhere.
          </Typography>
        </Grid>
        <Grid>
          <Typography
            variant="h6"
            style={{
              textAlign: "center",
            }}
          >
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </Grid>
      </Grid> */}
      {/* <Box
        display="flex"
        width={500}
        height={80}
        bgcolor="lightgreen"
        alignItems="center"
        justifyContent="center"
      >
        2. Box (alignItems and justifyContent)
      </Box>
      <div className={classes.marginAutoContainer}>
        <div className={classes.marginAutoItem}>
          3. useStyles (margin: auto)
        </div>
      </div>
      <div className={classes.alignItemsAndJustifyContent}>
        4. useStyles (alignItems and justifyContent)
      </div> */}
    </React.Fragment>
  );
};
export default ProcessStep;
