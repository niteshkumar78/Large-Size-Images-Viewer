import React from "react";
import DrawAndModify from "./DrawAndModify";
import HeatMap from "./HeatMap";
import Magnify from "./Magnify";
import "./viewerTab.css";
import ColourManipulation from "./ColourManipulation";

function ViewerTabs(props) {
  const { map, drawSource, baseLayer } = props;
  return (
    <ul className="nav1">
      <li className="in">
        Overlays
        <ul className="sub1">
          <li className="in">
            Shapes
            <DrawAndModify map={map} drawSource={drawSource} />
          </li>
          <Magnify map={map} baseLayer={baseLayer} />
          {/* <HeatMap /> */}
          <li>Export view</li>
        </ul>
      </li>
      {/* <li className="in">
        controls
        <ul className="sub1">
          <li>Drag</li>
          <li>Rotate</li>
        </ul>
      </li> */}
      <li className="in">
        color Manipulations
        <ColourManipulation map={map} baseLayer={baseLayer} />
      </li>
    </ul>
  );
}

export default ViewerTabs;
