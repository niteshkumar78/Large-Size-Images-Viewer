import React, { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import KML from "ol/format/KML";
import {
  Heatmap as HeatmapLayer,
  Tile as TileLayer,
  Vector as VectorLayer,
} from "ol/layer";
import XYZ from "ol/source/XYZ";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

import TileState from "ol/TileState";
import { OSM, Vector as VectorSource } from "ol/source";
import { fromLonLat, transform } from "ol/proj";
import { Draw, Modify, Snap } from "ol/interaction";
import { ContrastSaturationBrightness } from "gl-react-contrast-saturation-brightness";
import { Raster as RasterSource, Stamen } from "ol/source";

import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from "ol/interaction";
import { FullScreen, defaults as defaultControls } from "ol/control";
import { Point } from "ol/geom";
import Feature from "ol/Feature";

// import { raster } from "./ColourManipulationsFunction";
import ImageLayer from "ol/layer/Image";

import { getRenderPixel } from "ol/render";

// import "ol/ol.css";

import "./map.css";
import HeatMap from "./HeatMap";
import { map } from "jquery";

import kml from "./2012_Earthquakes_Mag5.kml";

// import v1 from "v1";

// function useInput(initialValue) {
//   const [value, setValue] = useState(initialValue);
//   return {
//     value: value,
//     setValue,
//   };
// }

function Openlayer(props) {
  useEffect(() => {
    //Seperate

    var baseSource = new XYZ({
      // url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // url: pic,
      // url: "https://www.w3schools.com/howto/img_avatar.png",
      // url: "http://localhost:8000/v1/{z}/{x}/{y}.png",
      url: "https://gslimageserver.herokuapp.com/img2/{z}/{x}_{y}.jpeg",
      // crossOrigin: "anonymous",
      // transition: 0,
      crossOrigin: "anonymous",

      tileSize: 512,
      wrapX: false,
    });
    var baseLayer = new TileLayer({
      source: baseSource,

      useInterimTilesOnError: false,
      minZoom: -1,
      // maxZoom: 15,
    });

    const drawSource = new VectorSource();
    const drawVector = new VectorLayer({
      source: drawSource,

      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33",
          }),
        }),
      }),
    });

    // const vectorHeatmap = new HeatmapLayer({
    //   source: new VectorSource({
    //     // url: "https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml",
    //     format: new KML({
    //       extractStyles: false,
    //     }),
    //   }),
    //   blur: 50,
    //   radius: 50,
    //   weight: function (feature) {
    //     const name = feature.get("name");
    //     const magnitude = parseFloat(name.substr(2));
    //     return magnitude - 5;
    //   },
    // });

    const aerial = new TileLayer({
      source: new XYZ({
        url: "http://localhost:8000/img2/{z}/{x}_{y}.jpeg",
        crossOrigin: "anonymous",

        tileSize: 512,
        wrapX: false,
      }),
      useInterimTilesOnError: false,
      minZoom: -1,
      // maxZoom: 15,
    });

    // const aerial = baseLayer;

    const map1 = new Map({
      controls: defaultControls().extend([new FullScreen()]),

      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),

      target: "map",
      layers: [
        baseLayer,
        drawVector,
        aerial,
        // new ImageLayer({
        //   source: raster,
        // }),
      ],
      view: new View({
        center: fromLonLat([-179.569898, 85.03]),
        zoom: 10,
        maxZoom: 15,
        constrainOnlyCenter: true,

        multiWorld: true,
      }),
    });

    const swipe = document.getElementById("swipe");

    aerial.on("prerender", function (event) {
      const ctx = event.context;
      const mapSize = map1.getSize();
      const width = mapSize[0] * (swipe.value / 100);
      const tl = getRenderPixel(event, [width, 0]);
      const tr = getRenderPixel(event, [mapSize[0], 0]);
      const bl = getRenderPixel(event, [width, mapSize[1]]);
      const br = getRenderPixel(event, mapSize);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tl[0], tl[1]);
      ctx.lineTo(bl[0], bl[1]);
      ctx.lineTo(br[0], br[1]);
      ctx.lineTo(tr[0], tr[1]);
      ctx.closePath();
      ctx.clip();
    });

    aerial.on("postrender", function (event) {
      const ctx = event.context;
      ctx.restore();
    });

    const listener = function () {
      map1.render();
    };
    swipe.addEventListener("input", listener);
    swipe.addEventListener("change", listener);

    // const vectorHeatmap = new HeatmapLayer({
    //   source: new VectorSource({
    //     url: kml,
    //     format: new KML({
    //       extractStyles: false,
    //     }),
    //   }),
    //   // blur: parseInt(blur.value, 10),
    //   // blur: -50,
    //   radius: parseInt(20, 10),
    //   weight: function (feature) {
    //     // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    //     // standards-violating <magnitude> tag in each Placemark.  We extract it from
    //     // the Placemark's name instead.
    //     // const name = feature.get("name");
    //     // const magnitude = parseFloat(name.substr(2));
    //     // return magnitude - 5;
    //     return 1;
    //   },
    // });

    // map1.addLayer(vectorHeatmap);

    // var dataHeatmap = new VectorSource();
    // var coord = fromLonLat([-179.569898, 85.03]);
    // var lonLat = Point(coord);
    // var pointFeature = Feature({
    //   geometry: lonLat,
    //   weight: 20, // e.g. temperature
    // });
    // dataHeatmap.addFeature(pointFeature);

    // var heatMapLayer = new HeatmapLayer({
    //   source: dataHeatmap,
    //   radius: 50,
    // });
    // // add to the map
    // map1.addLayer(heatMapLayer);

    // const controlIds = ["hue", "chroma", "lightness"];
    // controlIds.forEach(function (id) {
    //   const control = document.getElementById(id);
    //   const output = document.getElementById(id + "Out");
    //   control.addEventListener("input", function () {
    //     // output.innerText = control.value;
    //     raster.changed();
    //   });
    //   // output.innerText = control.value;
    //   controls[id] = control;
    // });

    // const modify = new Modify({ source: drawSource });
    // map1.addInteraction(modify);

    // let draw, snap; // global so we can remove them later
    // const typeSelect = document.getElementById("type");

    // function addInteractions() {
    //   draw = new Draw({
    //     source: drawSource,
    //     type: typeSelect.value,
    //   });
    //   map1.addInteraction(draw);
    //   snap = new Snap({ source: drawSource });
    //   map1.addInteraction(snap);
    // }

    /**
     * Handle change event.
     */
    // typeSelect.onchange = function () {
    //   map1.removeInteraction(draw);
    //   map1.removeInteraction(snap);
    //   addInteractions();
    // };

    // addInteractions();

    console.log(baseLayer.getSource());
    props.setdrawSource(drawSource);
    props.setBaseLayer(baseLayer);

    props.updateMapState(map1);
  }, []);

  return (
    <React.Fragment>
      <div id="map1">
        <div
          id="map"
          className="map"
          style={{ height: "90vh", width: "98%" }}
        ></div>
        <input id="swipe" type="range" style={{ width: "100%" }} />
      </div>
      {/* <select id="type" style={{ marginBottom: "500px" }}>
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
      </select> */}
    </React.Fragment>
  );
}

export default Openlayer;
