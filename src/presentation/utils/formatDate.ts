import { Dayjs } from "dayjs";

function formatDate(date: Dayjs) {
  return date.format("D/M/YYYY");
}

function formatDateWithTime(date: Dayjs) {
  return date.format("D/M/YYYY H:mm");
}

function formatTime(date: Dayjs) {
  return date.format("H:mm");
}

export { formatDate, formatDateWithTime, formatTime };
