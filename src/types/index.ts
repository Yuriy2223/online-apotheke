export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
}
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
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
