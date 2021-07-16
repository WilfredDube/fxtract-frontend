import { Switch, Route, Redirect } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";
import { loadData } from "../../state/ActionCreators";
import { DataTypes } from "../../state/Types";
import { ProjectListView } from "./ProjectListView";

const mapStateToProps = (dataStore) => ({
  ...dataStore,
});

const mapDispatchToProps = {
  loadData,
};

const filterProjects = (projects = []) => { return (projects == null) ? [] : projects };

export const ProjectConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends Component {
    render() {
      return (
        <Switch>
          <Route
            path="/projects"
            render={(routeProps) => (
              <ProjectListView
                {...this.props}
                {...routeProps}
                projects={filterProjects(this.props.projects)}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      );
    }

    componentDidMount() {
      this.props.loadData(DataTypes.PROJECTS);
    }
  }
);
