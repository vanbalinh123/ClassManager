import React from "react";
import Plot from "react-plotly.js";

const BarChartTuition = ({chartData, layout}) => {
    return <Plot data={chartData} layout={layout}/>
}

export default BarChartTuition;