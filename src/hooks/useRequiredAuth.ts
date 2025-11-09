"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Hook que retorna uma função para redirecionar para login se não estiver autenticado
export function useRequireAuth() {
  const router = useRouter();
  const { status } = useSession();

  const redirectToLogin = () => {
    if (status !== "authenticated") {
      router.push("/login"); // Sempre manda para login
    }
  };

  return redirectToLogin;
}
