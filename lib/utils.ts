import { clsx, type ClassValue } from "clsx";
import {
  addDays,
  endOfYear,
  format,
  getMonth,
  getQuarter,
  getWeek,
  getYear,
  isSameDay,
  isThisMonth,
  isThisQuarter,
  isThisWeek,
  isThisYear,
  isToday,
  parseISO,
  startOfYear,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { Frequency as FrequencyConst } from "@/constants/frequency.constant";
import { Frequency } from "@/interfaces/goal.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function formatDate(date: Date | string): string {
  date = new Date(date);
  const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
  const month = `${date.getMonth() + 1 < 10 ? "0" : ""}${date.getMonth() + 1}`;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function extractWebsiteName(url: string): string {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.hostname.split(".");
    return parts[parts.length - 2];
  } catch (e) {
    console.error(e);
    return "";
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function transformZodErrors(error: z.ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}

export function getDailyData(data: string[]) {
  if (!data.length) return [];

  const parsedDates = data.map((date) => parseISO(date));
  const earliest = startOfYear(parsedDates.reduce((a, b) => (a < b ? a : b)));
  const latest = endOfYear(parsedDates.reduce((a, b) => (a > b ? a : b)));

  const weeksMap: Record<
    string,
    { week: number; level: number; days: string[] }
  > = {};

  for (let day = earliest; day <= latest; day = addDays(day, 1)) {
    const strDay = format(day, "yyyy-MM-dd");
    const level = data.some(
      (date) => format(parseISO(date), "yyyy-MM-dd") === strDay,
    )
      ? 1
      : 0;
    const week = getWeek(day, { weekStartsOn: 0 });

    if (!weeksMap[week]) {
      weeksMap[week] = { week, level: 0, days: [] };
    }

    weeksMap[week].level += level;
    if (level === 1) {
      weeksMap[week].days.push(strDay);
    }
  }

  // Ensure all weeks from the start to the end of the year are included
  const totalWeeks = getWeek(latest, { weekStartsOn: 0 });
  for (let week = 1; week <= totalWeeks; week++) {
    if (!weeksMap[week]) {
      weeksMap[week] = { week, level: 0, days: [] };
    }
  }

  return Object.values(weeksMap);
}

export function getWeeklyData(data: string[]) {
  if (!data.length) return [];

  const parsedDates = data.map((date) => parseISO(date));
  const earliest = startOfYear(parsedDates.reduce((a, b) => (a < b ? a : b)));
  const latest = endOfYear(parsedDates.reduce((a, b) => (a > b ? a : b)));

  const weeksMap: Record<string, { week: number; level: number }> = {};

  for (let day = earliest; day <= latest; day = addDays(day, 1)) {
    const strDay = format(day, "yyyy-MM-dd");
    const level = data.some(
      (date) => format(parseISO(date), "yyyy-MM-dd") === strDay,
    )
      ? 1
      : 0;
    const week = getWeek(day, { weekStartsOn: 0 });

    if (!weeksMap[week]) {
      weeksMap[week] = { week, level: 0 };
    }

    weeksMap[week].level += level;
  }

  // Ensure all weeks from the start to the end of the year are included
  const totalWeeks = getWeek(latest, { weekStartsOn: 0 });
  for (let week = 1; week <= totalWeeks; week++) {
    if (!weeksMap[week]) {
      weeksMap[week] = { week, level: 0 };
    }
  }

  return Object.values(weeksMap);
}

export function getMonthlyData(data: string[]) {
  if (!data.length) return [];

  const parsedDates = data.map((date) => parseISO(date));
  const earliest = startOfYear(parsedDates.reduce((a, b) => (a < b ? a : b)));
  const latest = endOfYear(parsedDates.reduce((a, b) => (a > b ? a : b)));

  const monthsMap: Record<string, { month: number; level: number }> = {};

  for (let day = earliest; day <= latest; day = addDays(day, 1)) {
    const strDay = format(day, "yyyy-MM-dd");
    const level = data.some(
      (date) => format(parseISO(date), "yyyy-MM-dd") === strDay,
    )
      ? 1
      : 0;
    const month = getMonth(day) + 1; // getMonth returns 0-based month

    if (!monthsMap[month]) {
      monthsMap[month] = { month, level: 0 };
    }

    monthsMap[month].level += level;
  }

  // Ensure all months from January to December are included
  for (let month = 1; month <= 12; month++) {
    if (!monthsMap[month]) {
      monthsMap[month] = { month, level: 0 };
    }
  }

  return Object.values(monthsMap);
}

export function getQuarterlyData(data: string[]) {
  if (!data.length) return [];

  const parsedDates = data.map((date) => parseISO(date));
  const earliest = startOfYear(parsedDates.reduce((a, b) => (a < b ? a : b)));
  const latest = endOfYear(parsedDates.reduce((a, b) => (a > b ? a : b)));

  const quartersMap: Record<string, { quarter: number; level: number }> = {};

  for (let day = earliest; day <= latest; day = addDays(day, 1)) {
    const strDay = format(day, "yyyy-MM-dd");
    const level = data.some(
      (date) => format(parseISO(date), "yyyy-MM-dd") === strDay,
    )
      ? 1
      : 0;
    const quarter = getQuarter(day); // getQuarter returns 1-based quarter

    if (!quartersMap[quarter]) {
      quartersMap[quarter] = { quarter, level: 0 };
    }

    quartersMap[quarter].level += level;
  }

  // Ensure all quarters from Q1 to Q4 are included
  for (let quarter = 1; quarter <= 4; quarter++) {
    if (!quartersMap[quarter]) {
      quartersMap[quarter] = { quarter, level: 0 };
    }
  }

  return Object.values(quartersMap);
}

export function getSemesterlyData(data: string[]) {
  if (!data.length) return [];

  const parsedDates = data.map((date) => parseISO(date));
  const earliest = startOfYear(parsedDates.reduce((a, b) => (a < b ? a : b)));
  const latest = endOfYear(parsedDates.reduce((a, b) => (a > b ? a : b)));

  const semestersMap: Record<string, { semester: number; level: number }> = {};

  for (let day = earliest; day <= latest; day = addDays(day, 1)) {
    const strDay = format(day, "yyyy-MM-dd");
    const level = data.some(
      (date) => format(parseISO(date), "yyyy-MM-dd") === strDay,
    )
      ? 1
      : 0;
    const month = getMonth(day);
    const semester = month < 6 ? 1 : 2; // First semester: Jan-Jun, Second semester: Jul-Dec

    if (!semestersMap[semester]) {
      semestersMap[semester] = { semester, level: 0 };
    }

    semestersMap[semester].level += level;
  }

  // Ensure both semesters are included
  for (let semester = 1; semester <= 2; semester++) {
    if (!semestersMap[semester]) {
      semestersMap[semester] = { semester, level: 0 };
    }
  }

  return Object.values(semestersMap);
}

export function getYearlyData(data: string[]) {
  if (!data.length) return [];

  const parsedDates = data.map((date) => parseISO(date));
  const earliest = parsedDates.reduce((a, b) => (a < b ? a : b));
  const latest = parsedDates.reduce((a, b) => (a > b ? a : b));

  const yearsMap: Record<string, { year: number; level: number }> = {};

  for (let day = earliest; day <= latest; day = addDays(day, 1)) {
    const strDay = format(day, "yyyy-MM-dd");
    const level = data.some(
      (date) => format(parseISO(date), "yyyy-MM-dd") === strDay,
    )
      ? 1
      : 0;
    const year = getYear(day);

    if (!yearsMap[year]) {
      yearsMap[year] = { year, level: 0 };
    }

    yearsMap[year].level += level;
  }

  return Object.values(yearsMap);
}

export function handleDisable(frequency: Frequency, completions: string[]) {
  const today = new Date();

  switch (frequency) {
    case FrequencyConst.DAILY:
      return completions.some((completion) => isToday(parseISO(completion)));
    case FrequencyConst.WEEKLY:
      return completions.some((completion) =>
        isThisWeek(parseISO(completion), { weekStartsOn: 0 }),
      );
    case FrequencyConst.BIWEEKLY:
      // Assuming bi-weekly means every two weeks starting from the first week of the year
      const startOfYearDate = startOfYear(today);
      const weekNumber = Math.floor(
        (today.getTime() - startOfYearDate.getTime()) /
          (1000 * 60 * 60 * 24 * 7),
      );
      return completions.some((completion) => {
        const completionDate = parseISO(completion);
        const completionWeekNumber = Math.floor(
          (completionDate.getTime() - startOfYearDate.getTime()) /
            (1000 * 60 * 60 * 24 * 7),
        );
        return (
          Math.floor(weekNumber / 2) === Math.floor(completionWeekNumber / 2)
        );
      });
    case FrequencyConst.SEMIMONTHLY:
      // Assuming semi-monthly means twice a month (1st-15th and 16th-end)
      const dayOfMonth = today.getUTCDate();
      return completions.some((completion) => {
        const completionDate = parseISO(completion);
        const completionDayOfMonth = completionDate.getUTCDate();
        return (
          (dayOfMonth <= 15 && completionDayOfMonth <= 15) ||
          (dayOfMonth > 15 && completionDayOfMonth > 15)
        );
      });
    case FrequencyConst.MONTHLY:
      return completions.some((completion) =>
        isThisMonth(parseISO(completion)),
      );
    case FrequencyConst.QUARTERLY:
      return completions.some((completion) =>
        isThisQuarter(parseISO(completion)),
      );
    case FrequencyConst.SEMSTERLY:
      // Assuming semesterly means twice a year (Jan-Jun and Jul-Dec)
      const month = today.getUTCMonth();
      return completions.some((completion) => {
        const completionMonth = parseISO(completion).getUTCMonth();
        return (
          (month < 6 && completionMonth < 6) ||
          (month >= 6 && completionMonth >= 6)
        );
      });
    case FrequencyConst.YEARLY:
      return completions.some((completion) => isThisYear(parseISO(completion)));
    default:
      return false;
  }
}

export function calculateStreaks(dates: string[], frequency: Frequency) {
  if (!dates.length) return { currentStreak: 0, longestStreak: 0 };

  const parsedDates = dates
    .map((date) => parseISO(date))
    .sort((a, b) => a.getTime() - b.getTime());
  let currentStreak = 1;
  let longestStreak = 1;
  let streak = 1;

  for (let i = 1; i < parsedDates.length; i++) {
    const prevDate = parsedDates[i - 1];
    const currDate = parsedDates[i];

    let isConsecutive = false;
    switch (frequency) {
      case FrequencyConst.DAILY:
        isConsecutive = isSameDay(addDays(prevDate, 1), currDate);
        break;
      case FrequencyConst.WEEKLY:
        isConsecutive = getWeek(prevDate) + 1 === getWeek(currDate);
        break;
      case FrequencyConst.BIWEEKLY:
        isConsecutive = getWeek(prevDate) + 2 === getWeek(currDate);
        break;
      case FrequencyConst.SEMIMONTHLY:
        const prevMonth = getMonth(prevDate);
        const currMonth = getMonth(currDate);
        isConsecutive =
          (prevMonth === currMonth &&
            Math.abs(prevDate.getDate() - currDate.getDate()) <= 15) ||
          (prevMonth !== currMonth &&
            prevDate.getDate() > 15 &&
            currDate.getDate() <= 15);
        break;
      case FrequencyConst.MONTHLY:
        isConsecutive = getMonth(prevDate) + 1 === getMonth(currDate);
        break;
      case FrequencyConst.QUARTERLY:
        isConsecutive = getQuarter(prevDate) + 1 === getQuarter(currDate);
        break;
      case FrequencyConst.SEMSTERLY:
        const prevSemester = getMonth(prevDate) < 6 ? 1 : 2;
        const currSemester = getMonth(currDate) < 6 ? 1 : 2;
        isConsecutive =
          prevSemester === currSemester &&
          Math.abs(prevDate.getMonth() - currDate.getMonth()) <= 6;
        break;
      case FrequencyConst.YEARLY:
        isConsecutive = getYear(prevDate) + 1 === getYear(currDate);
        break;
      default:
        break;
    }

    if (isConsecutive) {
      streak++;
    } else {
      streak = 1;
    }

    if (streak > longestStreak) {
      longestStreak = streak;
    }
  }

  // Check if the current streak is still valid
  const today = new Date();
  const lastDate = parsedDates[parsedDates.length - 1];
  switch (frequency) {
    case FrequencyConst.DAILY:
      currentStreak =
        isSameDay(lastDate, today) || isSameDay(addDays(lastDate, 1), today)
          ? streak
          : 0;
      break;
    case FrequencyConst.WEEKLY:
      currentStreak =
        getWeek(lastDate) === getWeek(today) ||
        getWeek(lastDate) + 1 === getWeek(today)
          ? streak
          : 0;
      break;
    case FrequencyConst.BIWEEKLY:
      currentStreak =
        getWeek(lastDate) === getWeek(today) ||
        getWeek(lastDate) + 2 === getWeek(today)
          ? streak
          : 0;
      break;
    case FrequencyConst.SEMIMONTHLY:
      const lastMonth = getMonth(lastDate);
      const thisMonth = getMonth(today);
      currentStreak =
        (lastMonth === thisMonth &&
          Math.abs(lastDate.getDate() - today.getDate()) <= 15) ||
        (lastMonth !== thisMonth &&
          lastDate.getDate() > 15 &&
          today.getDate() <= 15)
          ? streak
          : 0;
      break;
    case FrequencyConst.MONTHLY:
      currentStreak =
        getMonth(lastDate) === getMonth(today) ||
        getMonth(lastDate) + 1 === getMonth(today)
          ? streak
          : 0;
      break;
    case FrequencyConst.QUARTERLY:
      currentStreak =
        getQuarter(lastDate) === getQuarter(today) ||
        getQuarter(lastDate) + 1 === getQuarter(today)
          ? streak
          : 0;
      break;
    case FrequencyConst.SEMSTERLY:
      const lastSemester = getMonth(lastDate) < 6 ? 1 : 2;
      const thisSemester = getMonth(today) < 6 ? 1 : 2;
      currentStreak =
        lastSemester === thisSemester &&
        Math.abs(lastDate.getMonth() - today.getMonth()) <= 6
          ? streak
          : 0;
      break;
    case FrequencyConst.YEARLY:
      currentStreak =
        getYear(lastDate) === getYear(today) ||
        getYear(lastDate) + 1 === getYear(today)
          ? streak
          : 0;
      break;
    default:
      currentStreak = 0;
      break;
  }

  return { currentStreak, longestStreak };
}
