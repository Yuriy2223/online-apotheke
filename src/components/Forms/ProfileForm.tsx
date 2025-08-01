"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit3, Save, X as XIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProfileFormData } from "@/types/users";
import { updateProfile } from "@/redux/auth/operations";
import { selectProfileLoading } from "@/redux/auth/selectors";
import { userProfileSchema } from "@/validation/users";

interface ProfileFormProps {
  user: {
    name?: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    avatar?: string | null;
  };
  isEditing: boolean;
  onEditToggle: (editing: boolean) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  isEditing,
  onEditToggle,
}) => {
  const dispatch = useAppDispatch();
  const profileLoading = useAppSelector(selectProfileLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(userProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name || "",
      phone: user.phone || null,
      address: user.address || null,
      avatar: user.avatar || null,
      // name: user.name || "",
      // phone: user.phone || "",
      // address: user.address || "",
      // avatar: user.avatar || "",
    },
  });

  useEffect(() => {
    reset({
      name: user.name || "",
      phone: user.phone || null,
      address: user.address || null,
      avatar: user.avatar || null,
      // name: user.name || "",
      // phone: user.phone || "",
      // address: user.address || "",
      // avatar: user.avatar || "",
    });
  }, [user, reset]);

  const handleCancel = () => {
    reset({
      name: user.name || "",
      phone: user.phone || null,
      address: user.address || null,
      avatar: user.avatar || null,
      // name: user.name || "",
      // phone: user.phone || "",
      // address: user.address || "",
      // avatar: user.avatar || "",
    });
    onEditToggle(false);
  };

  // const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
  //   dispatch(updateProfile(data)).then((result) => {
  //     if (updateProfile.fulfilled.match(result)) {
  //       toast.success("Профіль успішно оновлено!");
  //       onEditToggle(false);
  //     }
  //   });
  // };
  //   const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
  //     const transformedData: ProfileFormData = {
  //       name: data.name,
  //       phone: data.phone === "" ? null : data.phone,
  //       address: data.address === "" ? null : data.address,
  //       avatar: data.avatar === "" ? null : data.avatar,
  //     };

  //     dispatch(updateProfile(transformedData)).then((result) => {
  //       if (updateProfile.fulfilled.match(result)) {
  //         toast.success("Профіль успішно оновлено!");
  //         onEditToggle(false);
  //       }
  //     });
  //   };

  //   return (
  //     <div className="p-6">
  //       <div className="flex justify-between items-center mb-6">
  //         <h2 className="text-2xl font-semibold text-black-true">
  //           Інформація профілю
  //         </h2>
  //         {!isEditing && (
  //           <button
  //             onClick={() => onEditToggle(true)}
  //             className="bg-green-light text-white-true px-6 py-2 rounded-lg hover:bg-green-dark transition-colors duration-200 flex items-center space-x-2"
  //           >
  //             <Edit3 className="w-4 h-4" />
  //             <span>Редагувати</span>
  //           </button>
  //         )}
  //       </div>

  //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  //         <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
  //           <div>
  //             <label className="block text-sm font-medium text-black-true mb-2">
  //               Name
  //             </label>
  //             <input
  //               type="text"
  //               {...register("name")}
  //               disabled={!isEditing}
  //               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light transition-colors duration-200 ${
  //                 !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white-true"
  //               } ${errors.name ? "border-red-dark" : "border-gray-300"}`}
  //             />
  //             {errors.name && (
  //               <p className="mt-1 text-sm text-red-dark">
  //                 {errors.name.message}
  //               </p>
  //             )}
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Email
  //             </label>
  //             <input
  //               type="email"
  //               value={user.email}
  //               disabled
  //               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Phone
  //             </label>
  //             <input
  //               type="tel"
  //               {...register("phone")}
  //               disabled={!isEditing}
  //               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light transition-colors duration-200 ${
  //                 !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
  //               } ${errors.phone ? "border-red-dark" : "border-gray-300"}`}
  //               placeholder="+380123456789"
  //             />
  //             {errors.phone && (
  //               <p className="mt-1 text-sm text-red-600">
  //                 {errors.phone.message}
  //               </p>
  //             )}
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-black-true mb-2">
  //               Address
  //             </label>
  //             <textarea
  //               {...register("address")}
  //               disabled={!isEditing}
  //               rows={3}
  //               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light transition-colors duration-200 resize-none ${
  //                 !isEditing
  //                   ? "bg-gray-light cursor-not-allowed"
  //                   : "bg-white-true"
  //               } ${errors.address ? "border-red-dark" : "border-gray-300"}`}
  //               placeholder="Введіть вашу адресу"
  //             />
  //             {errors.address && (
  //               <p className="mt-1 text-sm text-red-dark">
  //                 {errors.address.message}
  //               </p>
  //             )}
  //           </div>
  //         </div>

  //         {isEditing && (
  //           <div className="flex justify-end space-x-3 pt-4 border-t">
  //             <button
  //               type="button"
  //               onClick={handleCancel}
  //               disabled={profileLoading}
  //               className="px-6 py-2 border bg-green-soft border-green-light rounded-lg text-green-dark hover:text-white-true hover:bg-green-light disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
  //             >
  //               <XIcon className="w-5 h-5" />
  //               <span>Скасувати</span>
  //             </button>
  //             <button
  //               type="submit"
  //               disabled={profileLoading || !isDirty}
  //               className="px-6 py-2 bg-green-light text-white rounded-lg hover:bg-green-dark disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
  //             >
  //               {profileLoading ? (
  //                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white-true"></div>
  //               ) : (
  //                 <Save className="w-4 h-4" />
  //               )}
  //               <span>{profileLoading ? "Збереження..." : "Зберегти"}</span>
  //             </button>
  //           </div>
  //         )}
  //       </form>
  //     </div>
  //   );
  // };

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    const transformedData: ProfileFormData = {
      name: data.name,
      phone: data.phone === "" ? null : data.phone,
      address: data.address === "" ? null : data.address,
      avatar: data.avatar === "" ? null : data.avatar,
    };

    dispatch(updateProfile(transformedData)).then((result) => {
      if (updateProfile.fulfilled.match(result)) {
        toast.success("Профіль успішно оновлено!");
        onEditToggle(false);
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-black-true">
          Інформація профілю
        </h2>
        {!isEditing && (
          <button
            onClick={() => onEditToggle(true)}
            className="bg-green-light text-white-true px-6 py-2 rounded-lg hover:bg-green-dark transition-colors duration-200 flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Редагувати</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-black-true mb-2">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-200 ${
                !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white-true"
              } ${
                errors.name
                  ? "border-red-dark focus:border-red-dark focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-green-light focus:ring-2 focus:ring-green-light/20"
              }`}
            />
            <div className="h-4 flex items-start">
              {errors.name && (
                <p className="text-sm text-red-dark">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone")}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-200 ${
                !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white-true"
              } ${
                errors.phone
                  ? "border-red-dark focus:border-red-dark focus:ring-2 focus:ring-red-light"
                  : "border-gray-300 focus:border-green-light focus:ring-2 focus:ring-green-light/20"
              }`}
              placeholder="+380123456789"
            />
            <div className="h-4 flex items-start">
              {errors.phone && (
                <p className="mt-1 text-sm text-red-dark">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black-true mb-2">
              Address
            </label>
            <textarea
              {...register("address")}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg outline-none resize-none transition-all duration-200 ${
                !isEditing
                  ? "bg-gray-light cursor-not-allowed"
                  : "bg-white-true"
              } ${
                errors.address
                  ? "border-red-dark focus:border-red-dark focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-green-light focus:ring-2 focus:ring-green-light/20"
              }`}
              placeholder="Введіть вашу адресу"
            />
            <div className="h-4 flex items-start">
              {errors.address && (
                <p className="mt-1 text-sm text-red-dark">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleCancel}
              disabled={profileLoading}
              className="px-6 py-2 border bg-green-soft border-green-light rounded-lg text-green-dark hover:text-white-true hover:bg-green-light disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
            >
              <XIcon className="w-5 h-5" />
              <span>Скасувати</span>
            </button>
            <button
              type="submit"
              disabled={profileLoading || !isDirty}
              className="px-6 py-2 bg-green-light text-white-true rounded-lg hover:bg-green-dark disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
            >
              {profileLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white-true"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{profileLoading ? "Збереження..." : "Зберегти"}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
