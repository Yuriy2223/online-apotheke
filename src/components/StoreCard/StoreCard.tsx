// "use client";

// import { Pharmacies } from "@/types/users";
// import { MapPin, Phone } from "lucide-react";

// interface StoreCardProps {
//   store: Pharmacie;
//   onClick: (id: number) => void;
// }

// export const StoreCard = ({ store, onClick }: StoreCardProps) => {
//   return (
//     <div
//       onClick={() => onClick(store.id)}
//       className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
//     >

//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
//         <div className="flex items-center gap-1">

//           {[...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className={`w-4 h-4 rounded-full ${
//                 i < store.rating ? "bg-yellow-400" : "bg-gray-200"
//               }`}
//             />
//           ))}
//           <span className="ml-2 text-sm font-medium">{store.rating}</span>
//         </div>
//       </div>

//       <div className="flex items-start gap-2 mb-3">
//         <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
//         <span className="text-gray-600 text-sm">{store.address}</span>
//       </div>

//       <div className="flex items-center gap-2 mb-4">
//         <Phone className="w-4 h-4 text-green-600" />
//         <span className="text-gray-600 text-sm">{store.phone}</span>
//       </div>

//       <div className="flex justify-end">
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-medium ${
//             store.status === "OPEN"
//               ? "bg-green-100 text-green-600"
//               : "bg-red-100 text-red-600"
//           }`}
//         >
//           {store.status}
//         </span>
//       </div>
//     </div>
//   );
// };
