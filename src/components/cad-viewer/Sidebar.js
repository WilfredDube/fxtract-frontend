import React from "react";
import { List } from "@material-ui/core";

import FaceRelationshipTable from "./FaceRelationshipTable";
import BendFeatureSummaryTable from "./BendFeatureSummaryTable";
import CadFile from "./CadFile";
import SideBarAccordion from "./SideBarAccordion";

export default function SideBar() {
  const items = [
    { name: "STAR BENDING SEQUENCE.stp", level: 1, timestamp: new Date() },
    { name: "Z bending sequence.stp", level: 1, timestamp: new Date() },
    { name: "inside bends bending sequence.stp", level: 2, timestamp: new Date() },
    { name: "AA00001106762_AO_REINFORCEMENT1 2d.stp", level: 2, timestamp: new Date() },
    { name: "AA00001155784_DO_ASSY SUPPORT ANTENNA 02.stp", level: 1, timestamp: new Date() },
    { name: "AA00001185070_EO_ASSY SUPPOR HVAC.stp", level: 3, timestamp: new Date() },
    { name: "90.step", level: 1, timestamp: new Date() },
    { name: "S_bend.step", level: 2, timestamp: new Date() },
    { name: "n bending sequence.stp", level: 1, timestamp: new Date() },
    { name: "Z bending sequence.stp", level: 1, timestamp: new Date() },
  ];

  return (
    <>
      <SideBarAccordion title="Project CAD Files">
        <List>
          {items.map((item, index) => (
            <CadFile key={index} file={item} />
          ))}
        </List>
      </SideBarAccordion>
      <SideBarAccordion title="Face Relationship">
        <FaceRelationshipTable />
      </SideBarAccordion>
      <SideBarAccordion title="Bend Feature Summary">
        <BendFeatureSummaryTable />
      </SideBarAccordion>
    </>
  );
}
