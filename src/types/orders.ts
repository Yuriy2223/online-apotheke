export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  _id: string;
  photo?: string;
  name: string;
  address: string;
  products: string;
  price: number;
  status: OrderStatus;
  order_date: string;
}
