"use client";

import {
  ClipboardList,
  Check,
  Clock,
  Globe,
  User,
  SunMoon,
} from "lucide-react";
import { useState } from "react";
import Tasks from "../../components/tasks";

const tarefasMock = [
  { tarefa: "Criar layout dashboard", status: "Concluída" },
  { tarefa: "Integrar API financeira", status: "Em Andamento" },
  { tarefa: "Configurar autenticação", status: "Pendente" },
];

function SettingsPage() {
  const [tema, setTema] = useState<"light" | "dark">("light");
  const [idioma, setIdioma] = useState("PT");
  const [perfilNome, setPerfilNome] = useState("Leonel César");

  const toggleTema = () => setTema(tema === "light" ? "dark" : "light");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
        <ClipboardList className="w-7 h-7 text-blue-600" /> Tarefas &
        Configurações
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SunMoon className="w-6 h-6 text-yellow-500" />
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Tema
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Tema atual: <strong>{tema}</strong>
          </p>
          <button
            onClick={toggleTema}
            className="mt-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Alternar Tema
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-green-500" />
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Idioma
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Idioma atual: <strong>{idioma}</strong>
          </p>
          <select
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
            className="mt-2 p-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="PT">Português</option>
            <option value="EN">Inglês</option>
            <option value="ES">Espanhol</option>
            <option value="ES">Frances</option>
            <option value="ES">Alemão</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-500" />
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Perfil
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Nome: <strong>{perfilNome}</strong>
          </p>
          <input
            type="text"
            value={perfilNome}
            onChange={(e) => setPerfilNome(e.target.value)}
            className="mt-2 p-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="pt-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-3">
          <ClipboardList className="w-6 h-6 text-blue-600" /> Tarefas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tarefasMock.map((tarefa) => {
            const Icon = tarefa.status === "Concluída" ? Check : Clock;
            const color =
              tarefa.status === "Concluída"
                ? "green-500"
                : tarefa.status === "Em Andamento"
                ? "yellow-500"
                : "red-500";

            return (
              <div
                key={tarefa.tarefa}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
              >
                <p className="text-gray-800 dark:text-gray-100">
                  {tarefa.tarefa}
                </p>
                <Icon className={`w-5 h-5 text-${color}`} />
              </div>
            );
          })}
        </div>
      </div>

      <Tasks />
    </div>
  );
}

export default SettingsPage;
