import "./styles.css";
import chart from "./chart.js";
import data from "./data.json";
chart.init({ data, displayDay: 30, sma: 5 });
