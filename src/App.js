import React, { useEffect, useState } from "react";

import Openlayer from "./Openlayer";
import ViewerTabs from "./ViewerTabs";

import Source from "ol/source/Stamen";
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function App() {
  const mapState = useInput();
  const drawSource = useInput();
  const baseLayer = useInput();

  function updateMapState(map) {
    mapState.setValue(map);
  }

  function handleExportImage() {
    const map = mapState.value;
    map.once("rendercomplete", function () {
      const mapCanvas = document.createElement("canvas");
      const size = map.getSize();
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext("2d");
      Array.prototype.forEach.call(
        document.querySelectorAll(".ol-layer canvas"),
        function (canvas) {
          if (canvas.width > 0) {
            const opacity = canvas.parentNode.style.opacity;
            mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
            const transform = canvas.style.transform;
            // Get the transform parameters from the style's transform matrix
            const matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(",")
              .map(Number);
            // Apply the transform to the export map context
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            mapContext.drawImage(canvas, 0, 0);
          }
        }
      );
      if (navigator.msSaveBlob) {
        // link download attribute does not work on MS browsers
        navigator.msSaveBlob(mapCanvas.msToBlob(), "map.png");
      } else {
        const link = document.getElementById("image-download");
        link.href = mapCanvas.toDataURL();
        link.click();
      }
    });
    map.renderSync();
  }

  return (
    <div className="App">
      <div className="headImageViewer ">
        <button
          className="btn btn-primary sidebarLeft"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling1"
          aria-controls="offcanvasScrolling"
        >
          &#x2630;
        </button>
        <button
          className="btn btn-primary sidebarRight"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling2"
          aria-controls="offcanvasScrolling"
        >
          &#x2630;
        </button>
      </div>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling1"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Colored with scrolling
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            Try scrolling the rest of the page to see this option in action.
          </p>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling2"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Save Image to Device
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            <b>Colour Manipulations</b>
          </p>
          <div className="downloadToImg">
            <label>Contrast</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Saturation</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Hue Shift</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Invert</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Chroma</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Brightness</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Edge Detect</label>
            <input type="checkbox"></input>
          </div>
          <p>
            <b>Overlays</b>
          </p>
          <div className="downloadToImg">
            <label>Square</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Circle</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Polygon</label>
            <input type="checkbox"></input>
          </div>
          <div className="downloadToImg">
            <label>Marker</label>
            <input type="checkbox"></input>
          </div>
          <br />
          <button
            id="export-png"
            className="btn btn-primary"
            onClick={handleExportImage}
          >
            Download Image
          </button>

          <a id="image-download" download="map.png"></a>
        </div>
      </div>

      <Openlayer
        updateMapState={updateMapState}
        setdrawSource={drawSource.setValue}
        setBaseLayer={baseLayer.setValue}
      />
      <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
        Drop
        <li class="dropdown-submenu">
          <a tabindex="-1" href="#">
            More options
          </a>
          <ul class="dropdown-menu">...</ul>
        </li>
      </ul>
      <ViewerTabs
        map={mapState.value}
        drawSource={drawSource.value}
        baseLayer={baseLayer.value}
      />
    </div>
  );
}

export default App;
