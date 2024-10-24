"use client";
import React, { useState, useEffect } from "react";
import { DataAccess, Activity } from "@/utils/dataAccess";
import { formatDate, formatTime } from "@/utils/formatters";

interface ActivityProgressViewProps {
  activityId: string;
  setCurrView: (view: "activity" | "progress", activityId?: string) => void;
}

const ActivityProgressView: React.FC<ActivityProgressViewProps> = ({
  activityId,
  setCurrView,
}) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [entryDate, setEntryDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
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
      setGoalRate(activity.getGoalRate());
      console.log(activity.getGoalRate());
    }
  }, [goal]);

  const handleActivityViewClick = () => {
    setCurrView("activity");
  };

  const handleAddEntry = () => {
    if (activity) {
      DataAccess.addActivityEntry(activityId, entryDate, timeSpent);
      const updatedActivity = DataAccess.getActivityById(activityId);
      setActivity(updatedActivity || null);
      setEntryDate(new Date().toISOString().split("T")[0]);
      setTimeSpent(0);
    }
  };

  const updateGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGoal = Number(e.target.value);
    setGoal(newGoal);
    if (activity) {
      DataAccess.updateActivityGoal(activityId, newGoal);
      const updatedActivity = DataAccess.getActivityById(activityId);
      if (updatedActivity) {
        setActivity(updatedActivity);
        setGoalRate(updatedActivity.getGoalRate());
      }
    }
  };

  const renderActivityDetails = () => {
    return (
      <div>
        <div>
          <h1>{activity?.name}</h1>
          <p>Cumulative Time: {activity?.getCumulative()}</p>
          <p>Daily Average: {activity?.getDailyAvg()}</p>
          <p>Total days: {activity?.getTotalTrackedDays()}</p>
          <p>Percentage goal hit: {goalRate}</p>
          <p>Daily goal:</p>
          <input
            type="number"
            onChange={updateGoal}
            className="text-black"
            value={goal}
          />
        </div>
        <div>
          <p>Add entry:</p>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />
          <input
            type="number"
            value={timeSpent}
            onChange={(e) => setTimeSpent(Number(e.target.value))}
            placeholder="Time spent"
          />
          <button onClick={handleAddEntry}>Add Entry</button>
        </div>
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
