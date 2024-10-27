// import React, { useState, useEffect } from "react";
// import { Activity } from "@/utils/dataAccess";
// import { useTheme } from "@/context/ThemeContext";
// import StyledButton from "./StyledButton";

// interface HeatmapCalendarProps {
//   activity: Activity;
// }

// const monthNames = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({ activity }) => {
//   const [year, setYear] = useState(new Date().getFullYear());
//   const { currentTheme } = useTheme();

//   const timeData = activity.getEntriesSet();

//   const daysInYear = (year: number) => {
//     const date = new Date(year, 0, 1);
//     const days = [];
//     while (date.getFullYear() === year) {
//       days.push(new Date(date));
//       date.setDate(date.getDate() + 1);
//     }

//     return days;
//   };

//   const getColor = (timeSpent: number | undefined): string => {
//     const {
//       default: defaultColor,
//       low,
//       mediumLow,
//       medium,
//       mediumHigh,
//       high,
//     } = currentTheme?.heatmapColors;
//     if (!timeSpent) return defaultColor;
//     if (timeSpent >= activity.goal * 1.3) return high;
//     if (timeSpent >= activity.goal) return mediumHigh;
//     if (timeSpent >= (2 * activity.goal) / 3) return medium;
//     if (timeSpent >= activity.goal / 2) return mediumLow;
//     if (timeSpent > 0) return low;
//     return defaultColor;
//   };

//   const getWeekdayIndex = (day: Date) => (day.getDay() + 6) % 7;

//   const renderCalendar = (renderYear: number) => {
//     const days = daysInYear(renderYear);
//     const firstDay = new Date(year, 0, 1);
//     const firstWeekday = getWeekdayIndex(firstDay);

//     let calendarCells: JSX.Element[][] = Array(53)
//       .fill(null)
//       .map(() => []);

//     // Fill the first column's days with empty divs for padding if the year doesn't start on Monday
//     for (let i = 0; i < firstWeekday; i++) {
//       calendarCells[0].push(<div key={`empty-${i}`} className="w-4 h-4" />);
//     }

//     // Populate calendar grid with actual day elements
//     days.forEach((day, idx) => {
//       const dayString = day.toISOString().split("T")[0];
//       const timeSpent = timeData.get(dayString);
//       const weekIndex = Math.floor((idx + firstWeekday) / 7);
//       calendarCells[weekIndex].push(
//         <div
//           key={dayString}
//           className={`w-4 h-4 rounded-sm cursor-pointer ${getColor(
//             timeSpent
//           )} transition-colors duration-300`}
//           title={`${dayString}: ${timeSpent || 0} minutes`}
//         />
//       );
//     });

//     // Render the calendarCells in a column-major order
//     return calendarCells.map((week, weekIdx) => (
//       <div key={`week-${weekIdx}`} className="grid grid-rows-7 gap-1">
//         {week}
//       </div>
//     ));
//   };

//   return (
//     <div className="flex flex-col items-center mt-5">
//       <div className="flex justify-between items-center w-full max-w-md">
//         <StyledButton onClick={() => setYear(year - 1)}>
//           ◀ Previous Year
//         </StyledButton>
//         <h2 className="text-xl text-white font-semibold">{year}</h2>
//         <StyledButton onClick={() => setYear(year + 1)}>
//           Next Year ▶
//         </StyledButton>
//       </div>

//       <div className="grid grid-cols-53 gap-1 mt-5">
//         {" "}
//         {/* 52 weeks, plus 1 for some buffer */}
//         {renderCalendar(year)}
//       </div>
//     </div>
//   );
// };

// export default HeatmapCalendar;

import React, { useState } from "react";
import { Activity } from "@/utils/dataAccess";
import { useTheme } from "@/context/ThemeContext";
import StyledButton from "./StyledButton";

interface HeatmapCalendarProps {
  activity: Activity;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({ activity }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { currentTheme } = useTheme();

  const timeData = activity.getEntriesSet();

  const daysInYear = (year: number) => {
    const date = new Date(year, 0, 1);
    const days = [];
    while (date.getFullYear() === year) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const getColor = (timeSpent: number | undefined): string => {
    const {
      default: defaultColor,
      low,
      mediumLow,
      medium,
      mediumHigh,
      high,
    } = currentTheme?.heatmapColors;
    if (!timeSpent) return defaultColor;
    if (timeSpent >= activity.goal * 1.3) return high;
    if (timeSpent >= activity.goal) return mediumHigh;
    if (timeSpent >= (2 * activity.goal) / 3) return medium;
    if (timeSpent >= activity.goal / 2) return mediumLow;
    if (timeSpent > 0) return low;
    return defaultColor;
  };

  const getWeekdayIndex = (day: Date) => (day.getDay() + 6) % 7;

  const renderCalendar = (renderYear: number) => {
    const days = daysInYear(renderYear);
    const firstDay = new Date(year, 0, 1);
    const firstWeekday = getWeekdayIndex(firstDay);

    let calendarCells: JSX.Element[][] = Array(53)
      .fill(null)
      .map(() => []);

    // Fill the first column's days with empty divs for padding if the year doesn't start on Monday
    for (let i = 0; i < firstWeekday; i++) {
      calendarCells[0].push(<div key={`empty-${i}`} className="w-4 h-4" />);
    }

    // Populate calendar grid with actual day elements
    days.forEach((day, idx) => {
      const dayString = day.toISOString().split("T")[0];
      const timeSpent = timeData.get(dayString);
      const weekIndex = Math.floor((idx + firstWeekday) / 7);
      calendarCells[weekIndex].push(
        <div
          key={dayString}
          className={`w-4 h-4 rounded-sm cursor-pointer ${getColor(
            timeSpent
          )} transition-colors duration-300`}
          title={`${dayString}: ${timeSpent || 0} minutes`}
        />
      );
    });

    // Render the calendarCells in a column-major order
    return calendarCells.map((week, weekIdx) => (
      <div key={`week-${weekIdx}`} className="grid grid-rows-7 gap-1">
        {week}
      </div>
    ));
  };

  // Get start index for each month
  const getMonthStartIndices = () => {
    const days = daysInYear(year);
    const startIndices = [];
    for (let month = 0; month < 12; month++) {
      const monthStartDate = new Date(year, month, 1);
      const index = days.findIndex(
        (day) => day.getMonth() === month && day.getDate() === 1
      );
      if (index !== -1) {
        startIndices.push(Math.floor(index / 7)); // Convert to week index
      }
    }
    return startIndices;
  };

  const monthStartIndices = getMonthStartIndices();

  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <div className="flex justify-between items-center w-full max-w-md">
        <StyledButton onClick={() => setYear(year - 1)}>
          ◀ Previous Year
        </StyledButton>
        <h2 className="text-xl text-white font-semibold">{year}</h2>
        <StyledButton onClick={() => setYear(year + 1)}>
          Next Year ▶
        </StyledButton>
      </div>

      <div className="grid grid-cols-53 gap-1 mt-5">{renderCalendar(year)}</div>

      {/* Render month names under the calendar */}
      <div className="flex justify-around w-full mt-2">
        {monthNames.map((month, idx) => (
          <span
            key={month}
            style={{
              gridColumnStart: monthStartIndices[idx] + 1,
            }}
            className="text-xs text-gray-400"
          >
            {month}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeatmapCalendar;
