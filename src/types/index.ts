export interface Customer {
  _id: string;
  image: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}
export interface IncomeExpense {
  _id: string;
  name: string;
  amount: string;
  type: string;
}
export interface NearestPharmacie {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: string;
}
export interface Order {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: string;
  price: string;
  status: string;
  order_date: string;
}
export interface Pharmacie {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: string;
}
export interface Product {
  _id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}
export interface Review {
  _id: string;
  name: string;
  testimonial: string;
}
export interface Supplier {
  _id: string;
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
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
  // createdAt: Date;
  // updatedAt: Date;
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
export interface RefreshTokenResponse {
  accessToken: string;
}
export interface GoogleAuthResponse {
  user: User;
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
