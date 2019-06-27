const margin = { top: 40, left: 75, right: 0, bottom: 75 };

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
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
}

export function drawLine(ctx, startX, startY, endX, endY, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}
