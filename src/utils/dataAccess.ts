import dayjs from "dayjs";

export interface ActivityInterface {
  id: string;
  name: string;
  goal: number;
  entries: ActivityEntry[];
}

export class Activity implements ActivityInterface {
  id: string;
  name: string;
  goal: number;
  entries: ActivityEntry[];

  constructor(
    id: string,
    name: string,
    goal: number,
    entries: ActivityEntry[]
  ) {
    this.id = id;
    this.name = name;
    this.goal = goal;
    this.entries = entries;
  }

  getCumulative(): number {
    return this.entries.reduce((total, entry) => total + entry.timeSpent, 0);
  }

  getDailyAvg(): number {
    const totalEntries = this.entries.length;
    const cumulativeTime = this.getCumulative();
    return totalEntries > 0 ? cumulativeTime / this.getTotalTrackedDays() : 0;
  }

  getDailyAvgWeek(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const lastWeekEntries = this.entries.filter(
      (entry) => new Date(entry.date) >= oneWeekAgo
    );
    const cumulativeTime = lastWeekEntries.reduce(
      (total, entry) => total + entry.timeSpent,
      0
    );

    const uniqueDates = new Set(lastWeekEntries.map((entry) => entry.date));
    const totalTrackedDays = uniqueDates.size;

    return totalTrackedDays > 0 ? cumulativeTime / totalTrackedDays : 0;
  }

  getTotalTrackedDays(): number {
    if (this.entries.length === 0) return 0;
    const earliestDate = new Date(
      Math.min(...this.entries.map((entry) => new Date(entry.date).getTime()))
    );
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - earliestDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getEntriesSet(): Map<string, number> {
    const dateMap = new Map<string, number>();
    this.entries.forEach((entry) => {
      if (dateMap.has(entry.date)) {
        dateMap.set(entry.date, dateMap.get(entry.date)! + entry.timeSpent);
      } else {
        dateMap.set(entry.date, entry.timeSpent);
      }
    });
    return dateMap;
  }

  getSortedEntries(): ActivityEntry[] {
    return this.entries.sort((a, b) =>
      dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1
    );
  }

  getEntryCumulativeData(): { dates: string[]; timeSpent: number[] } {
    const dateMap = new Map<string, number>(
      Array.from(this.getEntriesSet()).map(([date, timeSpent]) => [
        dayjs(date).format("YYYY-MM-DD"),
        Math.floor(timeSpent / 60),
      ])
    );

    const sortedDateMap = new Map(
      Array.from(dateMap.entries()).sort(([dateA], [dateB]) =>
        dayjs(dateA).isBefore(dayjs(dateB)) ? -1 : 1
      )
    );

    const dates = Array.from(sortedDateMap.keys());
    const timeSpent = Array.from(sortedDateMap.values());

    // Calculate cumulative time spent
    const cumulativeTimeSpent: number[] = [];
    timeSpent.reduce((acc, current, index) => {
      const cumulative = acc + current;
      cumulativeTimeSpent.push(cumulative);
      return cumulative;
    }, 0);

    return { dates, timeSpent: cumulativeTimeSpent };
  }

  getGoalRate(): number {
    if (this.entries.length === 0) return 0;

    const dateMap = this.getEntriesSet();

    const daysOverGoal = Array.from(dateMap.values()).filter(
      (totalTime) => totalTime >= this.goal
    ).length;
    const totalTrackedDays = this.getTotalTrackedDays();

    return totalTrackedDays > 0 ? (daysOverGoal / totalTrackedDays) * 100 : 0;
  }
}

export interface ActivityEntry {
  id: string;
  date: string;
  timeSpent: number;
}

const ACTIVITIES_KEY = "activities";

export class DataAccess {
  static getActivities(): Activity[] {
    const data = localStorage.getItem(ACTIVITIES_KEY);
    const parsedData = data ? JSON.parse(data) : [];
    return parsedData.map(
      (activity: any) =>
        new Activity(
          activity.id,
          activity.name,
          activity.goal,
          activity.entries
        )
    );
  }

  static saveActivities(activities: Activity[]): void {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities));
  }

  static addActivity(name: string): Activity {
    const activities = this.getActivities();
    const newActivity: Activity = new Activity(
      DataAccess.generateId(),
      name,
      0,
      []
    );
    activities.push(newActivity);
    this.saveActivities(activities);
    return newActivity;
  }

  static updateActivityGoal(activityId: string, newGoal: number): void {
    const activities = this.getActivities();
    const activity = activities.find((act) => act.id === activityId);

    if (activity) {
      activity.goal = newGoal;
      this.saveActivities(activities);
    }
  }

  static addActivityEntry(
    activityId: string,
    date: string,
    timeSpent: number
  ): void {
    const activities = this.getActivities();
    const activity = activities.find((act) => act.id === activityId);

    if (activity) {
      const newEntry: ActivityEntry = {
        id: DataAccess.generateId(),
        date,
        timeSpent,
      };
      activity.entries.push(newEntry);
      this.saveActivities(activities);
    }
  }

  static removeActivity(activityId: string): void {
    const activities = this.getActivities();
    const updatedActivities = activities.filter((act) => act.id !== activityId);
    this.saveActivities(updatedActivities);
  }

  static removeActivityEntry(activityId: string, entryId: string): void {
    const activities = this.getActivities();
    const activity = activities.find((act) => act.id === activityId);

    if (activity) {
      activity.entries = activity.entries.filter(
        (entry) => entry.id !== entryId
      );
      this.saveActivities(activities);
    }
  }

  static getActivityById(id: string): Activity | undefined {
    const activities = this.getActivities();
    return activities.find((activity) => activity.id === id);
  }

  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
