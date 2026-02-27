import axios from "axios";
import type { LoginCredentials, LoginResponse } from "@/types/auth";
import { getDevice } from "@/utils/getDevice";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function signInWithEmail(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const { data } = await authApi.post<LoginResponse>("/signin/email", {
    credentials: {
      username: credentials.username,
      password: credentials.password,
    },
    device: getDevice(),
  });
  return data;
}
