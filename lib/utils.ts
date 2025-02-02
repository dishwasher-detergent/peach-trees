import { clsx, type ClassValue } from "clsx";
import {
  addDays,
  endOfYear,
  format,
  getMonth,
  getQuarter,
  getWeek,
  getYear,
  parseISO,
  startOfYear,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

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
  // Count occurrences of each date
  const dateCounts: Record<string, number> = data.reduce(
    (acc, date) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const entries = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    level: count,
  }));

  entries.sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime(),
  );

  if (!entries.length) return [];

  const earliest = startOfYear(parseISO(entries[0].date));
  const latest = endOfYear(parseISO(entries[entries.length - 1].date));
  const weeksMap: Record<string, { date: string; level: number }[]> = {};

  for (let day = earliest; day <= latest; day = addDays(day, 1)) {
    let isoWeek = getWeek(day, { weekStartsOn: 0 });

    if (isoWeek === 1 && day.getMonth() === 11) {
      isoWeek = 53;
    }

    const strDay = format(day, "yyyy-MM-dd");
    const foundEntry = entries.find((e) => e.date === strDay);

    if (!weeksMap[isoWeek]) {
      weeksMap[isoWeek] = [];
    }

    weeksMap[isoWeek].push(foundEntry || { date: strDay, level: 0 });
  }

  const weeklyData = Object.entries(weeksMap).map(([week, days]) => {
    const totalLevel = days.reduce((acc, day) => acc + day.level, 0);
    const happenedDates = days
      .filter((day) => day.level > 0)
      .map((day) => day.date);

    return {
      week: parseInt(week, 10),
      level: totalLevel,
      dates: happenedDates,
    };
  });

  return weeklyData;
}

export function getWeeklyData(data: string[]) {
  if (!data.length) return [];

  const parsedDates = data.map((date) => parseISO(date));
  const earliest = startOfYear(parsedDates.reduce((a, b) => (a < b ? a : b)));
  const latest = endOfYear(parsedDates.reduce((a, b) => (a > b ? a : b)));

  const weeksMap: Record<string, { week: number; level: number }> = {};

  for (let day = earliest; day <= latest; day = addDays(day, 1)) {
    const strDay = format(day, "yyyy-MM-dd");
    const level = data.includes(strDay) ? 1 : 0;
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
    const level = data.includes(strDay) ? 1 : 0;
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
    const level = data.includes(strDay) ? 1 : 0;
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
    const level = data.includes(strDay) ? 1 : 0;
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
    const level = data.includes(strDay) ? 1 : 0;
    const year = getYear(day);

    if (!yearsMap[year]) {
      yearsMap[year] = { year, level: 0 };
    }

    yearsMap[year].level += level;
  }

  return Object.values(yearsMap);
}
