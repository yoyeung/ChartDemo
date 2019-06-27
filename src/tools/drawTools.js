import { margin } from "./tools";

export function initCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (canvas === undefined) return {};
  const chartHeight = canvas.getAttribute("height");
  const chartWidth = canvas.getAttribute("width");
  const xMax = chartWidth - (margin.left + margin.right);
  const yMax = chartHeight - (margin.top + margin.bottom);
  const ctx = canvas.getContext("2d");
  return {
    ctx,
    chartHeight,
    chartWidth,
    xMax,
    yMax
  };
}

export function drawBar(
  ctx,
  upperLeftCornerX,
  upperLeftCornerY,
  width,
  height,
  color
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(upperLeftCornerX + margin.left, upperLeftCornerY, width, height);
  ctx.restore();
}

export function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX + margin.left, startY);
  ctx.lineTo(endX + margin.left, endY);
  ctx.stroke();
  ctx.restore();
}

export function drawText90(ctx, txt, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI * 0.5);
  ctx.textAlign = "center";
  ctx.fillText(txt, 0, 0);
  ctx.restore();
}

export function drawText(ctx, txt, x, y) {
  ctx.save();
  ctx.fillText(txt, x, y);
  ctx.restore();
}
