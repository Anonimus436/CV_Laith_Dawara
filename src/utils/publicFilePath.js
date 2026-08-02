export function resolvePublicFilePath(filePath = "") {
  if (!filePath) return filePath;
  if (/^https?:\/\//i.test(filePath)) return filePath;

  const base = import.meta.env.BASE_URL || "./";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = filePath.replace(/^\/+/, "");

  return `${cleanBase}${cleanPath}`;
}
