import axios from "axios";
import type { PatientMe } from "@/types/patient-me";

const coreApi = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "text/plain",
  },
});

coreApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getPatientMe(): Promise<PatientMe> {
  const { data } = await coreApi.get<PatientMe>("/Patients/me");
  return data;
}
