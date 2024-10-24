"use client";
import React, { useState, useEffect } from "react";
import { DataAccess, Activity } from "@/utils/dataAccess";

interface ActivityViewProps {
  setCurrView: (view: "activity" | "progress", activityId?: string) => void;
}

const ActivityView: React.FC<ActivityViewProps> = ({ setCurrView }) => {
  const [newActivityName, setNewActivityName] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);

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

  const openActivity = (activityId: string) => {
    setCurrView("progress", activityId);
  };

  return (
    <div>
      <h2>Create a New Activity</h2>
      <input
        type="text"
        value={newActivityName}
        onChange={(e) => setNewActivityName(e.target.value)}
        placeholder="Activity name"
      />
      <button onClick={handleCreateActivity}>Add Activity</button>

      <h3>Your Activities</h3>
      <div className="">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex"
            onClick={() => openActivity(activity.id)}
          >
            <p>{activity.name}</p>
            <p>{activity.getCumulative()}</p>
            <p>{activity.getDailyAvg()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityView;
