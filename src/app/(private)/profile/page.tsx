"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import {
  selectUser,
  selectIsAuthenticated,
  selectIsAuthChecking,
} from "@/redux/auth/selectors";
import { updateUser } from "@/redux/auth/slice";
import { toast } from "react-toastify";
import { Camera, X, Edit3, Save, X as XIcon } from "lucide-react";
import { User } from "@/types/users";
import { uploadImage } from "@/utils/cloudinary-client";

export type ProfileFormData = {
  name: string;
  phone?: string | null;
  address?: string | null;
  avatar?: string | null;
};

export const profileSchema: yup.ObjectSchema<ProfileFormData> = yup.object({
  name: yup.string().required("Імʼя обовʼязкове").min(2).max(50).trim(),
  phone: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\+?[1-9]\d{7,14}$/, {
      message: "Невалідний номер телефону",
      excludeEmptyString: true,
    }),
  address: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value)),
  avatar: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value)),
});

interface UpdateProfileResponse {
  success: boolean;
  data?: {
    user: User;
  };
  error?: string;
}

interface UpdateAvatarResponse {
  success: boolean;
  data?: {
    avatarUrl: string;
  };
  error?: string;
}

const AvatarSection: React.FC<{
  avatarUrl?: string | null;
  userName?: string;
  onFileSelect: (file: File) => void;
  onRemoveAvatar: () => void;
  uploadLoading: boolean;
}> = ({ avatarUrl, userName, onFileSelect, onRemoveAvatar, uploadLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Будь ласка, виберіть зображення");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Розмір файлу не повинен перевищувати 5MB");
      return;
    }

    onFileSelect(file);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const showFallback = !avatarUrl || imageError;

  return (
    <div className="relative">
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden ring-4 ring-white/20">
        {!showFallback ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {userName?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        )}
      </div>

      <div className="absolute -bottom-2 -right-2 flex space-x-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadLoading}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 shadow-lg transition-all duration-200 hover:scale-105"
        >
          {uploadLoading ? (
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <Camera className="w-4 h-4" />
          )}
        </button>
        {avatarUrl && (
          <button
            type="button"
            onClick={onRemoveAvatar}
            disabled={uploadLoading}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 disabled:opacity-50 shadow-lg transition-all duration-200 hover:scale-105"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAuthChecking = useAppSelector(selectIsAuthChecking);

  const [isEditing, setIsEditing] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: null,
      address: null,
      avatar: null,
    },
  });

  const watchedAvatar = watch("avatar");

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      if (!user) return;

      setUploadLoading(true);
      try {
        const cloudinaryUrl = await uploadImage(file);

        if (!cloudinaryUrl) {
          toast.error("Помилка при завантаженні зображення");
          return;
        }

        const response = await fetch("/api/user/update-avatar", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ avatarUrl: cloudinaryUrl }),
        });

        const result: UpdateAvatarResponse = await response.json();

        if (!response.ok || !result.success) {
          toast.error(result.error || "Помилка при оновленні аватара");
          return;
        }

        const avatarUrl = result.data?.avatarUrl;
        if (!avatarUrl) {
          toast.error("Отримано невалідну відповідь від сервера");
          return;
        }

        setValue("avatar", avatarUrl, { shouldDirty: true });
        dispatch(updateUser({ ...user, avatar: avatarUrl }));

        toast.success("Аватар успішно оновлено!");
      } catch (error) {
        console.error("Avatar upload error:", error);
        toast.error("Помилка з'єднання з сервером");
      } finally {
        setUploadLoading(false);
      }
    },
    [user, setValue, dispatch]
  );

  const handleRemoveAvatar = useCallback(async () => {
    if (!user?.avatar) return;

    setUploadLoading(true);
    try {
      const response = await fetch("/api/user/update-avatar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ avatarUrl: "" }),
      });

      const result: UpdateAvatarResponse = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.error || "Помилка при видаленні аватара");
        return;
      }

      setValue("avatar", "", { shouldDirty: true });
      dispatch(updateUser({ ...user, avatar: "" }));

      toast.success("Аватар успішно видалено!");
    } catch (error) {
      console.error("Avatar remove error:", error);
      toast.error("Помилка з'єднання з сервером");
    } finally {
      setUploadLoading(false);
    }
  }, [user, setValue, dispatch]);

  const handleCancel = useCallback(() => {
    if (user) {
      const userData: ProfileFormData = {
        name: user.name || "",
        phone: user.phone || null,
        address: user.address || null,
        avatar: user.avatar || null,
      };
      reset(userData);
    }
    setIsEditing(false);
  }, [user, reset]);

  useEffect(() => {
    if (!isAuthChecking && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthChecking, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      const userData: ProfileFormData = {
        name: user.name || "",
        phone: user.phone || null,
        address: user.address || null,
        avatar: user.avatar || null,
      };
      reset(userData);
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      const cleanData = {
        name: data.name.trim(),
        phone: data.phone?.trim() || null,
        address: data.address?.trim() || null,
        avatar: data.avatar?.trim() || null,
      };

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cleanData),
      });

      const result: UpdateProfileResponse = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.error || "Помилка при оновленні профілю");
        return;
      }

      const updatedUser = result.data?.user;
      if (!updatedUser) {
        toast.error("Отримано невалідну відповідь від сервера");
        return;
      }

      dispatch(updateUser(updatedUser));
      toast.success("Профіль успішно оновлено!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Помилка з'єднання з сервером");
    }
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <AvatarSection
                avatarUrl={watchedAvatar || user.avatar}
                userName={user.name}
                onFileSelect={handleAvatarUpload}
                onRemoveAvatar={handleRemoveAvatar}
                uploadLoading={uploadLoading}
              />
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-blue-100 text-lg">{user.email}</p>
                <div className="flex items-center space-x-2 mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.isEmailVerified
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {user.isEmailVerified ? "Підтверджено" : "Не підтверджено"}
                  </span>
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                    {user.provider === "google" ? "Google" : "Локальний"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Інформація профілю
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Редагувати</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                    } ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                      !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                    } ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    placeholder="+380123456789"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  {...register("address")}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : "bg-white"
                  } ${errors.address ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Введіть вашу адресу"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <XIcon className="w-4 h-4" />
                    <span>Скасувати</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isDirty}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{isSubmitting ? "Збереження..." : "Зберегти"}</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
