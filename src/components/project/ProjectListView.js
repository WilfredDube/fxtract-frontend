import React, { useContext, useEffect } from "react";
import ProjectList from "./ProjectList";
import { Container } from "@material-ui/core";
import ProjectHeader from "./ProjectHeader";
import { AuthContext } from "../../contexts/AuthContext";

const ProjectListView = ({ location }) => {
  const { setCurrLocation } = useContext(AuthContext);

  useEffect(() => {
    setCurrLocation(location.pathname);
  }, [location, setCurrLocation]);

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
