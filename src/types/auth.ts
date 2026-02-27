export interface Device {
  id: string;
  name: string;
  model: string;
  system: string;
  version: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  profileType: string;
  refreshToken?: string;
}

export interface AuthState {
  accessToken: string | null;
  profileType: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SignInEmailPayload {
  email: string;
  password: string;
}
