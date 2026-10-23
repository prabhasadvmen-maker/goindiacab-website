import { useSyncExternalStore } from "react";

export type VehicleType = "hatchback" | "sedan" | "suv" | "innova" | "tempo9";
export type TripType = "oneway" | "roundtrip" | "local" | "airport";

export const fareRules: Record<
  VehicleType,
  { baseKm: number; baseFare: number; perKm: number; driverAllowance: number; gst: number }
> = {
  hatchback: { baseKm: 300, baseFare: 2800, perKm: 11, driverAllowance: 300, gst: 0.05 },
  sedan: { baseKm: 300, baseFare: 3200, perKm: 13, driverAllowance: 300, gst: 0.05 },
  suv: { baseKm: 300, baseFare: 4500, perKm: 16, driverAllowance: 400, gst: 0.05 },
  innova: { baseKm: 300, baseFare: 5500, perKm: 18, driverAllowance: 400, gst: 0.05 },
  tempo9: { baseKm: 300, baseFare: 7000, perKm: 22, driverAllowance: 500, gst: 0.05 },
};

export const distanceMap: Record<string, number> = {
  "delhi-agra": 233,
  "delhi-jaipur": 281,
  "delhi-chandigarh": 248,
  "delhi-haridwar": 214,
  "delhi-dehradun": 302,
  "delhi-shimla": 343,
  "delhi-manali": 536,
  "delhi-amritsar": 449,
  "delhi-varanasi": 821,
  "delhi-lucknow": 555,
  "delhi-mathura": 147,
  "delhi-vrindavan": 155,
  "delhi-ayodhya": 636,
  "delhi-noida": 25,
  "delhi-gurgaon": 32,
  "delhi-faridabad": 35,
  default: 300,
};

export const CITIES = [
  "Delhi", "New Delhi", "Delhi NCR", "Noida", "Gurgaon", "Faridabad", "Ghaziabad",
  "Agra", "Jaipur", "Chandigarh", "Haridwar", "Rishikesh", "Dehradun", "Shimla",
  "Manali", "Amritsar", "Varanasi", "Lucknow", "Mathura", "Vrindavan", "Ayodhya",
  "Nainital", "Mussoorie", "Srinagar", "Jammu", "Dharamshala", "McLeod Ganj",
];

export type FareBreakdown = {
  baseFare: number;
  extraKmFare: number;
  driverAllowance: number;
  gst: number;
  total: number;
  billableKm: number;
};

/** `scale` shrinks the base fare for local / airport packages (1 = outstation). */
export function calculateFare(
  vehicleType: VehicleType,
  distanceKm: number,
  tripType: string,
  scale = 1
): FareBreakdown {
  const rule = fareRules[vehicleType];
  if (scale !== 1) {
    const baseFare = Math.round((rule.baseFare * scale) / 10) * 10;
    const driverAllowance = rule.driverAllowance;
    const subtotal = baseFare + driverAllowance;
    const gst = Math.round(subtotal * rule.gst);
    return { baseFare, extraKmFare: 0, driverAllowance, gst, total: subtotal + gst, billableKm: distanceKm };
  }
  const effectiveKm = tripType === "roundtrip" ? distanceKm * 2 : distanceKm;
  const billableKm = Math.max(effectiveKm, rule.baseKm);
  const baseFare = rule.baseFare;
  const extraKmFare = Math.max(0, billableKm - rule.baseKm) * rule.perKm;
  const subtotal = baseFare + extraKmFare + rule.driverAllowance;
  const gst = Math.round(subtotal * rule.gst);
  return { baseFare, extraKmFare, driverAllowance: rule.driverAllowance, gst, total: subtotal + gst, billableKm };
}

export function getDistance(from: string, to: string): number {
  const key = (s: string) => s.trim().toLowerCase().split(/[\s,/]+/)[0];
  const a = key(from);
  const b = key(to);
  const alias = (s: string) => (s === "new" ? "delhi" : s);
  const x = alias(a);
  const y = alias(b);
  return distanceMap[`${x}-${y}`] ?? distanceMap[`${y}-${x}`] ?? distanceMap.default;
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export type CabOption = {
  id: string;
  type: VehicleType;
  name: string;
  model: string;
  seats: number;
  bags: number;
  image: string;
  rating: number;
};

export const CABS: CabOption[] = [
  { id: "hatchback", type: "hatchback", name: "Hatchback", model: "WagonR, Swift or similar", seats: 4, bags: 2, image: "/vehicles/hatchback.jpg", rating: 4.6 },
  { id: "sedan", type: "sedan", name: "Sedan", model: "Dzire, Etios or similar", seats: 4, bags: 3, image: "/vehicles/sedan.jpg", rating: 4.8 },
  { id: "suv", type: "suv", name: "SUV", model: "Ertiga, Innova or similar", seats: 6, bags: 4, image: "/vehicles/suv.jpg", rating: 4.8 },
  { id: "innova", type: "innova", name: "Premium SUV", model: "Innova Crysta", seats: 7, bags: 5, image: "/vehicles/innova.jpg", rating: 4.9 },
];

export type BookingData = {
  from: string;
  to: string;
  date: string;
  time: string;
  tripType: string;
  passengers: string;
  vehicle: {
    id: string;
    name: string;
    model: string;
    seats: number;
    image: string;
    fare: { baseFare: number; extraKmFare: number; driverAllowance: number; gst: number; total: number };
  };
  distanceKm: number;
  pkg?: string;
  partPercent?: number;
  selectedAt: number;
};

/** The backend only knows oneway | roundtrip | local; airport transfers are billed as one-way. */
export const apiTripType = (t: string) => (t === "airport" ? "oneway" : t);

const noopSubscribe = () => () => {};

/** Reads a localStorage string once on the client. undefined = not hydrated yet, null = missing. */
export function useStoredString(key: string): string | null | undefined {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => undefined
  );
}

export const nowMs = () => Date.now();

export const FALLBACK_IMG = "/hero_white_sedan.png";

export function formatDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  if (isNaN(h)) return time;
  const ap = h >= 12 ? "PM" : "AM";
  return `${String(h % 12 || 12).padStart(2, "0")}:${String(m || 0).padStart(2, "0")} ${ap}`;
}

export const TRIP_LABEL: Record<string, string> = {
  oneway: "One Way",
  roundtrip: "Round Trip",
  local: "Local Rental",
  airport: "Airport Transfer",
};
