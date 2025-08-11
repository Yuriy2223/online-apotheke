export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
  password: string;
  isEmailVerified: boolean;
  provider: "local" | "google";
  googleId?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  googleId: string | null;
  provider: "local" | "google";
}
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}
export interface VerifyEmailData {
  token: string;
}
export interface ForgotPasswordData {
  email: string;
}
export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
}
export interface GoogleAuthResponse {
  message: string;
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}
export interface JWTPayload {
  userId: string;
  email: string;
  provider: "local" | "google";
  iat?: number;
  exp?: number;
}
export type ProfileFormData = {
  name: string;
  phone?: string | null;
  address?: string | null;
  avatar?: string | null;
};
