"use client";
import React, { useState, useEffect } from "react";
import { DataAccess, Activity } from "@/utils/dataAccess";
import { Shade, useTheme } from "@/context/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import StyledButton from "@/components/StyledButton";

interface ActivityViewProps {
  setCurrView: (view: "activity" | "progress", activityId?: string) => void;
}

const ActivityView: React.FC<ActivityViewProps> = ({ setCurrView }) => {
  const [newActivityName, setNewActivityName] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const activities = DataAccess.getActivities();
    setActivities(activities);
  }, []);

  const handleCreateActivity = () => {
    if (newActivityName.trim()) {
      const newActivity = DataAccess.addActivity(newActivityName);
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setNewActivityName("");
    }
  };

  const handleDeleteAcity = (activityId: string) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      setActivities((prevActivities) =>
        prevActivities.filter((a) => a.id !== activityId)
      );
      DataAccess.removeActivity(activityId);
    }
  };

  const openActivity = (activityId: string) => {
    setCurrView("progress", activityId);
  };

  return (
    <div className="w-1056">
      <div className="flex justify-end">
        <ThemeSwitcher />
      </div>
      <h1 className="text-4xl my-14">
        Welcome to{" "}
        <span className={`${currentTheme?.highlightedTextColors.mediumHigh}`}>
          Journey{" "}
        </span>
        <span className={`${currentTheme?.highlightedTextColors.high}`}>
          Logger
        </span>
      </h1>
      <div title="add activity" className="mb-4 flex gap-4">
        <input
          type="text"
          value={newActivityName}
          onChange={(e) => setNewActivityName(e.target.value)}
          placeholder="Activity name"
          className={`border rounded bg-transparent focus:ring-0 outline-none px-2 py-1 h-10 w-36`}
        />
        <StyledButton onClick={handleCreateActivity}>Add Activity</StyledButton>
      </div>

      <h3 className="text-center text-2xl mb-4">Your Activities</h3>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Activity Name</th>
            <th className="border px-4 py-2">Cumulative</th>
            <th className="border px-4 py-2">Daily Average</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="cursor-pointer">
              <td
                onClick={() => openActivity(activity.id)}
                className="border px-4 py-2 text-center"
              >
                {activity.name}
              </td>
              <td
                onClick={() => openActivity(activity.id)}
                className="border px-4 py-2 text-center"
              >
                {Math.floor(activity.getCumulative() / 60)} hours
              </td>
              <td
                onClick={() => openActivity(activity.id)}
                className="border px-4 py-2 text-center"
              >
                {(activity.getDailyAvg() / 60).toFixed(2)} hours
              </td>
              <td
                className="border px-4 py-2 text-center"
                onClick={() => {
                  handleDeleteAcity(activity.id);
                }}
              >
                <button className="text-text">X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {activities.length === 0 && (
        <p className="text-center mt-8">Try adding some activities</p>
      )}
    </div>
  );
};

export default ActivityView;
