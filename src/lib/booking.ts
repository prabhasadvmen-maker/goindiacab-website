import { useSyncExternalStore } from "react";

export type TripType = "oneway" | "roundtrip" | "local" | "airport";

export type FareBreakdown = {
  baseFare: number;
  extraKmFare: number;
  driverAllowance: number;
  gst: number;
  total: number;
  billableKm: number;
  includedKm?: number;
  perKmAfter?: number;
};

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export type CabOption = {
  id: string;
  name: string;
  model: string;
  seats: number;
  bags: number;
  image: string;
  rating: number;
  fuelType?: string;
  gstPercent?: number;
};

export type BookingData = {
  from: string;
  to: string;
  date: string;
  time: string;
  tripType: string;
  passengers: string;
  stop?: string;
  vehicle: {
    id: string;
    name: string;
    model: string;
    seats: number;
    image: string;
    gstPercent?: number;
    rating?: number;
    fuelType?: string;
    includedKm?: number;
    perKmAfter?: number;
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
