import { getBrowserName, getBrowserVersion, getOSName } from "./browser";
import type { Device } from "@/types/auth";

const DEVICE_ID_KEY = "sos_device_id";

function getDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export function getDevice(): Device {
  const ua = navigator.userAgent;

  const name = getBrowserName(ua);
  const version = getBrowserVersion(ua);
  const system = getOSName(ua);

  return {
    id: getDeviceId(),
    name,
    model: "Web",
    system,
    version,
  };
}
