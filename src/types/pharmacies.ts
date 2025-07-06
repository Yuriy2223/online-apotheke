export interface Pharmacie {
  _id: string;
  name: string;
  city: string;
  phone: string;
  address: string;
  rating: number;
  url?: string;
  openTime: string;
  closeTime: string;
}

// export interface Pharmacie {
//   _id: string;
//   name: string;
//   city: string;
//   phone: string;
//   address: string;
//   rating: string;
//   status: "OPEN" | "CLOSE";
// }
export interface PharmacieNearest {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  url?: string;
}
