import type { Dispatch, SetStateAction } from "react";

export type AnyForm = Record<string, any>;

/**
 * Updates a single field in a form state object using a React setter.
 *
 * @param key - the field name to update
 * @param value - the new value for the field
 * @param setter - the React useState setter for the form
 */
export function updateFormField<T extends AnyForm, K extends keyof T>(
  key: K,
  value: T[K],
  setter: Dispatch<SetStateAction<T>>,
) {
  setter((prev) => ({
    ...prev,
    [key]: typeof value === "string" ? (value.toLowerCase() as T[K]) : value,
  }));
}

export function getEnumKeyByValue<T extends Record<string, string | number>>(
  enumObj: T,
  value: number | string,
) {
  return Object.keys(enumObj)
    .filter((k) => isNaN(Number(k)))
    .find((key) => enumObj[key as keyof T] === value);
}

export function isValidISODateTime(value: string): boolean {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  if (!isoRegex.test(value)) return false;

  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function getNewDate() {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    12,
    0,
    0,
    0,
  );
}

export function getValueByPath<T = any>(
  obj: T,
  path: string,
  type?: string,
): any {
  const value = path.split(".").reduce((current: any, key: string) => {
    return current?.[key];
  }, obj);

  if (Array.isArray(value)) {
    return value.map((v) => `${v}`).join(" | ");
  }

  if (isValidISODateTime(value) && type) {
    if (type == "date") return formatDate(value);
    if (type == "time") return formatTime(value);
  }

  return value;
}

export function formatDate(dateString: string, locale = "en-US") {
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(dateString: string, locale = "en-US") {
  return new Date(dateString).toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // set to false if you want 24-hour format
  });
}

export function enumToArray<T extends Record<string, string | number>>(
  enumObj: T,
) {
  return Object.keys(enumObj).map((key) => ({
    key,
    value: enumObj[key as keyof T],
  }));
}

export function upsertItem(items: any[], form: any, key: string) {
  if (!items) return [];

  const index = items?.findIndex((item) => item[key] === form[key]);

  if (index !== -1) {
    const updated = [...items];
    updated[index] = { ...updated[index], ...form };
    return updated;
  }

  return [...items, form];
}

export function isQueueDuplicate(queue: any[], service: string) {
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].service === service) return true;
  }
  return false;
}
