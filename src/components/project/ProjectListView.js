import React, { useContext } from "react";
import ProjectList from "./ProjectList";
import { Container } from "@material-ui/core";
import ProjectHeader from "./ProjectHeader";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router";

const ProjectListView = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect to={"/signin"} />;
  }

  return (
    <>
      <ProjectHeader />
      <div style={{ padding: 20, background: "#F2F4F8" }}>
        <Container>
          <ProjectList />
        </Container>
      </div>
    </>
  );
};

export default ProjectListView;
