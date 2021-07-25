import React, { Component } from "react";
import Masonry from "react-masonry-css";
import NoProjectsCreated from "./NoProjectsCreated";
import ProjectCard from "./ProjectCard";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};
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
      // <Grid container spacing={3}>// </Grid>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {this.props.projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </Masonry>
    );
  }
}

export default ProjectList;
