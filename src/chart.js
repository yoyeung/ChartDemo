import moment from "moment";
import {
  initCanvas,
  drawBar,
  drawLine,
  drawText,
  drawText90
} from "./tools/drawTools";
import { margin } from "./tools/tools";
import {
  maxValue as maxValueCalc,
  minValue as minValueCalc
} from "./tools/tools";
const chart = function() {
  let chartHeight, chartWidth, xMax, yMax, ctx;
  const MARGIN_VALUE = 0.2; // avoid the value cannot be display
  const BAR_CHART_MARGIN = 10; // margin between chart

  const COLOR = {
    bar: "red",
    line: "black"
  };
  const init = ({
    canvasId = "canvas",
    sma = 5,
    data = [],
    displayDay = 10
  }) => {
    ({ ctx, chartHeight, chartWidth, xMax, yMax } = initCanvas(canvasId));
    render(data, sma, displayDay);
  };
  const render = (data, sma, displayDay) => {
    data.sort((current, next) => {
      return moment(current.Date, "DD-MM-YYYY").diff(
        moment(next.Date, "DD-MM-YYYY")
      );
    });
    // console.log(data.map(data => data.Date));
    const dailyRecords = data.slice(data.length - 1 - displayDay);
    const smaData = calculateSMA(dailyRecords, data.slice(0), sma);

    const maxValue = maxValueCalc([...smaData, ...dailyRecords]) + MARGIN_VALUE;
    const minValue = minValueCalc([...smaData, ...dailyRecords]) - MARGIN_VALUE;
    const ratio = yMax / (maxValue - minValue);
    const barWidth = xMax / dailyRecords.length - 10; //margin

    const maxLabelValue = maxValueCalc(dailyRecords);
    const minLabelValue = minValueCalc(dailyRecords);
    console.log(minLabelValue, maxLabelValue);

    drawDailyBarChat(dailyRecords, ratio, minValue, barWidth);
    drawSMA(smaData, ratio, minValue, barWidth);
    renderLinesAndLabels(dailyRecords, maxLabelValue, minLabelValue);
  };

  function calculateSMA(dailyRecord, rawData, sma) {
    rawData.sort((current, next) => {
      return moment(next.Date, "DD-MM-YYYY").diff(
        moment(current.Date, "DD-MM-YYYY")
      );
    });
    //console.log(rawDate.map(data => data.Date));
    return dailyRecord.map(({ Date }) => {
      for (let i = 0; i < rawData.length; i++) {
        if (rawData[i].Date === Date) {
          // console.log(rawData[i], i, sma);
          const rawSMAData = rawData.slice(i + 1, i + sma + 1);
          // console.log(JSON.stringify(rawSMAData));
          return {
            Date,
            sma:
              rawSMAData.reduce((init, { AdjClose }) => init + AdjClose, 0) /
              sma
          };
        }
      }
      return -1;
    });
  }

  function drawSMA(smaData, ratio, minValue, orginWidth) {
    const center = orginWidth / 2;
    smaData.forEach((data, index) => {
      if (
        index < //< 1) {
        smaData.length - 1
      ) {
        // skip the last print
        // console.log(yMax - ratio * (data.sma - minValue));
        const next = smaData[index + 1];
        drawLine(
          ctx,
          index === 0
            ? center
            : (orginWidth + BAR_CHART_MARGIN) * index + center,
          yMax - ratio * (data.sma - minValue),
          (orginWidth + BAR_CHART_MARGIN) * (index + 1) + center,
          yMax - ratio * (next.sma - minValue),
          COLOR.chart
        );
      }
    });
  }
  function drawDailyBarChat(dailyRecords, ratio, minValue, barWidth) {
    dailyRecords.forEach((record, index) => {
      drawBar(
        ctx,
        (barWidth + BAR_CHART_MARGIN) * index, // x position
        yMax, // y position
        barWidth, //width
        -ratio * (record.AdjClose - minValue), //height
        COLOR.bar
      );
    });
  }

  function renderLinesAndLabels(data, maxValue, minValue) {
    const MAX_LABEL = 15;
    //Vertical guide lines
    const yInc = yMax / (maxValue - minValue);
    const yValInc = (maxValue - minValue) / yInc;
    const xInc = xMax / data.length;
    let yPos = yMax;
    let xPos = margin.left;
    const dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      let txt = data[i].Date;
      drawText90(ctx, txt, xPos + 200 / dataLength, yMax + margin.bottom / 3);
      xPos += xInc;
    }
    for (let i = 0; i < MAX_LABEL; i++) {
      yPos -= i === 0 ? 0 : yInc;
      //Draw horizontal lines
      drawLine(ctx, 0, yPos, xMax, yPos, "#E8E8E8");
      //y axis labels
      const txt = (minValue + yValInc * i).toFixed(2);
      const txtSize = ctx.measureText(txt);

      drawText(
        ctx,
        txt,
        margin.left - (txtSize.width >= 14 ? txtSize.width : 10) - 7,
        yPos + 4
      );
    }

    //Vertical line
    drawLine(ctx, 0, 0, 0, yMax, "black");

    //Horizontal Line
    drawLine(ctx, 0, yMax, xMax, yMax, "black");
  }

  return {
    init
  };
};
export default chart();
