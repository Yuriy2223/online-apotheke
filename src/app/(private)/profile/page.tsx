// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { Camera, X, Edit3, Save, X as XIcon } from "lucide-react";
// import { toast } from "react-toastify";
// import { useAppSelector, useAppDispatch } from "@/redux/store";
// import { ProfileFormData } from "@/types/users";
// import { profileSchema } from "@/validation/products";
// import {
//   uploadAvatar,
//   removeAvatar,
//   updateProfile,
// } from "@/redux/auth/operations";
// import {
//   selectUser,
//   selectIsAuthenticated,
//   selectIsAuthChecking,
//   selectUploadLoading,
//   selectProfileLoading,
// } from "@/redux/auth/selectors";

// const ProfilePage = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const user = useAppSelector(selectUser);
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);
//   const isAuthChecking = useAppSelector(selectIsAuthChecking);
//   const uploadLoading = useAppSelector(selectUploadLoading);
//   const profileLoading = useAppSelector(selectProfileLoading);

//   const [isEditing, setIsEditing] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isDirty },
//     reset,
//     watch,
//   } = useForm<ProfileFormData>({
//     resolver: yupResolver(profileSchema),
//     defaultValues: {
//       name: "",
//       phone: null,
//       address: null,
//       avatar: null,
//     },
//   });

//   const watchedAvatar = watch("avatar");

//   useEffect(() => {
//     if (!isAuthChecking && !isAuthenticated) {
//       router.push("/login");
//     }
//   }, [isAuthChecking, isAuthenticated, router]);

//   useEffect(() => {
//     if (user) {
//       reset({
//         name: user.name || "",
//         phone: user.phone || null,
//         address: user.address || null,
//         avatar: user.avatar || null,
//       });
//     }
//   }, [user, reset]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       toast.error("Будь ласка, виберіть зображення");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Розмір файлу не повинен перевищувати 5MB");
//       return;
//     }

//     dispatch(uploadAvatar(file)).then((result) => {
//       if (uploadAvatar.fulfilled.match(result)) {
//         toast.success("Аватар успішно оновлено!");
//       }
//     });
//   };

//   const handleRemoveAvatar = () => {
//     if (user?.avatar) {
//       dispatch(removeAvatar()).then((result) => {
//         if (removeAvatar.fulfilled.match(result)) {
//           toast.success("Аватар успішно видалено!");
//         }
//       });
//     }
//   };

//   const handleCancel = () => {
//     if (user) {
//       reset({
//         name: user.name || "",
//         phone: user.phone || null,
//         address: user.address || null,
//         avatar: user.avatar || null,
//       });
//     }
//     setIsEditing(false);
//   };

//   const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
//     dispatch(updateProfile(data)).then((result) => {
//       if (updateProfile.fulfilled.match(result)) {
//         toast.success("Профіль успішно оновлено!");
//         setIsEditing(false);
//       }
//     });
//   };

//   if (isAuthChecking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated || !user) {
//     return null;
//   }

//   const avatarUrl = watchedAvatar || user.avatar;
//   const showFallback = !avatarUrl || imageError;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden ring-4 ring-white/20">
//                   {!showFallback ? (
//                     <img
//                       src={avatarUrl}
//                       alt="Avatar"
//                       className="w-full h-full object-cover"
//                       onError={() => setImageError(true)}
//                       onLoad={() => setImageError(false)}
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <span className="text-2xl font-bold text-gray-600">
//                         {user.name?.charAt(0).toUpperCase() || "U"}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="absolute -bottom-2 -right-2 flex space-x-1">
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     disabled={uploadLoading}
//                     className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 shadow-lg transition-all duration-200 hover:scale-105"
//                   >
//                     {uploadLoading ? (
//                       <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
//                     ) : (
//                       <Camera className="w-4 h-4" />
//                     )}
//                   </button>
//                   {avatarUrl && (
//                     <button
//                       type="button"
//                       onClick={handleRemoveAvatar}
//                       disabled={uploadLoading}
//                       className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 disabled:opacity-50 shadow-lg transition-all duration-200 hover:scale-105"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   accept="image/*"
//                   className="hidden"
//                 />
//               </div>

//               <div className="text-white">
//                 <h1 className="text-3xl font-bold">{user.name}</h1>
//                 <p className="text-blue-100 text-lg">{user.email}</p>
//                 <div className="flex items-center space-x-2 mt-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       user.isEmailVerified
//                         ? "bg-green-500 text-white"
//                         : "bg-yellow-500 text-white"
//                     }`}
//                   >
//                     {user.isEmailVerified ? "Підтверджено" : "Не підтверджено"}
//                   </span>
//                   <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
//                     {user.provider === "google" ? "Google" : "Локальний"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Інформація профілю
//               </h2>
//               {!isEditing && (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
//                 >
//                   <Edit3 className="w-4 h-4" />
//                   <span>Редагувати</span>
//                 </button>
//               )}
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     {...register("name")}
//                     disabled={!isEditing}
//                     className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
//                       !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
//                     } ${errors.name ? "border-red-500" : "border-gray-300"}`}
//                   />
//                   {errors.name && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     value={user.email}
//                     disabled
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     {...register("phone")}
//                     disabled={!isEditing}
//                     className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
//                       !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
//                     } ${errors.phone ? "border-red-500" : "border-gray-300"}`}
//                     placeholder="+380123456789"
//                   />
//                   {errors.phone && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.phone.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Address
//                 </label>
//                 <textarea
//                   {...register("address")}
//                   disabled={!isEditing}
//                   rows={3}
//                   className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none ${
//                     !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
//                   } ${errors.address ? "border-red-500" : "border-gray-300"}`}
//                   placeholder="Введіть вашу адресу"
//                 />
//                 {errors.address && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.address.message}
//                   </p>
//                 )}
//               </div>

//               {isEditing && (
//                 <div className="flex justify-end space-x-3 pt-4 border-t">
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     disabled={profileLoading}
//                     className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
//                   >
//                     <XIcon className="w-4 h-4" />
//                     <span>Скасувати</span>
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={profileLoading || !isDirty}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
//                   >
//                     {profileLoading ? (
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     ) : (
//                       <Save className="w-4 h-4" />
//                     )}
//                     <span>{profileLoading ? "Збереження..." : "Зберегти"}</span>
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

/********************************* */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { AvatarUpload } from "@/components/AvatarUpload/AvatarUpload";
import { ProfileForm } from "@/components/Forms/ProfileForm";
import { Container } from "@/shared/Container";
import {
  selectUser,
  selectIsAuthenticated,
  selectIsAuthChecking,
} from "@/redux/auth/selectors";

const ProfilePage = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthChecking = useAppSelector(selectIsAuthChecking);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthChecking && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthChecking, isAuthenticated, router]);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-light"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Container>
      <div className="flex items-center justify-center py-10">
        <AvatarUpload user={user} />
      </div>

      <ProfileForm
        user={user}
        isEditing={isEditing}
        onEditToggle={setIsEditing}
      />
    </Container>
  );
};

export default ProfilePage;
