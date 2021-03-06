import React, { useContext } from "react";
import Masonry from "react-masonry-css";
import { ProjectContext } from "../../contexts/ProjectContext";
import Loading from "./Loading";
import NoProjectsCreated from "./NoProjectsCreated";
import ProjectCard from "./ProjectCard";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const ProjectList = () => {
  const { loading, projects, editProject, removeProject } =
    useContext(ProjectContext);

  if (loading) {
    return <Loading message={"Loading projects"} />;
  }

  if (projects === undefined || projects === null || projects.length === 0) {
    return <NoProjectsCreated />;
  }

  return (
    // <Grid container spacing={3}>// </Grid>
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {projects
        .sort(function (a, b) {
          if (a.created_at > b.created_at) return -1;
          if (a.created_at < b.created_at) return 1;
          return 0;
        })
        .map((project) => (
          <div key={project.id}>
            <ProjectCard
              project={project}
              editProject={editProject}
              removeProject={removeProject}
            />
          </div>
        ))}
    </Masonry>
  );
};

export default ProjectList;
