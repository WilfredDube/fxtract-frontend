import {
  Container,
  createMuiTheme,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  productsHeader: {
    flexGrow: 1,
    fontFamily: "Sora",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 2, 3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2, 1),
    },
  },
}));

const theme = createMuiTheme();
theme.typography.h4 = {
  color: "#4d4d4dff",
  fontFamily: "Sora",
  fontSize: 36,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 28,
  },
};

theme.typography.h6 = {
  color: "#4d4d4dff",
  fontSize: 20,
  [theme.breakpoints.down("sm")]: {
    fontSize: 18,
  },
};

const ProductHeader = ({ qualityOfService }) => {
  const classes = useStyles();

  return (
    <div className={classes.productsHeader}>
      <Container xs={12} sm={12} md={12}>
        <Typography align="center" variant="h4" gutterBottom>
          {"Learn how to use Fxtract"}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          {qualityOfService}
        </Typography>
      </Container>
    </div>
  );
};

export default ProductHeader;
