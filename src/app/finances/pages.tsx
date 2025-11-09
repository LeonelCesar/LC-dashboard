import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function FinancesPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Verificando autenticação...</p>;
  if (status === "unauthenticated") return null;

  return (
    <main>
      <h1>Wl come Finanças Pagina</h1>
    </main>
  );
}

export default FinancesPage;
