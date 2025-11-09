"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔹 Garante redirecionamento se o usuário não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-20">Verificando autenticação...</p>;
  }

  if (!session) {
    return null; // Evita piscar o conteúdo enquanto redireciona
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo, {session.user?.name}</h1>
      <p>Bem Vindo a Dashboard 👑</p>
    </main>
  );
}

