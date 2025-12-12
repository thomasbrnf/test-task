const INVALID_SERVICE_VALUES = [
  "none",
  "n/a",
  "not available",
  "false",
  "0",
] as const;

export const isServiceAvailable = (value: unknown): value is string => {
  if (!value) return false;
  if (typeof value !== "string") return false;

  const normalized = value.toLowerCase().trim();
  return !INVALID_SERVICE_VALUES.includes(normalized as any);
};
