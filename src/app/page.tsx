"use client";
import { DataAccess } from "@/utils/dataAccess";
import ActivityView from "@/components/ActivityView";
import ActivityProgressView from "@/components/ActivityProgressView";
import React, { useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Head from "next/head";

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
      <title>Journey Log</title>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <main className="bg-background text-text">
          <div className="flex justify-items-center min-h-screen justify-center p-8 w-full">
            {currView === "activity" ? (
              <ActivityView setCurrView={handleSetCurrView} />
            ) : (
              <ActivityProgressView
                activityId={selectedActivityId}
                setCurrView={handleSetCurrView}
              />
            )}
          </div>
        </main>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
