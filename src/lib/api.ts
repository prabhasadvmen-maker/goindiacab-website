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

// FROM — only DB cities (North India list)
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

// TO — Google Places API (unlimited, any location in India)
export async function suggestDestinations(q: string, airportsOnly = false, city = ""): Promise<LocationSuggestion[]> {
  if (q.trim().length < 2) return [];
  try {
    const data = await apiFetch<{ suggestions: LocationSuggestion[] }>(
      `/api/locations/suggest-destination?q=${encodeURIComponent(q)}${airportsOnly ? `&type=airport&city=${encodeURIComponent(city)}` : ""}`
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

/** "Delhi / NCR, India" -> "Delhi"; "Agra, Uttar Pradesh" keeps its state so same-named places are not confused. */
const cityName = (s: string) =>
  s.replace(/\s*\/\s*NCR/i, "").replace(/,?\s*India\s*$/i, "").trim();

/** null = could not calculate; throws ApiError(SERVICE_NOT_AVAILABLE) when the pickup is outside the service area. */
export async function getDistanceApi(from: string, to: string, stop?: string): Promise<DistanceResult | null> {
  try {
    const stopQs = stop?.trim() ? `&stop=${encodeURIComponent(cityName(stop))}` : "";
    return await apiFetch<DistanceResult>(
      `/api/distance?from=${encodeURIComponent(cityName(from))}&to=${encodeURIComponent(cityName(to))}${stopQs}`
    );
  } catch (err) {
    if (err instanceof ApiError && err.code === "SERVICE_NOT_AVAILABLE") throw err;
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
  bags: number;
  rating: number;
  gstPercent: number;
  fuelType?: string;
  imageUrl: string;
  packages: VehiclePackage[];
};

/** null = the request failed; [] = the request worked but no vehicle is active. */
export async function getVehicles(): Promise<ApiVehicle[] | null> {
  try {
    const data = await apiFetch<{ vehicles: ApiVehicle[] }>("/api/fare/vehicles");
    return data.vehicles ?? [];
  } catch {
    return null;
  }
}

// ─── 3c. Website config (popular cities, local packages, policy) ─────────────
export type WebConfig = {
  popularCities: { name: string; state: string }[];
  localPackages: { label: string; hours: number; km: number }[];
  maxSeats: number;
  freeCancelMinutes: number;
  partPaymentPercent: number;
  policies: { kind: "included" | "excluded"; title: string; text: string }[];
};

let configPromise: Promise<WebConfig | null> | null = null;

/** Cached for the lifetime of the page; a failed load is retried on the next call. */
export function getWebConfig(): Promise<WebConfig | null> {
  if (!configPromise) {
    configPromise = apiFetch<WebConfig>("/api/web-config")
      .then((c): WebConfig => ({
        ...c,
        popularCities: c.popularCities ?? [],
        localPackages: c.localPackages ?? [],
        policies: c.policies ?? [],
      }))
      .catch(() => {
        configPromise = null;
        return null;
      });
  }
  return configPromise;
}

export const formatCancelWindow = (mins: number) =>
  mins >= 60 && mins % 60 === 0 ? `${mins / 60}hr` : `${mins}min`;

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

// ─── 3d. Coupons ──────────────────────────────────────────────────────────────
export type CartQuery = {
  vehicleType: string;
  distanceKm: number;
  tripType: string;
  package?: string;
  days?: number;
};

export type CouponOffer = {
  code: string;
  title: string;
  description: string;
  eligible: boolean;
  discount: number;
  reason: string;
};

export type CouponResult = {
  valid: true;
  code: string;
  title: string;
  discount: number;
  total: number;
  finalTotal: number;
};

export async function getAvailableCoupons(cart: CartQuery): Promise<CouponOffer[]> {
  const qs = new URLSearchParams({
    vehicleType: cart.vehicleType,
    distanceKm: String(cart.distanceKm),
    tripType: cart.tripType,
    ...(cart.package ? { package: cart.package } : {}),
  });
  try {
    const data = await apiFetch<{ coupons: CouponOffer[] }>(`/api/coupons/available?${qs.toString()}`);
    return data.coupons ?? [];
  } catch {
    return [];
  }
}

/** Throws ApiError with a customer-readable message when the coupon cannot be applied. */
export async function validateCoupon(cart: CartQuery & { code: string; mobile?: string }): Promise<CouponResult> {
  return apiFetch<CouponResult>("/api/coupons/validate", { method: "POST", body: JSON.stringify(cart) });
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
    stop?: string;
    date: string;
    time: string;
    tripType: string;
    distanceKm: number;
    package?: string;
    days?: number;
    returnDate?: string;
  };
  vehicle: { id: string };
  fare: { paymentOption: "part" | "full"; couponCode?: string };
};

export type CreateBookingResult = {
  success: true;
  bookingId: string;
  status: string;
  fare: {
    total: number;
    discount: number;
    couponCode: string;
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
    stop?: string;
    date: string;
    time: string;
    tripType: string;
    distanceKm: number;
  };
  vehicle: { name: string; model: string };
  fare: {
    discount?: number;
    couponCode?: string;
    baseFare: number;
    extraKmFare: number;
    driverAllowance: number;
    gst: number;
    total: number;
    paidNow: number;
    payLater: number;
  };
  bookedAt: string;
  confirmedAt?: string;
  statusHistory?: { status: string; at: string }[];
  cancelReason?: string;
  driver?: { name: string; phone: string; vehicleNumber: string } | null;
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
