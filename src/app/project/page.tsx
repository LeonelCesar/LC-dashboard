"use client";

import { Briefcase, CheckCircle, Clock, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const projetosMock = [
  {
    nome: "Projeto Alpha",
    status: "Concluído",
    progresso: 100,
    inicio: "01/09/2025",
    fim: "30/10/2025",
    responsavel: "Adão Domingoa Gonçalves Costa",
    descricao: "Dashboard interativa para gestão financeira de freelancers.",
  },
  {
    nome: "Projeto Beta",
    status: "Em Andamento",
    progresso: 65,
    inicio: "10/10/2025",
    fim: "15/12/2025",
    responsavel: "Lanira Neves",
    descricao: "Aplicação web de acompanhamento de tarefas com IA.",
  },
  {
    nome: "Projeto Gamma",
    status: "Pendente",
    progresso: 20,
    inicio: "05/11/2025",
    fim: "20/02/2026",
    responsavel: "Henriqueta Bengui César",
    descricao: "Sistema de relatórios e automação de finanças.",
  },
  {
    nome: "Projeto Delta",
    status: "Em Andamento",
    progresso: 45,
    inicio: "01/10/2025",
    fim: "31/01/2026",
    responsavel: "Eloa César",
    descricao: "Plataforma de automação e relatórios avançados para empresas.",
  },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6"];

function ProjetosPage() {
  const dadosGrafico = projetosMock.map((p) => ({
    name: p.nome,
    value: p.progresso,
  }));

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
        <Briefcase className="w-7 h-7 text-blue-600" /> Projetos
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projetosMock.map((proj) => (
            <div
              key={proj.nome}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {proj.nome}
                  </h2>
                  {proj.status === "Concluído" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : proj.status === "Em Andamento" ? (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  {proj.descricao}
                </p>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      proj.progresso === 100
                        ? "bg-green-500"
                        : proj.progresso >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${proj.progresso}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Progresso: {proj.progresso}%
                </p>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                <p>
                  🗓 {proj.inicio} - {proj.fim}
                </p>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {proj.responsavel}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Distribuição de Progresso
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dadosGrafico}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {dadosGrafico.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <ul className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
            {projetosMock.map((p, i) => (
              <li key={p.nome} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                ></span>
                {p.nome} — {p.progresso}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProjetosPage;
