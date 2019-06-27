import "./styles.css";
import data from "./data/data.json";
import chart from "./chart.js";

chart.init({ data, displayDay: 20, sma: 5 });
