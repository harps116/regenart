const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: "A4",
  pixelsPerInch: 300
};

const sketch = () => {
  function createUV(coord, count) {
    return count <= 1 ? 0.5 : coord / (count - 1);
  }
  function createGrid(count = 5) {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = createUV(x, count);
        const v = createUV(y, count);
        points.push([u, v]);
      }
    }
    return points;
  }

  random.setSeed(116);
  const points = createGrid(40).filter(() => random.value() > 0.5);
  const margin = 100;
  // render function
  return ({ context, width, height }) => {
    context.fillStyle = "white";

    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2, false);
      context.storkeStyle = "black";
      context.lineWidth = 5;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
