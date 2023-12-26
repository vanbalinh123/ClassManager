import React from "react";
import { Bar } from "react-chartjs-2";
import { Scatter } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
import Plot from "react-plotly.js";

const BarChartClass = ({chartData, layout}) => {
    console.log(chartData)
    return <Plot data={chartData} layout={layout}/>
}

export default BarChartClass;