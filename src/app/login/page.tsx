"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn } from "lucide-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Credenciais inválidas. Tente novamente!");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center from-blue-50 to-blue-100 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-muted shadow-soft border border-card-border rounded-2xl w-full max-w-md p-8 mx-4"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Bem-vindo ao{" "}
          <span className="text-blue-600 dark:text-blue-400">Login</span>
        </motion.h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-2">Email</label>
            <div className="flex items-center gap-2 bg-muted-bg rounded-xl px-3 py-2">
              <Mail className="text-muted" size={24} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm py-3 px-2 rounded"
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
                placeholder="digite a sua senha"
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
            {loading ? "Entrando..." : "Entrar"}
            {!loading && <LogIn size={24} />}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted mt-6"
        >
          Ainda não tem conta?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline"
          >
            Criar conta
          </span>
        </motion.p>
      </motion.div>
    </main>
  );
}

export default LoginPage;
