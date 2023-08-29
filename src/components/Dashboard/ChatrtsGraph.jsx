import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    [
      "Semester",
      "Student Requests",
      "Opportunities",
    ],
    [0, 10, 20],
    [1, 20, 10],
    [2, 30, 35],
    // [4, 40, 60],
    // [5, 55, 20],
    // [6, 90, 50]
];

export const options = {
  chart: {
    title: "Internship  Opportunities",
    subtitle: "in month for the past twelve months",
  },
};

const ChatrtsGraph = () => {
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="200px"
      data={data}
      options={options}
    />
  );
};

export default ChatrtsGraph;
