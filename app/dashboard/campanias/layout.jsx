"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CampaniasLayout({ children }) {
  const { user, hasRole, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || !hasRole("administrador, marketing")) {
        router.replace("/dashboard/main");
      }
    }
  }, [user, isLoading, hasRole, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user || !hasRole("administrador, marketing")) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-gray-500 dark:text-gray-400">
        Redirigiendo...
      </div>
    );
  }

  return <>{children}</>;
}
