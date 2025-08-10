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
export const statusClasses: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700",
  Shipped: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
  Default: "bg-gray-100 text-gray-700",
};
export const orders: Order[] = [
  {
    _id: "1",
    photo: "/images/customers/alex-shatov.jpg",
    name: "Alex Shatov",
    address: "Kyiv, Ukraine",
    products: "Laptop, Mouse",
    price: "2890.66",
    status: "Completed",
    order_date: "2025-08-01",
  },
  {
    _id: "2",
    photo: "/images/customers/philip-harbach.jpg",
    name: "Philip Harbach",
    address: "Berlin, Germany",
    products: "Smartphone, Case",
    price: "2767.04",
    status: "Pending",
    order_date: "2025-08-02",
  },
  {
    _id: "3",
    photo: "/images/customers/mirko-fisuk.jpg",
    name: "Mirko Fisuk",
    address: "Warsaw, Poland",
    products: "Tablet, Keyboard",
    price: "2996.00",
    status: "Shipped",
    order_date: "2025-08-03",
  },
  {
    _id: "4",
    photo: "/images/customers/olga-semklo.jpg",
    name: "Olga Semklo",
    address: "Lviv, Ukraine",
    products: "Headphones, Microphone",
    price: "1220.66",
    status: "Completed",
    order_date: "2025-08-04",
  },
  {
    _id: "5",
    photo: "/images/customers/burak-long.jpg",
    name: "Burak Long",
    address: "Istanbul, Turkey",
    products: "Camera, Tripod",
    price: "1890.66",
    status: "Cancelled",
    order_date: "2025-08-05",
  },
  {
    _id: "6",
    photo: "/images/customers/burakus-longna.jpg",
    name: "Burakus Longna",
    address: "Izmir, Turkey",
    products: "Monitor, HDMI Cable",
    price: "4890.66",
    status: "Completed",
    order_date: "2025-08-06",
  },
];
