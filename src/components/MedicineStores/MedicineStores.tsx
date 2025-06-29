// "use client";

// import { useRouter } from "next/navigation";
// import { StoreCard } from "../StoreCard/StoreCard";
// import { Pharmacie } from "@/types/pharmacies";
// export const MedicineStores = () => {
//   const router = useRouter();

//   const handleStoreClick = (pharmacieId: number) => {
//     router.push(`/shop/${pharmacieId}`);
//   };

//   const pharmacie: Pharmacie[] = [
//     {
//       name: "Подорожник",
//       address: "Shevchenka St, 100",
//       city: "Lviv",
//       phone: "0322-45-67-89",
//       rating: 4,
//       openTime: "08:00",
//       closeTime: "22:00",
//       url: "https://podorozhnyk.ua/",
//     },
//     {
//       name: "Аптека 9-1-1",
//       address: "Hoholia St, 24",
//       city: "Kharkiv",
//       phone: "0572-58-22-12",
//       rating: 3,
//       openTime: "09:00",
//       closeTime: "21:00",
//       url: "https://apteka911.ua/",
//     },
//     {
//       name: "Аптека24",
//       address: "Peace Ave, 5",
//       city: "Dnipro",
//       phone: "056-744-55-66",
//       rating: 5,
//       openTime: "07:00",
//       closeTime: "23:00",
//       url: "https://www.apteka24.ua/",
//     },
//     {
//       name: "Здравиця",
//       address: "Soborna St, 14",
//       city: "Rivne",
//       phone: "0362-62-33-44",
//       rating: 3,
//       openTime: "08:30",
//       closeTime: "20:30",
//       url: "https://zdravica.ua/",
//     },
//     {
//       name: "Liki24",
//       address: "Lesi Ukrainki St, 78",
//       city: "Zaporizhzhia",
//       phone: "0612-34-56-78",
//       rating: 4,
//       openTime: "08:00",
//       closeTime: "22:30",
//       url: "https://liki24.com/",
//     },
//     {
//       name: "Tabletki.ua",
//       address: "Freedom Ave, 120",
//       city: "Ternopil",
//       phone: "0352-52-43-21",
//       rating: 3,
//       openTime: "09:30",
//       closeTime: "21:30",
//       url: "https://tabletki.ua/",
//     },
//     {
//       name: "Мед-Сервіс",
//       address: "Kyivska St, 48",
//       city: "Cherkasy",
//       phone: "0472-35-67-89",
//       rating: 4,
//       openTime: "00:00",
//       closeTime: "23:59",
//       url: "https://online-apteka.com.ua/",
//     },
//     {
//       name: "Подорожник",
//       address: "Independence St, 67",
//       city: "Ivano-Frankivsk",
//       phone: "0342-50-60-70",
//       rating: 5,
//       openTime: "07:30",
//       closeTime: "22:00",
//       url: "https://podorozhnyk.ua/",
//     },
//     {
//       name: "Аптека 9-1-1",
//       address: "Petlyury St, 29",
//       city: "Vinnytsia",
//       phone: "0432-65-88-99",
//       rating: 4,
//       openTime: "08:00",
//       closeTime: "21:00",
//       url: "https://apteka911.ua/",
//     },
//     {
//       name: "Здравиця",
//       address: "Dovzhenka St, 3",
//       city: "Lutsk",
//       phone: "0332-78-90-10",
//       rating: 3,
//       openTime: "09:00",
//       closeTime: "20:00",
//       url: "https://zdravica.ua/",
//     },
//     {
//       name: "Liki24",
//       address: "Kosmonavtiv St, 12",
//       city: "Mykolaiv",
//       phone: "0512-47-58-69",
//       rating: 2,
//       openTime: "10:00",
//       closeTime: "19:00",
//       url: "https://liki24.com/",
//     },
//     {
//       name: "Аптека24",
//       address: "Gagarin Ave, 17",
//       city: "Kherson",
//       phone: "0552-49-50-60",
//       rating: 4,
//       openTime: "08:00",
//       closeTime: "22:00",
//       url: "https://www.apteka24.ua/",
//     },
//     {
//       name: "Подорожник",
//       address: "Starokyivska St, 5",
//       city: "Chernihiv",
//       phone: "0462-67-89-90",
//       rating: 5,
//       openTime: "07:00",
//       closeTime: "23:00",
//       url: "https://podorozhnyk.ua/",
//     },
//     {
//       name: "Аптека 9-1-1",
//       address: "Halytska St, 23",
//       city: "Chernivtsi",
//       phone: "0372-55-66-77",
//       rating: 4,
//       openTime: "08:30",
//       closeTime: "21:30",
//       url: "https://apteka911.ua/",
//     },
//     {
//       name: "Здравиця",
//       address: "Stepana Bandery St, 56",
//       city: "Uzhhorod",
//       phone: "0312-61-62-63",
//       rating: 3,
//       openTime: "09:00",
//       closeTime: "20:30",
//       url: "https://zdravica.ua/",
//     },
//     {
//       name: "Tabletki.ua",
//       address: "Chervonoi Kalyny Ave, 76",
//       city: "Lviv",
//       phone: "032-245-76-88",
//       rating: 2,
//       openTime: "10:00",
//       closeTime: "18:00",
//       url: "https://tabletki.ua/",
//     },
//     {
//       name: "Аптека24",
//       address: "Ostrozkoho St, 37",
//       city: "Poltava",
//       phone: "0532-60-71-82",
//       rating: 5,
//       openTime: "07:30",
//       closeTime: "23:30",
//       url: "https://www.apteka24.ua/",
//     },
//     {
//       name: "Liki24",
//       address: "Krymskoho St, 18",
//       city: "Simferopol",
//       phone: "0652-51-62-73",
//       rating: 4,
//       openTime: "08:00",
//       closeTime: "21:00",
//       url: "https://liki24.com/",
//     },
//     {
//       name: "Подорожник",
//       address: "Hrushevskoho St, 4",
//       city: "Kyiv",
//       phone: "044-501-36-86",
//       rating: 3,
//       openTime: "09:00",
//       closeTime: "22:00",
//       url: "https://podorozhnyk.ua/",
//     },
//     {
//       name: "Аптека 9-1-1",
//       address: "Studentska St, 12",
//       city: "Sumy",
//       phone: "0542-67-88-99",
//       rating: 5,
//       openTime: "08:00",
//       closeTime: "22:30",
//       url: "https://apteka911.ua/",
//     },
//   ];
//   return (
//     <section className="py-8 px-4 bg-gray-50">
//       <div className="container mx-auto max-w-[375px] min-[768px]:max-w-[768px] min-[1440px]:max-w-[1200px]">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Your Nearest Medicine Store
//           </h2>
//           <p className="text-gray-600">
//             Search for Medicine, Filter by your location
//           </p>
//         </div>

//         <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[1440px]:grid-cols-3 gap-4">
//           {pharmacie.map((store) => (
//             <StoreCard
//               key={store._id}
//               store={store}
//               onClick={handleStoreClick}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
