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

import ImageLayer from "ol/layer/Image";

import { getRenderPixel } from "ol/render";

import "./map.css";
import HeatMap from "./HeatMap";
import { map } from "jquery";

import kml from "./2012_Earthquakes_Mag5.kml";

function Openlayer(props) {
  useEffect(() => {
    //Seperate

    var baseSource = new XYZ({
      url: "https://gslimageserver.herokuapp.com/img2/{z}/{x}_{y}.jpeg",
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

    const map1 = new Map({
      controls: defaultControls().extend([new FullScreen()]),

      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),

      target: "map",
      layers: [baseLayer, drawVector],
      view: new View({
        center: fromLonLat([-179.569898, 85.03]),
        zoom: 10,
        maxZoom: 15,
        constrainOnlyCenter: true,

        multiWorld: true,
      }),
    });

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
      </div>
    </React.Fragment>
  );
}

export default Openlayer;
