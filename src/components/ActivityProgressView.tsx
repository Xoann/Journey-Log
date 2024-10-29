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
import EntryUpload from "@/components/EntryUpload";
import ThemeSwitcher from "./ThemeSwitcher";
import StyledButton from "./StyledButton";

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
    setActivity(fetchedActivity || null);
    if (fetchedActivity) {
      setGoal(fetchedActivity.goal);
      setGoalRate(fetchedActivity.getGoalRate());
    }
  }, [activityId]);

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

  const handleDeleteEntry = (entryId: string) => {
    if (activity) {
      if (window.confirm("Are you sure you want to delete this entry?")) {
        DataAccess.removeActivityEntry(activityId, entryId);
        const updatedActivity = DataAccess.getActivityById(activityId);
        setActivity(updatedActivity || null);
      }
    }
  };

  const getShade = (actual: number, max: number): string => {
    const percentage = (actual / max) * 100;
    if (percentage >= 100) return currentTheme?.highlightedTextColors.high;
    if (percentage >= 75) return currentTheme?.highlightedTextColors.mediumHigh;
    if (percentage >= 50) return currentTheme?.highlightedTextColors.medium;
    if (percentage >= 25) return currentTheme?.highlightedTextColors.mediumLow;
    return currentTheme?.highlightedTextColors.low;
  };

  const handleDataUpload = (data: { date: string; value: number }[] | null) => {
    if (activity) {
      data?.forEach((entry) => {
        DataAccess.addActivityEntry(activityId, entry.date, entry.value);
      });
      const updatedActivity = DataAccess.getActivityById(activityId);
      setActivity(updatedActivity || null);
    }
  };

  const renderActivityDetails = () => {
    if (!activity) return null;
    return (
      <div className="w-full">
        <section className="text-center pb-4">
          <h1 className="text-center text-4xl">{activity?.name}</h1>
        </section>
        <section className="mb-14 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="flex flex-col gap-5">
              <div className="flex">
                <p>
                  Cumulative Time:{" "}
                  <span className={`${getShade(100, 100)} font-bold`}>
                    {Math.floor(activity.getCumulative() / 60)} hours
                  </span>
                </p>
              </div>
              <div className="flex">
                <p>
                  Daily Average:{" "}
                  <span
                    className={`${getShade(
                      activity?.getDailyAvg() || 0,
                      goal
                    )} font-bold`}
                  >
                    {(activity.getDailyAvg() / 60).toFixed(2) || "0.00"} hours
                  </span>
                </p>
              </div>
              <div className="flex">
                <p>
                  Days logging:{" "}
                  <span className={`${getShade(100, 100)} font-bold`}>
                    {activity?.getTotalTrackedDays()} days
                  </span>
                </p>
              </div>
              <div className="flex">
                <p>
                  Percentage goal hit:{" "}
                  <span className={`${getShade(goalRate, 100)} font-bold`}>
                    {Math.floor(goalRate)}%
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                <p className="mr-2">Daily goal (min): </p>
                <NumberInput
                  value={goal}
                  onChange={setGoal}
                  placeholder="0"
                  min={0}
                  unit="min"
                />
              </div>
            </div>
          </div>
          <StyledLineChart activity={activity} />
        </section>

        <section className="mb-10 w-full">
          <HeatmapCalendar activity={activity} />
        </section>

        <StyledButton
          onClick={() => {
            console.log(activity);
          }}
        >
          Test
        </StyledButton>

        <section className="flex flex-col items-center">
          <div className="flex gap-4 py-4 items-stretch mb-8">
            <StyledDatePicker date={date} onChange={setDate} />
            <NumberInput
              title="time spent (min)"
              value={timeSpent}
              onChange={setTimeSpent}
              placeholder="0"
              min={0}
              large
            />
            <StyledButton onClick={handleAddEntry}>Add Entry</StyledButton>
          </div>
          <div className="mb-8">
            <EntryUpload onDataUpload={handleDataUpload} />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h2 className="text-xl mb-3">Entries</h2>
            {activity.getSortedEntries().map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between w-60  border-white"
              >
                <p>{formatDate(entry.date)}</p>
                <p>{formatTime(entry.timeSpent)}</p>
                <div
                  className="cursor-pointer"
                  onClick={() => handleDeleteEntry(entry.id)}
                >
                  ✖
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="w-1056">
      <div className="flex justify-between">
        <StyledButton onClick={handleActivityViewClick}>← Back</StyledButton>
        <ThemeSwitcher />
      </div>
      <div>
        {activity ? renderActivityDetails() : <p>Activity not found</p>}
      </div>
    </div>
  );
};

export default ActivityProgressView;
