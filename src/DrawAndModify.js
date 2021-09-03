import React, { useEffect, useState } from "react";

import { Draw, Modify, Snap } from "ol/interaction";
import { Polygon } from "ol/geom";
import { fromLonLat } from "ol/proj";

function DrawAndModify(props) {
  const [drawType, setDrawType] = useState("None");
  const { map, drawSource } = props;
  // const modify = new Modify({ source: drawSource });
  // map.addInteraction(modify);

  // global so we can remove them later
  let draw, snap; // global so we can remove them later
  const typeSelect = document.getElementById("type");
  function addInteractions() {
    if (typeSelect.value !== "None") {
      draw = new Draw({
        source: drawSource,
        type: typeSelect.value,

        // freehand: true,
      });

      draw.on("drawend", function (e) {
        console.log(e, "Draw Start");
      });

      map.addInteraction(draw);
      snap = new Snap({ source: drawSource });
      map.addInteraction(snap);
    }
  }

  console.log(draw, "Draw Done");

  useEffect(() => {
    // console.log("draw", map);
    console.log(fromLonLat([-179.569898, 85.03]));
    if (map != undefined) {
      const modify = new Modify({ source: drawSource });
      map.addInteraction(modify);

      /**
       * Handle change event.
       */
      typeSelect.onchange = function () {
        map.removeInteraction(draw);
        map.removeInteraction(snap);

        addInteractions();
      };

      addInteractions();
    }
  });

  return (
    <ul className="sub2">
      {/* <li>
        <button
          onClick={(e) => {
            setDrawType("Circle");
            console.log("draw type", drawType);
            e.preventDefault();
          }}
        >
          Circle
        </button>
      </li>
      <li
        onClick={() => {
          setDrawType("LineString");
        }}
      >
        Line
      </li>
      <li
        onClick={() => {
          setDrawType("Polygon");
        }}
      >
        Polygon
      </li>
      <li
        onClick={() => {
          setDrawType("Point");
        }}
      >
        Point
      </li>
      <li
        onClick={() => {
          setDrawType("None");
        }}
      >
        none
      </li> */}
      <li>
        <select id="type">
          <option value="None">None</option>

          <option value="Point">Point</option>
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
        </select>
      </li>
      <li
        onClick={() => {
          drawSource.clear();
        }}
      >
        Clear
      </li>
    </ul>
  );
}

export default DrawAndModify;
