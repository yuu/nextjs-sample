export const isRecordOfStringArrays = (
  obj: unknown
): obj is Record<string, Array<string>> => {
  if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
    const firstKey = Object.keys(obj)[0];
    const value = (obj as Record<string, Array<string>>)[firstKey];
    return Array.isArray(value) && typeof value[0] === "string";
  }
  return false;
};
