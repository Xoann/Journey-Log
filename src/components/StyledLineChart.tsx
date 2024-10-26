import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Activity } from "@/utils/dataAccess";
import dayjs, { Dayjs } from "dayjs";
import { colors, createTheme, ThemeProvider } from "@mui/material";
import { useTheme, Shade } from "@/context/ThemeContext";
import { format } from "path";
import { formatGraphDate } from "@/utils/formatters";

interface StyledLineChartrProps {
  activity: Activity;
}

const StyledLineChart: React.FC<StyledLineChartrProps> = ({ activity }) => {
  const { dates, timeSpent } = activity.getEntryCumulativeData();
  const dayjsDates = dates.map((date) => dayjs(date));
  const { currentTheme } = useTheme();

  const highlightColor = currentTheme?.getShade(Shade.High);

  // Calculate min and max dates
  const minDate =
    dayjsDates.length > 0 ? dayjsDates[0] : dayjs().subtract(1, "month");
  const maxDate =
    dayjsDates.length > 0 ? dayjsDates[dayjsDates.length - 1] : dayjs();

  return (
    <LineChart
      xAxis={[
        {
          data: dayjsDates,
          label: "Date",
          labelStyle: { fill: "white" },
          tickLabelStyle: { fill: "white" },
          tickNumber: 5,
          valueFormatter: (date: Dayjs) => formatGraphDate(date),
          min: minDate.toDate(),
          max: maxDate.toDate(),
        },
      ]}
      yAxis={[
        {
          label: "Cumulative Time",
          labelStyle: { fill: "white" },
          tickLabelStyle: { fill: "white" },
          valueFormatter: (value: number) => `${value}h`,
        },
      ]}
      series={[
        {
          data: timeSpent,
          color: highlightColor,
          showMark: false,
        },
      ]}
      width={500}
      height={300}
      slotProps={{
        legend: {},
        axisLine: {
          style: { stroke: "white" },
        },
        axisTick: {
          style: { stroke: "white" },
        },
        popper: {
          sx: {
            "& .MuiChartsTooltip-table": {
              backgroundColor: "#374151",
              color: "white",
            },
            "& .MuiChartsTooltip-table thead": {
              // borderBottom: "1px solid #eee",
            },
            "& .MuiTypography-root": {
              color: "white",
            },
          },
        },
        noDataOverlay: {
          sx: {
            fill: "white",
          },
        },
      }}
    />
  );
};

export default StyledLineChart;
