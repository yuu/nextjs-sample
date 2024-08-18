export const roles = ["general", "admin"] as const;

export type Role = (typeof roles)[number];
