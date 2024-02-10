import { Data } from "@/app/all-tests/page";
import React from "react";
import { Chart } from "react-google-charts";

export const mockData = [
  ["2020-01-02", 6.2],
  ["2020-03-05", 3.2],
  ["2020-04-09", 6.6],
  ["2020-05-11", 4.2],
];

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
  const outputData = userData.concat(mockData);

  return (
    <Chart chartType="LineChart" width="100%" height="400px" data={outputData} options={options} />
  );
};

export default LineChart;
