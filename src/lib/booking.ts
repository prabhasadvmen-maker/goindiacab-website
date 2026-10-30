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
  includedHours?: number;
  perHourAfter?: number;
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
  airportDir?: AirportDir;
  passengers: string;
  stop?: string;
  returnDate?: string;
  days?: number;
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
    billableKm?: number;
    bags?: number;
    perKmAfter?: number;
    includedHours?: number;
    perHourAfter?: number;
    fare: { baseFare: number; extraKmFare: number; driverAllowance: number; gst: number; total: number };
  };
  distanceKm: number;
  pkg?: string;
  partPercent?: number;
  selectedAt: number;
};

/** Backend trip types: oneway | roundtrip | local | airport (airport is priced with its own rates). */
export const apiTripType = (t: string) => t;

/** "from" = pickup from the airport, "to" = drop to the airport. Only meaningful for airport trips. */
export type AirportDir = "from" | "to";
export const AIRPORT_DIR_LABEL: Record<AirportDir, string> = { from: "Airport Pickup", to: "Airport Drop" };

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

/** Round trip: number of calendar days from pickup to return, inclusive (same day = 1). */
export const tripDays = (date: string, returnDate?: string) => {
  if (!date || !returnDate) return 1;
  const diff = Math.round((Date.parse(returnDate) - Date.parse(date)) / 86_400_000);
  return Number.isFinite(diff) ? Math.min(30, Math.max(1, diff + 1)) : 1;
};
