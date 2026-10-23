// GoIndiaCab — API Client
// Base URL from environment variable
const BASE = process.env.NEXT_PUBLIC_API_URL || "";

// ─── Generic fetch with 10s timeout ───────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
    });
    const json = await res.json();
    if (!res.ok) throw new ApiError(res.status, json.error ?? "SERVER_ERROR", json.message ?? "Something went wrong");
    return json as T;
  } finally {
    clearTimeout(timer);
  }
}

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── 1. Location Autocomplete ─────────────────────────────────────────────────
export type LocationSuggestion = { label: string; value: string };

export async function suggestLocations(q: string): Promise<LocationSuggestion[]> {
  if (q.trim().length < 2) return [];
  try {
    const data = await apiFetch<{ suggestions: LocationSuggestion[] }>(
      `/api/locations/suggest?q=${encodeURIComponent(q)}`
    );
    return data.suggestions ?? [];
  } catch {
    return [];
  }
}

// ─── 2. Distance Calculation ──────────────────────────────────────────────────
export type DistanceResult = {
  distanceKm: number;
  durationMins: number;
  routeLabel: string;
  source: "admin" | "cache" | "api";
};

/** "Delhi / NCR, India" -> "Delhi" (the API wants a plain city name). */
const cityName = (s: string) => s.split(",")[0].replace(/\s*\/\s*NCR$/i, "").trim();

export async function getDistanceApi(from: string, to: string): Promise<DistanceResult | null> {
  try {
    return await apiFetch<DistanceResult>(
      `/api/distance?from=${encodeURIComponent(cityName(from))}&to=${encodeURIComponent(cityName(to))}`
    );
  } catch {
    return null;
  }
}

// ─── 3a. Vehicle List ─────────────────────────────────────────────────────────
export type VehiclePackage = {
  label: string;
  hours: number;
  km: number;
  price: number;
};

export type ApiVehicle = {
  id: string;
  name: string;
  model: string;
  seats: number;
  imageUrl: string;
  packages: VehiclePackage[];
};

export async function getVehicles(): Promise<ApiVehicle[]> {
  try {
    const data = await apiFetch<{ vehicles: ApiVehicle[] }>("/api/fare/vehicles");
    return data.vehicles ?? [];
  } catch {
    return [];
  }
}

// ─── 3b. Fare Calculation ─────────────────────────────────────────────────────
export type FareResult = {
  baseFare: number;
  extraKmFare: number;
  driverAllowance: number;
  gst: number;
  total: number;
  billableKm: number;
  includedKm: number;
  perKmAfter: number;
  paymentOptions: {
    full: { paidNow: number; payLater: number };
    part: { percent: number; paidNow: number; payLater: number };
  };
};

export async function calculateFareApi(params: {
  vehicleType: string;
  distanceKm: number;
  tripType: string;
  package?: string;
  days?: number;
}): Promise<FareResult | null> {
  try {
    return await apiFetch<FareResult>("/api/fare/calculate", {
      method: "POST",
      body: JSON.stringify(params),
    });
  } catch {
    return null;
  }
}

// ─── 4. Create Booking ────────────────────────────────────────────────────────
export type CreateBookingPayload = {
  passenger: {
    name: string;
    mobile: string;
    email: string;
    pickupAddress: string;
    dropAddress?: string;
    instructions?: string;
  };
  trip: {
    from: string;
    to: string;
    date: string;
    time: string;
    tripType: string;
    distanceKm: number;
    package?: string;
    days?: number;
  };
  vehicle: { id: string };
  fare: { paymentOption: "part" | "full" };
};

export type CreateBookingResult = {
  success: true;
  bookingId: string;
  status: string;
  fare: {
    total: number;
    paymentOption: string;
    paidNow: number;
    payLater: number;
  };
  message: string;
};

export async function createBooking(payload: CreateBookingPayload): Promise<CreateBookingResult> {
  return apiFetch<CreateBookingResult>("/api/booking/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ─── 5. Get Booking ───────────────────────────────────────────────────────────
export type BookingDetail = {
  bookingId: string;
  status: string;
  paymentStatus: "pending" | "paid" | "failed";
  passenger: {
    name: string;
    mobile: string;
    email: string;
    pickupAddress: string;
  };
  trip: {
    from: string;
    to: string;
    date: string;
    time: string;
    tripType: string;
    distanceKm: number;
  };
  vehicle: { name: string; model: string };
  fare: {
    baseFare: number;
    extraKmFare: number;
    driverAllowance: number;
    gst: number;
    total: number;
    paidNow: number;
    payLater: number;
  };
  bookedAt: string;
};

export async function getBooking(bookingId: string): Promise<BookingDetail | null> {
  try {
    return await apiFetch<BookingDetail>(`/api/booking/${encodeURIComponent(bookingId)}`);
  } catch {
    return null;
  }
}

// ─── 6. Create Payment Order ──────────────────────────────────────────────────
export type PaymentOrder = {
  orderId: string;
  amount: number; // paise
  currency: string;
  keyId: string;
};

export async function createPaymentOrder(bookingId: string): Promise<PaymentOrder> {
  return apiFetch<PaymentOrder>("/api/payment/create-order", {
    method: "POST",
    body: JSON.stringify({ bookingId }),
  });
}

// ─── 7. Verify Payment ────────────────────────────────────────────────────────
export type VerifyPaymentPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingId: string;
};

export type VerifyPaymentResult = {
  success: boolean;
  bookingId: string;
  paymentId: string;
  status: string;
};

export async function verifyPayment(payload: VerifyPaymentPayload): Promise<VerifyPaymentResult> {
  return apiFetch<VerifyPaymentResult>("/api/payment/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
