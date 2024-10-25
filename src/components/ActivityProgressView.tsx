"use client";
import React, { useState, useEffect } from "react";
import { DataAccess, Activity } from "@/utils/dataAccess";
import { formatDate, formatTime } from "@/utils/formatters";
import HeatmapCalendar from "@/components/HeatmapCalendar";
import NumberInput from "@/components/NumberInput";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "@/context/ThemeContext";
import StyledDatePicker from "@/components/StyledDatePicker";
import StyledLineChart from "@/components/StyledLineChart";

interface ActivityProgressViewProps {
  activityId: string;
  setCurrView: (view: "activity" | "progress", activityId?: string) => void;
}

const ActivityProgressView: React.FC<ActivityProgressViewProps> = ({
  activityId,
  setCurrView,
}) => {
  const { currentTheme } = useTheme();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [goal, setGoal] = useState<number>(activity?.goal || 0);
  const [goalRate, setGoalRate] = useState<number>(0);

  useEffect(() => {
    const fetchedActivity = DataAccess.getActivityById(activityId);
    console.log(activityId);
    setActivity(fetchedActivity || null);
  }, [activityId]);

  useEffect(() => {
    if (activity) {
      setGoal(activity.goal); // Initialize goal from activity
      setGoalRate(activity.getGoalRate());
    }
  }, [activity]);

  useEffect(() => {
    if (activity) {
      setGoalRate(activity.getGoalRate());

      DataAccess.updateActivityGoal(activityId, goal);
      const updatedActivity = DataAccess.getActivityById(activityId);
      if (updatedActivity) {
        setActivity(updatedActivity);
        setGoalRate(updatedActivity.getGoalRate());
      }
    }
  }, [goal, activityId]);

  const handleActivityViewClick = () => {
    setCurrView("activity");
  };

  const handleAddEntry = () => {
    if (activity) {
      const entryDate = date?.toISOString().split("T")[0] || "";
      DataAccess.addActivityEntry(activityId, entryDate, timeSpent);
      const updatedActivity = DataAccess.getActivityById(activityId);
      setActivity(updatedActivity || null);
      setDate(null);
      setTimeSpent(0);
    }
  };

  const getShade = (actual: number, max: number): string => {
    const percentage = (actual / max) * 100;
    if (percentage >= 100) return currentTheme.highlightedTextColors.high;
    if (percentage >= 75) return currentTheme.highlightedTextColors.mediumHigh;
    if (percentage >= 50) return currentTheme.highlightedTextColors.medium;
    if (percentage >= 25) return currentTheme.highlightedTextColors.mediumLow;
    return currentTheme.highlightedTextColors.low;
  };

  const renderActivityDetails = () => {
    return (
      <div>
        <div>
          <h1>{activity?.name}</h1>
          <div className="flex">
            <p>Cumulative Time: </p>
            <p className={`${getShade(100, 100)} font-bold`}>
              {activity?.getCumulative()}
            </p>
          </div>
          <div className="flex">
            <p>Daily Average: </p>
            <p
              className={`${getShade(
                activity?.getDailyAvg() || 0,
                goal
              )} font-bold`}
            >
              {Math.floor(activity?.getDailyAvg() || 0)}
            </p>
          </div>
          <div className="flex">
            <p>Total days: </p>
            <p className={`${getShade(100, 100)} font-bold`}>
              {activity?.getTotalTrackedDays()}
            </p>
          </div>
          <div className="flex">
            <p>Percentage goal hit: </p>
            <p className={`${getShade(goalRate, 100)} font-bold`}>
              {Math.floor(goalRate)}
            </p>
          </div>
          <p>Daily goal:</p>
          <NumberInput
            value={goal}
            onChange={setGoal}
            placeholder="0"
            min={0}
          />
        </div>
        <div>
          <p>Add entry:</p>
          <StyledDatePicker date={date} onChange={setDate} />
          <NumberInput
            value={timeSpent}
            onChange={setTimeSpent}
            placeholder="0"
            min={0}
          />
          <button onClick={handleAddEntry}>Add Entry</button>
        </div>

        {activity != null ? <StyledLineChart activity={activity} /> : null}
        {activity != null ? <HeatmapCalendar activity={activity} /> : null}

        <div>
          {activity?.entries.map((entry) => (
            <div key={entry.id} className="flex">
              <p>{formatDate(entry.date)}</p>
              <p>{formatTime(entry.timeSpent)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div onClick={handleActivityViewClick}>Back</div>
      <div>
        {activity ? renderActivityDetails() : <p>Activity not found</p>}
      </div>
    </div>
  );
};

export default ActivityProgressView;
