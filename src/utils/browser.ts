export function getBrowserName(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\//i.test(ua) || /Opera\//i.test(ua)) return "Opera";
  if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) return "Chrome";
  if (/Chromium\//i.test(ua)) return "Chromium";
  if (/Firefox\//i.test(ua)) return "Firefox";
  if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
  return "Unknown";
}

export function getBrowserVersion(ua: string): string {
  const patterns = [
    /Edg\/([0-9.]+)/i,
    /OPR\/([0-9.]+)/i,
    /Chrome\/([0-9.]+)/i,
    /Firefox\/([0-9.]+)/i,
    /Version\/([0-9.]+).*Safari/i,
  ];
  for (const pattern of patterns) {
    const match = ua.match(pattern);
    if (match) return match[1];
  }
  return "0.0.0";
}

export function getOSName(ua: string): string {
  if (/Windows NT/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua) && !/iPhone|iPad/i.test(ua)) return "macOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Unknown";
}
