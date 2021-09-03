import React, { useEffect } from "react";
import h337 from "heatmap.js";
import { Heatmap, Vector as VectorLayer } from "ol/layer";

import { Point } from "ol/geom";
import Feature from "ol/Feature";

function HeatMap(props) {
  // useEffect(() => {
  //   // create a heatmap instance
  //   var heatmap = h337.create({
  //     container: document.getElementById("map"),
  //     // container: document.querySelector("canvas"),
  //     maxOpacity: 0.6,
  //     radius: 50,
  //     blur: 0.9,
  //     // backgroundColor with alpha so you can see through it
  //     //   backgroundColor: "rgba(0, 0, 58, 0.96)",
  //   });
  //   var heatmapContainer = document.getElementById("map");
  //   // var heatmapContainer = document.querySelector("canvas");
  //   heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function (e) {
  //     // we need preventDefault for the touchmove
  //     e.preventDefault();
  //     var x = e.layerX;
  //     var y = e.layerY;
  //     if (e.touches) {
  //       x = e.touches[0].pageX;
  //       y = e.touches[0].pageY;
  //     }

  //     heatmap.addData({ x: x, y: y, value: 1 });
  //   };

  //   heatmapContainer.onclick = function (e) {
  //     var x = e.layerX;
  //     var y = e.layerY;
  //     heatmap.addData({ x: x, y: y, value: 1 });
  //   };
  // });
  useEffect(() => {});
  return (
    <div>
      <li>Heatmap</li>
    </div>
  );
}

export default HeatMap;
