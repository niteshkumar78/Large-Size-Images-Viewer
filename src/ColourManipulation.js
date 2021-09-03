import React, { useEffect } from "react";

function ColourManipulation(props) {
  var brightness = document.getElementById("lightness");
  var contrastSlider = document.getElementById("contrastSlider");
  function normalize(kernel) {
    const len = kernel.length;
    const normal = new Array(len);
    let i,
      sum = 0;
    for (i = 0; i < len; ++i) {
      sum += kernel[i];
    }
    if (sum <= 0) {
      normal.normalized = false;
      sum = 1;
    } else {
      normal.normalized = true;
    }
    for (i = 0; i < len; ++i) {
      normal[i] = kernel[i] / sum;
    }
    return normal;
  }
  useEffect(() => {
    if (props.map != undefined) {
      props.baseLayer.on("postrender", function (event) {
        var canvas = document.querySelector("canvas");
        var context = canvas.getContext("2d");

        if (canvas.width > 0) {
          //Invert Filter Start
          // var imageData1 = context.getImageData(
          //   0,
          //   0,
          //   canvas.width,
          //   canvas.height
          // );
          // for (var i = 0; i < imageData1.data.length; i += 4) {
          //   // imageData.data[i] = imageData.data[i] ^ 255;
          //   imageData1.data[i] =
          //     Math.round((100 * imageData1.data[i]) / 255) / 10;
          // }
          // context.putImageData(imageData1, 0, 0);
          //Invert Filter End
          //Brightness Control Start
          // let imageData2 = context.getImageData(
          //   0,
          //   0,
          //   canvas.width,
          //   canvas.height
          // );
          // let b = parseInt(brightness.value);
          // for (var j = 0; j < imageData2.data.length; j += 4) {
          //   imageData2.data[j] += 255 * (b / 100);
          //   imageData2.data[j + 1] += 255 * (b / 100);
          //   imageData2.data[j + 2] += 255 * (b / 100);
          // }
          // context.putImageData(imageData2, 0, 0);
          // //Brightness Control END
          // //Contrast Control Start
          // let imageData = context.getImageData(
          //   0,
          //   0,
          //   canvas.width,
          //   canvas.height
          // );
          // let cont = parseInt(contrastSlider.value, 10);
          // var factor = (259.0 * (cont + 255.0)) / (255.0 * (259.0 - cont));
          // for (var i = 0; i < imageData.data.length; i += 4) {
          //   imageData.data[i] = truncateColor(
          //     factor * (imageData.data[i] - 128.0) + 128.0
          //   );
          //   imageData.data[i + 1] = truncateColor(
          //     factor * (imageData.data[i + 1] - 128.0) + 128.0
          //   );
          //   imageData.data[i + 2] = truncateColor(
          //     factor * (imageData.data[i + 2] - 128.0) + 128.0
          //   );
          // }
          // context.putImageData(imageData, 0, 0);
          //Contrast Control End
          //
          //Edge detect Start
          // var edge = [0, 1, 0, 1, -4, 1, 0, 1, 0];
          // var kernel = normalize(edge);
          // let width = canvas.width;
          // let height = canvas.height;
          // const size = Math.sqrt(kernel.length);
          // const half = Math.floor(size / 2);
          // const inputData = context.getImageData(0, 0, width, height).data;
          // const output = context.createImageData(width, height);
          // const outputData = output.data;
          // for (let pixelY = 0; pixelY < height; ++pixelY) {
          //   const pixelsAbove = pixelY * width;
          //   for (let pixelX = 0; pixelX < width; ++pixelX) {
          //     let r = 0,
          //       g = 0,
          //       b = 0,
          //       a = 0;
          //     for (let kernelY = 0; kernelY < size; ++kernelY) {
          //       for (let kernelX = 0; kernelX < size; ++kernelX) {
          //         const weight = kernel[kernelY * size + kernelX];
          //         const neighborY = Math.min(
          //           height - 1,
          //           Math.max(0, pixelY + kernelY - half)
          //         );
          //         const neighborX = Math.min(
          //           width - 1,
          //           Math.max(0, pixelX + kernelX - half)
          //         );
          //         const inputIndex = (neighborY * width + neighborX) * 4;
          //         r += inputData[inputIndex] * weight;
          //         g += inputData[inputIndex + 1] * weight;
          //         b += inputData[inputIndex + 2] * weight;
          //         a += inputData[inputIndex + 3] * weight;
          //       }
          //     }
          //     const outputIndex = (pixelsAbove + pixelX) * 4;
          //     outputData[outputIndex] = r;
          //     outputData[outputIndex + 1] = g;
          //     outputData[outputIndex + 2] = b;
          //     outputData[outputIndex + 3] = kernel.normalized ? a : 255;
          //   }
          // }
          // context.putImageData(output, 0, 0);
        }
      });
    }
  });

  // function handleBrightnessChange() {
  //   var canvas = document.querySelector("canvas");
  //   var context = canvas.getContext("2d");
  //   document.getElementById("brightnessValue").innerText = brightness.value;

  //   let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  //   let b = parseInt(brightness.value);
  //   for (var j = 0; j < imageData.data.length; j += 4) {
  //     imageData.data[j] += 255 * (b / 100);
  //     imageData.data[j + 1] += 255 * (b / 100);
  //     imageData.data[j + 2] += 255 * (b / 100);
  //   }
  //   context.putImageData(imageData, 0, 0);
  //   props.baseLayer.getSource().changed();
  // }

  // function truncateColor(value) {
  //   if (value < 0) {
  //     value = 0;
  //   } else if (value > 255) {
  //     value = 255;
  //   }

  //   return value;
  // }

  // function handleContrastChange() {
  //   var canvas = document.querySelector("canvas");
  //   var context = canvas.getContext("2d");
  //   document.getElementById("contrastValue").innerText = contrastSlider.value;
  //   let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  //   let cont = parseInt(contrastSlider.value, 10);
  //   var factor = (259.0 * (cont + 255.0)) / (255.0 * (259.0 - cont));

  //   for (var i = 0; i < imageData.data.length; i += 4) {
  //     imageData.data[i] = truncateColor(
  //       factor * (imageData.data[i] - 128.0) + 128.0
  //     );
  //     imageData.data[i + 1] = truncateColor(
  //       factor * (imageData.data[i + 1] - 128.0) + 128.0
  //     );
  //     imageData.data[i + 2] = truncateColor(
  //       factor * (imageData.data[i + 2] - 128.0) + 128.0
  //     );
  //   }
  //   context.putImageData(imageData, 0, 0);
  //   props.baseLayer.getSource().changed();
  // }

  return (
    <ul className="sub1 colorM">
      <li>
        brightness (<span id="brightnessValue">0</span>)
        <input
          // id="lightness"
          type="range"
          min="0.0"
          max="2.0"
          step="0.1"
          defaultValue="1"
          // onChange={handleBrightnessChange}
          onChange={(e) => {
            document.querySelector(
              ".ol-layer"
            ).style.filter = `brightness(${e.target.value})`;
          }}
        ></input>
      </li>
      <li>
        contrast (<span id="contrastValue">0</span>)
        <input
          id="contrastSlider"
          type="range"
          min="0.2"
          max="4.0"
          step="0.1"
          defaultValue="1"
          // onChange={handleContrastChange}
          onChange={(e) => {
            document.querySelector(
              "#map1"
            ).style.filter = `contrast(${e.target.value})`;
          }}
        ></input>
      </li>
      <li className="in">
        Saturation
        <input
          type="range"
          min="0.0"
          max="4.0"
          step="0.1"
          defaultValue="1"
          onChange={(e) => {
            document.getElementById(
              "map"
            ).style.filter = `saturate(${e.target.value})`;
          }}
        ></input>
      </li>
      <li>
        hue shift
        <input
          id="hue"
          type="range"
          min="-180"
          max="180"
          step="10"
          defaultValue="0"
          onChange={(e) => {
            document.querySelector(
              ".ol-unselectable"
            ).style.filter = `hue-rotate(${e.target.value}deg)`;
          }}
        ></input>
      </li>
      <li>
        invert
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.1"
          defaultValue="0"
          onChange={(e) => {
            document.querySelector(
              "canvas"
            ).style.filter = `invert(${e.target.value})`;
          }}
        ></input>
      </li>
      {/* <li>
        chroma
        <input id="chroma" type="range" min="0" max="200"></input>
      </li>
      <li>
        edge detect
        <input type="range" min="0" max="100" defaultValue="100"></input>
      </li> */}
    </ul>
  );
}

export default ColourManipulation;
