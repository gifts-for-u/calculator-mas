/**
 * date-validator.js — Anniversary Date Normalization & Validation
 * Target date: 9 June 2023
 */

export function validateAnniversaryDate(rawInput) {
  if (!rawInput || typeof rawInput !== "string") {
    return false;
  }

  // 1. Trim and lowercase
  let str = rawInput.trim().toLowerCase();

  // 2. Replace Indonesian and English month names
  str = str.replace(/\b(juni|june|jun)\b/g, " 6 ");

  // 3. Replace separators with spaces
  str = str.replace(/[./\\,\-_]/g, " ");

  // 4. Collapse multiple spaces
  str = str.replace(/\s+/g, " ").trim();

  // Check 1: Tokenized format with spaces (e.g., "9 6 2023", "09 06 2023", "9 6 23")
  const parts = str.split(" ");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    if (year === 23) year = 2023;

    if (day === 9 && month === 6 && year === 2023) {
      return true;
    }
  }

  // Check 2: Pure digits format without separators
  const digitsOnly = str.replace(/\D/g, "");

  // Recognized variations for 9 June 2023:
  // 8 digits: 09062023
  if (digitsOnly === "09062023") return true;

  // 7 digits: 9062023 (9-06-2023) or 0962023 (09-6-2023)
  if (digitsOnly === "9062023" || digitsOnly === "0962023") return true;

  // 6 digits: 962023 (9-6-2023) or 090623 (09-06-23)
  if (digitsOnly === "962023" || digitsOnly === "090623") return true;

  // 5 digits: 90623 or 09623 (short year 23)
  if (digitsOnly === "90623" || digitsOnly === "09623") return true;

  // 4 digits: 9623 (9-6-23)
  if (digitsOnly === "9623") return true;

  return false;
}
