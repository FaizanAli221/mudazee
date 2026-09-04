import { customAlphabet } from "nanoid";
import { v4 as uuid } from "uuid";

const numeric = customAlphabet("0123456789", 6);

/** e.g. MDZ-241203-482913 */
export function generateOrderNumber(): string {
  const date = new Date();
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `MDZ-${yy}${mm}${dd}-${numeric()}`;
}

/** Public, guessable-resistant tracking id shared with the customer. */
export function generateTrackingId(): string {
  return uuid().replace(/-/g, "").slice(0, 12).toUpperCase();
}

export function generateGuestToken(): string {
  return uuid();
}
