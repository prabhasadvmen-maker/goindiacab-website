"use client";

import clsx from "clsx";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTE_STEPS = Array.from({ length: 12 }, (_, i) => i * 5);
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Time picker with hour, minute and AM/PM dropdowns. Value is a 24-hour "HH:mm" string, like <input type="time">.
 * The native picker's AM/PM order and layout differ per browser (some list PM before AM); this one always lists AM first.
 */
export function TimeSelect({
  value, onChange, className, selectClassName, ariaLabel = "Time",
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  selectClassName?: string;
  ariaLabel?: string;
}) {
  const [hh, mm] = value.split(":").map(Number);
  const valid = Number.isFinite(hh) && Number.isFinite(mm);
  const period: "AM" | "PM" = valid && hh >= 12 ? "PM" : "AM";
  const hour12 = valid ? hh % 12 || 12 : 12;
  const minute = valid ? mm : 0;
  // 5-minute steps, plus the current minute when it is not on a step (e.g. a time coming from a link).
  const minutes = [...new Set([...MINUTE_STEPS, minute])].sort((a, b) => a - b);

  const emit = (h12: number, m: number, p: "AM" | "PM") => {
    onChange(`${pad((h12 % 12) + (p === "PM" ? 12 : 0))}:${pad(m)}`);
  };

  const sel = clsx("bg-transparent outline-none cursor-pointer text-xs font-black text-gray-900", selectClassName);

  return (
    <div className={clsx("flex items-center gap-0.5", className)}>
      <select aria-label={`${ariaLabel} hour`} className={sel} value={hour12} onChange={(e) => emit(Number(e.target.value), minute, period)}>
        {HOURS.map((h) => <option key={h} value={h}>{pad(h)}</option>)}
      </select>
      <span className="text-xs font-black text-gray-500" aria-hidden>:</span>
      <select aria-label={`${ariaLabel} minute`} className={sel} value={minute} onChange={(e) => emit(hour12, Number(e.target.value), period)}>
        {minutes.map((m) => <option key={m} value={m}>{pad(m)}</option>)}
      </select>
      <select aria-label={`${ariaLabel} AM or PM`} className={clsx(sel, "ml-1")} value={period} onChange={(e) => emit(hour12, minute, e.target.value as "AM" | "PM")}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
