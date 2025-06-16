export interface Cart {
  _id: string;
  name: string;
  photo: string;
  price: string;
  category: string;
  suppliers: string;
  stock: string;
  quantity: number;
  totalPrice: string;
}

export interface CartResponse {
  cartItems: Cart[];
  totalAmount: string;
  totalItems: number;
}

export interface UpdateCartRequest {
  productId: string;
  quantity?: number;
  action: "add" | "update" | "remove";
}

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CheckoutRequest {
  shippingInfo: ShippingInfo;
  paymentMethod: "Cash On Delivery" | "Bank";
}

export interface CheckoutResponse {
  orderId: string;
  totalAmount: string;
  orderStatus: string;
  estimatedDelivery: string;
}

export interface OrderProduct {
  productId: string;
  name: string;
  price: string;
  quantity: number;
  total: string;
}

export interface OrderData {
  _id: string;
  userId: string;
  products: OrderProduct[];
  shippingInfo: ShippingInfo;
  paymentMethod: "Cash On Delivery" | "Bank";
  totalAmount: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  orderDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
