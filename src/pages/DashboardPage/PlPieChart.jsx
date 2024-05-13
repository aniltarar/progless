import { PieChart } from "@mui/x-charts";
import React from "react";

function PlPieChart({ data }) {
  return (
    <PieChart
      series={[
        {
          data: data,
          innerRadius: 15,
          outerRadius: 60,
          paddingAngle: 5,
          cx: 100,
          cy: 75,
          highlightScope: {
            faded: "global",
            highlighted: "item",
          },
          faded: {
            innerRadius: 10,
            additionalRadius: -5,
          },
        },
      ]}
      height={150}
    />
  );
}

export default PlPieChart;
