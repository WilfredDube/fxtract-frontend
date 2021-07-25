import React, { Component } from "react";
import ProjectList from "./ProjectList";
import { Container } from "@material-ui/core";
import ProjectHeader from "./ProjectHeader";
// import Footer from "../view/Footer";
import NavBar from "../NavBar";
export class ProjectListView extends Component {
  render() {
    return (
      <>
        <NavBar />
        <ProjectHeader />
        <div style={{ padding: 20, background: "#F2F4F8" }}>
          <Container>
            <ProjectList projects={this.props.projects} />
          </Container>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}

export default ProjectListView;
