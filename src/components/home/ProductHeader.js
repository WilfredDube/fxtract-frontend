import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  productsHeader: {
    flexGrow: 1,
    fontFamily: "Sora",
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: "#3f51b5ff",
    padding: theme.spacing(12, 0, 8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2, 1),
    },
  },
}));

const theme = createTheme();
theme.typography.h4 = {
  color: "#ffffffff",
  fontFamily: "Sora",
  fontSize: 36,
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: 28,
  },
};

theme.typography.h6 = {
  color: "#ffffffff",
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
          {"What is Fxtract?"}
        </Typography>
        <Typography variant="h6" align="center" color="color" paragraph>
          {
            "Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely. Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely."
          }
        </Typography>
      </Container>
    </div>
  );
};

export default ProductHeader;
