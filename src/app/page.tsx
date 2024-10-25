"use client";
import { DataAccess } from "@/utils/dataAccess";
import ActivityView from "@/components/ActivityView";
import ActivityProgressView from "@/components/ActivityProgressView";
import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  const [currView, setCurrView] = useState<"activity" | "progress">("activity");
  const [selectedActivityId, setSelectedActivityId] = useState<string>("null");

  const handleSetCurrView = (
    view: "activity" | "progress",
    activityId?: string
  ) => {
    setCurrView(view);
    if (activityId) {
      setSelectedActivityId(activityId);
    }
  };

  return (
    <ThemeProvider>
      <div className="flex justify-center">
        <ThemeSwitcher />
      </div>
      <div className="flex justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {currView === "activity" ? (
          <ActivityView setCurrView={handleSetCurrView} />
        ) : (
          <ActivityProgressView
            activityId={selectedActivityId}
            setCurrView={handleSetCurrView}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
