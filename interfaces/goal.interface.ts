import { Streak } from "@/interfaces/streak.interface";
import { Models } from "node-appwrite";

export interface Goal extends Models.Document {
  title: string;
  description: string;
  frequency: Frequency;
  completions: string[];
  streak: Streak;
}

export type Frequency =
  | "daily"
  | "weekly"
  | "bi-weekly"
  | "monthly"
  | "semi-monthly"
  | "quarterly"
  | "semesterly"
  | "yearly";
