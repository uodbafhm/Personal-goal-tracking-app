const pad = (n: number) => String(n).padStart(2, "0");

/** YYYY-MM-DD in local time */
export const dateKey = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayKey = (): string => dateKey(new Date());

export const parseKey = (key: string): Date => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
};

export const addDays = (d: Date, n: number): Date => {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
};

/** Darija day names (getDay(): 0 = Sunday) */
export const DAYS_FULL = [
  "الحد",
  "التنين",
  "التلات",
  "الأربع",
  "الخميس",
  "الجمعة",
  "السبت",
];

export const DAYS_SHORT = ["حد", "تن", "تلا", "رب", "خم", "جم", "سب"];

/** Moroccan month names */
export const MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "ماي",
  "يونيو",
  "يوليوز",
  "غشت",
  "شتنبر",
  "أكتوبر",
  "نونبر",
  "دجنبر",
];

export const fullDate = (d: Date): string =>
  `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

export const greeting = (h = new Date().getHours()): string => {
  if (h < 5) return "سهران؟ الله يعاونك";
  if (h < 12) return "صباح النور";
  if (h < 18) return "مرحبا بيك";
  return "مسا النور";
};

export const QUOTES = [
  "شوية بشوية، كتوصل.",
  "ماشي ضروري تكون مثالي… ضروري تكون مستمر.",
  "اليوم أحسن من غدا.",
  "جسمك كيستاهل، وعقلك حتى هو.",
  "الخطوة الصغيرة ديال اليوم، نتيجة كبيرة ديال غدا.",
  "راه قادر، غير كمّل.",
  "الانضباط هو أحسن هدية لراسك.",
];

export const quoteOfTheDay = (): string => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return QUOTES[dayOfYear % QUOTES.length];
};
