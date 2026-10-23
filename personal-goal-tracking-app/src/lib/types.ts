export type DayStatus = "done" | "missed";

export type ColorKey =
  | "lime"
  | "emerald"
  | "teal"
  | "sky"
  | "violet"
  | "pink"
  | "amber"
  | "orange";

export interface Habit {
  id: string;
  name: string;
  note?: string;
  icon: string;
  color: ColorKey;
  createdAt: string;
}

export type DayLog = Record<string, DayStatus>;
export type LogMap = Record<string, DayLog>;
