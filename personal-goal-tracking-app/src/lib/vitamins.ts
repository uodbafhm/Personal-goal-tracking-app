/** Vitamin / supplement schedule — fixed weekly plan */

export interface Vitamin {
  id: string;
  name: string;
  nameAr?: string;
}

export const ALL_VITAMINS: Vitamin[] = [
  { id: "probiotic", name: "Probiotic", nameAr: "مخلل الخضار الطبيعي" },
  { id: "b-komplex", name: "B-Komplex" },
  { id: "zinc15", name: "Zinc 15 + Histidin + Cystein" },
  { id: "omega3", name: "Omega-3 1000" },
  { id: "az-komplett", name: "A-Z Komplett" },
];

export const vitaminById = (id: string): Vitamin | undefined =>
  ALL_VITAMINS.find((v) => v.id === id);

/** null = rest day */
export const WEEKLY_SCHEDULE: Record<number, string[] | null> = {
  0: ["probiotic", "b-komplex", "zinc15"],
  1: ["b-komplex", "omega3", "az-komplett"],
  2: ["probiotic", "az-komplett"],
  3: ["probiotic", "b-komplex", "zinc15"],
  4: ["probiotic", "az-komplett"],
  5: ["b-komplex", "omega3", "az-komplett"],
  6: null,
};

export function vitaminsForDay(dayOfWeek: number): string[] | null {
  return WEEKLY_SCHEDULE[dayOfWeek] ?? null;
}

/** 
 * Seeds and Grains daily schedule with scientific reasoning 
 */
export interface SeedItem {
  id: string;
  label: string;
}

export interface SeedSchedule {
  title: string;
  items: SeedItem[];
  reason: string;
}

export const SEEDS_SCHEDULE: Record<number, SeedSchedule> = {
  0: {
    title: "ممنوع الحبوب",
    items: [],
    reason: "الزنجلان وحبة البركة فيهم الزنك وفيتامينات B، والـ Zinc 15 مكمل قوي جداً. الألياف غتحبس امتصاصه، داكشي علاش هاد النهار ما كاين حتى حبة.",
  },
  1: {
    title: "الشيا والحلبة فقط",
    items: [
      { id: "s-chia", label: "معلقة كبيرة الشيا" },
      { id: "s-fenu", label: "معلقة كبيرة الحلبة" },
    ],
    reason: "الجدول فيه الأوميغا و A-Z. الشيا غتعطيك ألياف ممتازة للمصران، والحلبة غتعطيك حديد (حيت الـ A-Z الألماني غالباً ما فيش الحديد أو فيه كمية قليلة).",
  },
  2: {
    title: "كلشي ما عدا الزنجلان",
    items: [
      { id: "s-chia", label: "معلقة كبيرة الشيا" },
      { id: "s-fenu", label: "معلقة كبيرة الحلبة" },
      { id: "s-black", label: "معلقة صغيرة حبة البركة" },
    ],
    reason: "حيدنا الزنجلان حيت الـ A-Z فيه الكالسيوم والماغنيسيوم كافيين، والزنجلان عامر بيهم باش ما نديروش ثقل على الكلي.",
  },
  3: {
    title: "الزنجلان وحبة البركة فقط",
    items: [
      { id: "s-sesame", label: "معلقة كبيرة الزنجلان" },
      { id: "s-black", label: "معلقة صغيرة حبة البركة" },
    ],
    reason: "هاد النهار محتاجين طاقة ومعادن، الزنجلان غيعطيك الكالسيوم والنحاس والحديد اللي ناقصين في مكملات هاد النهار، وحبة البركة غتدعم المناعة.",
  },
  4: {
    title: "الشيا والحلبة فقط",
    items: [
      { id: "s-chia", label: "معلقة كبيرة الشيا" },
      { id: "s-fenu", label: "معلقة كبيرة الحلبة" },
    ],
    reason: "نفس مبدأ يوم الإثنين، كنركزو على الألياف والحديد والـ ALA.",
  },
  5: {
    title: "حبة البركة فقط",
    items: [{ id: "s-black", label: "معلقة صغيرة حبة البركة" }],
    reason: "للمناعة ومضادات الأكسدة. الشيا والزنجلان حيدناهم حيت الأوميغا والكالسيوم واجدين في الفنيد.",
  },
  6: {
    title: "ممنوع الحبوب",
    items: [],
    reason: "يوم راحة تام للذات (الماء فقط).",
  },
};

export function seedsForDay(dayOfWeek: number): SeedSchedule {
  return SEEDS_SCHEDULE[dayOfWeek];
}

/** Storage key */
const VKEY = "wakha.vitamins.log.v1";

/** Log: { "2025-01-20": { "b-komplex": true, "s-chia": true } } */
export type VitaminLog = Record<string, Record<string, boolean>>;

export function loadVitaminLog(): VitaminLog {
  try {
    const raw = localStorage.getItem(VKEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed as VitaminLog;
    }
  } catch {
    /* ignore */
  }
  return {};
}

export function saveVitaminLog(log: VitaminLog): void {
  try {
    localStorage.setItem(VKEY, JSON.stringify(log));
  } catch {
    /* ignore */
  }
}
