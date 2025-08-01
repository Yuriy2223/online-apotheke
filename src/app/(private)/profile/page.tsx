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
