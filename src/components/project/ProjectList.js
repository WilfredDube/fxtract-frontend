import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import NoProjectsCreated from "./NoProjectsCreated";
import ProjectCard from "./ProjectCard";

export class ProjectList extends Component {
  render() {
    if (
      this.props.projects === undefined ||
      this.props.projects === null ||
      this.props.projects.length === 0
    ) {
      return <NoProjectsCreated />;
    }
    return (
      <Grid container spacing={3}>
        {this.props.projects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={4} lg={3}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ProjectList;
