"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowLeft } from "lucide-react";

function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🔹 Simulando o cadastro (você pode trocar depois por chamada API real)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Conta criada com sucesso!");
    router.push("/login");
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center from-blue-50 to-blue-100 bg-background text-foreground overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-muted shadow-soft border border-card-border rounded-2xl w-full max-w-md p-8 mx-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Crie sua conta no{" "}
          <span className="text-blue-600 dark:text-blue-400">LC Dashboard</span>
        </motion.h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-2">Nome</label>
            <div className="flex items-center gap-2 bg-muted-bg rounded-xl px-3 py-2">
              <UserPlus className="text-muted" size={24} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm px-3 py-2 rounded"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-sm mb-2">Email</label>
            <div className="flex items-center gap-2 bg-muted-bg rounded-xl">
              <Mail className="text-muted" size={24} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm px-3 py-2 rounded"
                placeholder="exemplo@email.com"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-sm mb-2">Senha</label>
            <div className="flex items-center gap-2 bg-muted-bg rounded-xl px-3 py-2">
              <Lock className="text-muted" size={24} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm px-3 py-2 rounded"
                placeholder="Crie uma senha segura"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 shadow-soft transition-all duration-300"
          >
            {loading ? "Criando conta..." : "Registrar"}
            {!loading && <UserPlus size={24} />}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted mt-6 flex items-center justify-center gap-2 cursor-pointer hover:underline"
          onClick={() => router.push("/login")}
        >
          <ArrowLeft size={24} />
          Voltar para o login
        </motion.p>
      </motion.div>
    </main>
  );
}

export default RegisterPage;
