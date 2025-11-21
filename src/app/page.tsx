"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Lógica para redirecionar corretamente
  const handlerStart = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-8 md:p-16">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bem-vindo a{" "}
          <span className="text-accent text-blue-800">LC Dashboard</span>
        </h1>
        <p className="text-muted text-lg md:text-xl">
          Gerencie seus projetos, tarefas e progresso com design moderno e
          performance máxima.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        <Card
          icon={<Users />}
          title="Clientes Ativos"
          value="48"
          trend="+12%"
        />
        <Card
          icon={<CheckCircle2 />}
          title="Projetos Concluídos"
          value="124"
          trend="+8%"
        />
        <Card icon={<Clock />} title="Em Progresso" value="14" trend="+3%" />
        <Card
          icon={<BarChart3 />}
          title="Receita Mensal"
          value="€14.400"
          trend="+15%"
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Domine seus projetos com eficiência e estilo.
        </h2>
        <p className="text-muted mb-6 text-lg">
          Explore relatórios, organize suas tarefas e veja seus resultados
          crescerem em tempo real.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlerStart}
          className="bg-accent hover:bg-accent-hover border text-white font-medium px-6 py-3 rounded-xl shadow-soft flex items-center mx-auto gap-2 transition-all duration-300"
        >
          Começar Agora
          <ArrowUpRight size={20} />
        </motion.button>
      </motion.section>
    </main>
  );
}

function Card({
  icon,
  title,
  value,
  trend,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-card border border-card-border rounded-2xl p-6 shadow-soft flex flex-col items-start justify-between"
    >
      <div className="flex items-center gap-3 mb-4 text-accent">
        <div className="p-2 bg-accent/10 rounded-xl">{icon}</div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="flex justify-between items-end w-full">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-sm text-green-500 font-medium">{trend}</span>
      </div>
    </motion.div>
  );
}

export default HomePage;
