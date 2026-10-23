import {
  Bike,
  BookOpen,
  Brain,
  Code,
  Coffee,
  Droplets,
  Dumbbell,
  Footprints,
  GraduationCap,
  Heart,
  Languages,
  Moon,
  Music,
  Palette,
  PenLine,
  Salad,
  Star,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  salad: Salad,
  run: Footprints,
  study: GraduationCap,
  book: BookOpen,
  gym: Dumbbell,
  water: Droplets,
  mind: Brain,
  sleep: Moon,
  write: PenLine,
  lang: Languages,
  code: Code,
  music: Music,
  health: Heart,
  bike: Bike,
  coffee: Coffee,
  money: Wallet,
  art: Palette,
  other: Star,
};

export const ICON_KEYS = Object.keys(ICONS);

export const iconFor = (key: string): LucideIcon => ICONS[key] ?? Star;
