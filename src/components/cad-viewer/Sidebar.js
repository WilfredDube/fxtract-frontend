import React, { useContext } from "react";
import { List } from "@material-ui/core";

import FaceRelationshipTable from "./FaceRelationshipTable";
import BendFeatureSummaryTable from "./BendFeatureSummaryTable";
import CadFile from "./CadFile";
import SideBarAccordion from "./SideBarAccordion";
import { CADViewerContext } from "../../contexts/CADViewerContext";

export default function SideBar() {
  const { paneldisabled, cadFiles } = useContext(CADViewerContext);

  return (
    <div width={"20%"}>
      <SideBarAccordion title="Project CAD Files">
        <List>
          {cadFiles
            .sort(function (a, b) {
              if (a.created_at > b.created_at) return -1;
              if (a.created_at < b.created_at) return 1;
              return 0;
            })
            .map((cadfile, index) => (
              <CadFile key={cadfile.id} file={cadfile} />
            ))}
        </List>
      </SideBarAccordion>
      <SideBarAccordion title="Face Relationship" disabled={paneldisabled}>
        <FaceRelationshipTable />
      </SideBarAccordion>
      <SideBarAccordion title="Bend Feature Summary" disabled={paneldisabled}>
        <BendFeatureSummaryTable />
      </SideBarAccordion>
    </div>
  );
}
