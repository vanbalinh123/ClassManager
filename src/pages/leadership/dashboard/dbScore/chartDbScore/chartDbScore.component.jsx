import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import Plot from "react-plotly.js";

const BarChartScore = ({chartData, layout}) => {
    return <Plot data={chartData} layout={layout}/>
}

export default BarChartScore;