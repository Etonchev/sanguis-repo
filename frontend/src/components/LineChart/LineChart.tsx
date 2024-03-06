import React from "react";
import { Chart } from "react-google-charts";
import { format } from "date-fns";

export const options = {
  title: "",
  curveType: "function",
  legend: { position: "bottom" },
};

interface DataPoint {
  [date: string]: number;
}

interface LineChartProps {
  data: DataPoint[];
}

export const LineChart = ({ data }: LineChartProps) => {
  console.log(data);
  const userData = data.map((entry) => [format(new Date(entry.date), "yyyy-MM-dd"), entry.value]);

  userData.unshift(["Date", "Value"]);

  return (
    <Chart chartType="LineChart" width="100%" height="400px" data={userData} options={options} />
  );
};

export default LineChart;
