import { Types } from "mongoose";

export interface CartItem {
  _id: string;
  name: string;
  photo: string;
  price: number;
  originalPrice: number;
  customPrice?: number;
  category: string;
  suppliers: string[];
  stock: number;
  quantity: number;
  totalPrice: number;
}

export interface CartData {
  cartItems: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateCartItemParams {
  productId: string;
  quantity: number;
  action: "add" | "update" | "remove";
  customPrice?: number;
}

export interface CheckoutRequest {
  shippingInfo: ShippingInfo;
  paymentMethod: "Cash On Delivery" | "Bank";
}

export interface OrderResponse {
  orderId: string;
  totalAmount: number;
  orderStatus: string;
  estimatedDelivery: string;
  paymentMethod: string;
  trackingInfo: {
    trackingNumber: string;
    trackingUrl: string;
    estimatedSteps: Array<{
      status: string;
      name: string;
      completed: boolean;
    }>;
  };
}

export interface CartProductInDb {
  _id: Types.ObjectId;
  quantity: number;
  customPrice?: number;
}

export interface CartDocumentInDb {
  products: CartProductInDb[];
  userId: Types.ObjectId;
}

export interface ProductInDb {
  _id: Types.ObjectId;
  name: string;
  price: number;
  stock: number;
}
