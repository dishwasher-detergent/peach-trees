import { Models } from "node-appwrite";

export interface Goal extends Models.Document {
  title: string;
  description: string;
  frequency: Frequency;
  completions: string[];
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
