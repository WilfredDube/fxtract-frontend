import React, { Component } from 'react'
import NoProjectsCreated from './NoProjectsCreated'
import ProjectCard from './ProjectCard'

export class ProjectList extends Component {
    render() {
      if(this.props.projects === undefined || this.props.projects === null || this.props.projects.length === 0){
            return <NoProjectsCreated/>
        }
        return (
            this.props.projects.map(p =>
                <ProjectCard project={p}/>
            )
        )
    }
}

export default ProjectList
