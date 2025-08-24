"use client";

import React, { useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { uploadAvatar, removeAvatar } from "@/redux/auth/operations";
import { selectUploadLoading } from "@/redux/auth/selectors";

interface AvatarUploadProps {
  user: {
    name?: string;
    avatar?: string | null;
  };
  currentAvatar?: string | null;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  user,
  currentAvatar,
}) => {
  const dispatch = useAppDispatch();
  const uploadLoading = useAppSelector(selectUploadLoading);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarUrl = currentAvatar || user.avatar;
  const showFallback = !avatarUrl || imageError;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must not exceed 5MB");
      return;
    }

    dispatch(uploadAvatar(file)).then((result) => {
      if (uploadAvatar.fulfilled.match(result)) {
        toast.success("Avatar successfully updated!");
      }
    });
  };

  const handleRemoveAvatar = () => {
    if (user?.avatar) {
      dispatch(removeAvatar()).then((result) => {
        if (removeAvatar.fulfilled.match(result)) {
          toast.success("Avatar successfully deleted!");
        }
      });
    }
  };

  return (
    <div className="relative">
      <div
        className="w-24 h-24 rounded-full bg-white-true flex items-center 
      justify-center overflow-hidden ring-4 ring-white-true/20"
      >
        {!showFallback ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-dark">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        )}
      </div>

      <div className="absolute -bottom-2 -right-2 flex space-x-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadLoading}
          className="bg-green-light text-white-true p-2 rounded-full hover:bg-green-dark 
          disabled:opacity-50 shadow-lg transition-all duration-200 hover:scale-105"
        >
          {uploadLoading ? (
            <div
              className="animate-spin w-4 h-4 border-2 border-white-true 
            border-t-transparent rounded-full"
            ></div>
          ) : (
            <Camera className="w-4 h-4" />
          )}
        </button>
        {avatarUrl && (
          <button
            type="button"
            onClick={handleRemoveAvatar}
            disabled={uploadLoading}
            className="bg-red-light text-green-light hover:text-white-true p-2 
            rounded-full hover:bg-red-dark disabled:opacity-50 shadow-lg transition-all
             duration-200 hover:scale-105"
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
