// export interface Customer {
//   _id: string;
//   image: string;
//   name: string;
//   email: string;
//   spent: string;
//   phone: string;
//   address: string;
//   register_date: string;
// }
// export interface IncomeExpense {
//   _id: string;
//   name: string;
//   amount: string;
//   type: string;
// }

// export interface Order {
//   _id: string;
//   photo: string;
//   name: string;
//   address: string;
//   products: string;
//   price: string;
//   status: string;
//   order_date: string;
// }

// export interface Supplier {
//   _id: string;
//   name: string;
//   address: string;
//   suppliers: string;
//   date: string;
//   amount: string;
//   status: string;
// }
/************************************************************* */
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
  phone: string;
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
