import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React from "react";

function ProjectCard({ project }) {
  return (
    <div>
      <Card>
        <CardHeader
          title={project.title}
          subheader="Legend"
          // avatar={
          //   <Avatar>
          //     <PersonIcon />
          //   </Avatar>
          // }
        />
        <CardContent>
          <Typography variant="caption">{project.created_at}</Typography>
          <Typography variant="subtitle1">
            A little more about subject
          </Typography>
          <Typography>
            Even more information on the subject, contained within the card. You
            can fit a lot of information here, but don't try to overdo it.
          </Typography>
        </CardContent>
      </Card>
      {/* <div>
        <div>
          <h3>{project.title}</h3>
        </div>
      </div> */}
    </div>
  );
}

export default ProjectCard;
