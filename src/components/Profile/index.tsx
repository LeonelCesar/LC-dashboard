' use client'

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

 function Profile() {
  const { data: session } = useSession();

  const userName = session?.user?.name || "Usuário Desconhecido";
  const userEmail = session?.user?.email || "sem-email@exemplo.com";
  const avatarUrl = session?.user?.image || "";

  return (
    <motion.div
      className="max-w-sm mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-20 w-20">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="rounded-full h-20 w-20 object-cover border-2 border-blue-500 shadow-sm"
            />
          ) : (
            <div className="flex items-center justify-center h-20 w-20 rounded-full from-blue-500 text-white text-3xl font-semibold shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Nome */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {userName}
        </h2>

        {/* Email */}
        <p className="text-sm text-gray-600 dark:text-gray-400">{userEmail}</p>

        {/* Botões */}
        <div className="flex gap-3 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Em breve página de perfil 😎")}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Perfil
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile; 
