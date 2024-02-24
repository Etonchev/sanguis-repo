import { Data } from "@/app/all-tests/page";
import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "",
  bezierCurve: false,
};

interface LineChartProps {
  data: Data[];
}

export const LineChart = ({ data }: LineChartProps) => {
  const userData = data.map((entry) => {
    const date = Object.keys(entry)[0].toString();
    const value = entry[date];
    return [date, value];
  });

  userData.unshift(["Date", "Value"]);

  return (
    <Chart chartType="LineChart" width="100%" height="400px" data={userData} options={options} />
  );
};

export default LineChart;