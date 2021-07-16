import React, { Component } from "react";
import ProjectList from "./ProjectList";
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       backgroundColor: theme.palette.background.default,
//     },
//     paperHeader: {
//       padding: theme.spacing(4),
//       display: "flex",
//     },
//   }));

export class ProjectListView extends Component {
  render() {
    // const classes = useStyles();
    return (
      <div>
        
        {
          /* <div className={classes.root}>
          <NoProjectsCreated />
        </div> */
          console.log(this.props.projects)
        }
        <ProjectList projects={this.props.projects} />
      </div>
    );
  }
}

export default ProjectListView;
