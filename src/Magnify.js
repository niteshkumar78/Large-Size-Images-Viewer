import React, { useEffect, useState } from "react";
import { getRenderPixel } from "ol/render";

function Magnify(props) {
  const imagery = props.baseLayer;
  const { map } = props;
  let mousePosition = null;
  useEffect(() => {
    const container = document.getElementById("map");

    if (map !== undefined) {
      console.log("Hi2");
      let radius = 75;
      document.addEventListener("keydown", function (evt) {
        if (document.getElementById("magnify").checked) {
          if (evt.which === 38) {
            radius = Math.min(radius + 5, 150);
            map.render();
            evt.preventDefault();
          } else if (evt.which === 40) {
            radius = Math.max(radius - 5, 25);
            map.render();
            evt.preventDefault();
          }
        }
      });

      // get the pixel position with every move

      container.addEventListener("mousemove", function (event) {
        console.log(document.getElementById("magnify").checked);
        if (document.getElementById("magnify").checked) {
          mousePosition = map.getEventPixel(event);
          map.render();
        }
      });

      container.addEventListener("mouseout", function () {
        if (document.getElementById("magnify").checked) {
          mousePosition = null;
          map.render();
        }
      });

      // after rendering the layer, show an oversampled version around the pointer
      imagery.on("postrender", function (event) {
        if (mousePosition && document.getElementById("magnify").checked) {
          const pixel = getRenderPixel(event, mousePosition);
          const offset = getRenderPixel(event, [
            mousePosition[0] + radius,
            mousePosition[1],
          ]);
          const half = Math.sqrt(
            Math.pow(offset[0] - pixel[0], 2) +
              Math.pow(offset[1] - pixel[1], 2)
          );
          const context = event.context;
          const centerX = pixel[0];
          const centerY = pixel[1];
          const originX = centerX - half;
          const originY = centerY - half;
          const size = Math.round(2 * half + 1);
          const sourceData = context.getImageData(
            originX,
            originY,
            size,
            size
          ).data;
          const dest = context.createImageData(size, size);
          const destData = dest.data;
          for (let j = 0; j < size; ++j) {
            for (let i = 0; i < size; ++i) {
              const dI = i - half;
              const dJ = j - half;
              const dist = Math.sqrt(dI * dI + dJ * dJ);
              let sourceI = i;
              let sourceJ = j;
              if (dist < half) {
                sourceI = Math.round(half + dI / 2);
                sourceJ = Math.round(half + dJ / 2);
              }
              const destOffset = (j * size + i) * 4;
              const sourceOffset = (sourceJ * size + sourceI) * 4;
              destData[destOffset] = sourceData[sourceOffset];
              destData[destOffset + 1] = sourceData[sourceOffset + 1];
              destData[destOffset + 2] = sourceData[sourceOffset + 2];
              destData[destOffset + 3] = sourceData[sourceOffset + 3];
            }
          }
          context.beginPath();
          context.arc(centerX, centerY, half, 0, 2 * Math.PI);
          context.lineWidth = (3 * half) / radius;
          context.strokeStyle = "rgba(255,255,255,0.5)";
          context.putImageData(dest, originX, originY);
          context.stroke();
          context.restore();
        }
      });
    }
  });
  return (
    <li>
      <label>Magnify</label>
      <input
        id="magnify"
        type="checkbox"
        onClick={() => {
          const mag = document.getElementById("magnify");
          console.log("mag", mag.checked);
        }}
      />
    </li>
  );
}

export default Magnify;
