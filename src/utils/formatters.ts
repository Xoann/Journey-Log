import dayjs, { Dayjs } from "dayjs";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatGraphDate = (date: Dayjs): string => {
  return dayjs(date).format("MMM D");
};

const formatTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

export { formatDate, formatTime, formatGraphDate };
