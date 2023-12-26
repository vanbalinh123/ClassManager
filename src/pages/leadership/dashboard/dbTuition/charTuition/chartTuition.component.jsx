import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import Plot from "react-plotly.js";

const BarChartTuition = ({chartData, layout}) => {
    console.log(chartData)
    return <Plot data={chartData} layout={layout}/>
}

export default BarChartTuition;