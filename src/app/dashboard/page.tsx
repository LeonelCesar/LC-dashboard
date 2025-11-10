"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData, FinanceItem } from "@/lib/fakeApi";
import { useAppStore } from "../../store/useAppStore";

import {
  TrendingUp,
  Users,
  Briefcase,
  Wallet,
  PieChart,
  CheckSquare,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart as RC_PieChart,
  Pie,
  Cell,
} from "recharts";

import { motion } from "framer-motion";

const COLORS = ["#10B981", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

 function DashboardPage() {
  // Zustand UI state
  const selectedProjectId = useAppStore((s) => s.selectedProjectId);
  const setSelectedProject = useAppStore((s) => s.setSelectedProject);

  // React Query fetch
const { data, isPending: isLoading, error } = useQuery({
  queryKey: ["dashboard"],
  queryFn: fetchDashboardData,
  staleTime: 1000 * 60 * 2,
  gcTime: 1000 * 60 * 10,
});

  // processa os dados para gráficos
  const revenueData = useMemo(() => {
    // mock monthly series derived from finances (for demo we craft months)
    // Em produção substitui por endpoint real
    return [
      { month: "Jan", income: 4000, expenses: 2400 },
      { month: "Fev", income: 3000, expenses: 1398 },
      { month: "Mar", income: 5200, expenses: 2000 },
      { month: "Abr", income: 4800, expenses: 2780 },
      { month: "Mai", income: 6000, expenses: 1890 },
      { month: "Jun", income: 6500, expenses: 2390 },
    ];
  }, []);

  const finances = data?.finances ?? [];
  const tasks = data?.tasks ?? [];
  const projects = data?.projects ?? [];

  // prepara dados para o pie (distribuição por categoria)
  const pieData: { name: string; value: number }[] = useMemo(() => {
    const map = new Map<string, number>();
    finances.forEach((f: FinanceItem) => {
      const key = f.type === "entrada" ? "Entradas" : "Saídas";
      map.set(key, (map.get(key) ?? 0) + f.value);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [finances]);

  const totalBalance = finances.reduce((acc: number, f: FinanceItem) => acc + (f.type === "entrada" ? f.value : -f.value), 0);

  if (isLoading) {
    return <div className="p-6">Carregando dashboard…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Erro ao carregar dados.</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            Painel Profissional
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Visão geral — Conteúdo dinâmico com React Query + Zustand.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Saldo Atual</p>
            <p className="text-lg font-semibold text-blue-600">€{totalBalance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Top cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Projetos Ativos</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{projects.length}</p>
            </div>
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
        </motion.div>

        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tarefas Pendentes</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{tasks.filter(t => t.status === "pending").length}</p>
            </div>
            <CheckSquare className="w-6 h-6 text-yellow-500" />
          </div>
        </motion.div>

        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receita (exemplos)</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">€{finances.filter(f => f.type === "entrada").reduce((s:number, f:FinanceItem) => s + f.value, 0)}</p>
            </div>
            <Wallet className="w-6 h-6 text-green-500" />
          </div>
        </motion.div>

        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de Crescimento</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">+12%</p>
            </div>
            <TrendingUp className="w-6 h-6 text-purple-500" />
          </div>
        </motion.div>
      </section>

      {/* Main grid: charts + details */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wide: revenue chart (spans 2 cols on large) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Receita vs Despesa (6 meses)</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6edf3" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* small KPI row */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-xs text-gray-500">Média Mensal</p>
              <p className="font-semibold">€4.800</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-xs text-gray-500">Maior Receita</p>
              <p className="font-semibold">€6.500</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-xs text-gray-500">Menor Despesa</p>
              <p className="font-semibold">€1.398</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-xs text-gray-500">Tarefas Atrasadas</p>
              <p className="font-semibold">{tasks.filter(t => t.status === "late").length}</p>
            </div>
          </div>
        </div>

        {/* Right column: pie + recent activities */}
        <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-5 shadow-sm flex flex-col gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-500" /> Distribuição Financeira
            </h4>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RC_PieChart>
                  <Pie dataKey="value" data={pieData} outerRadius={80} innerRadius={36} paddingAngle={4}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RC_PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2">
              {pieData.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span style={{ width: 12, height: 12, background: COLORS[i % COLORS.length], display: "inline-block", borderRadius: 3 }} />
                    <span className="text-gray-700 dark:text-gray-300">{p.name}</span>
                  </div>
                  <div className="text-gray-900 dark:text-gray-100 font-medium">€{p.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Últimas Atividades</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✅ Projeto "FreelaFlow" concluído</li>
              <li>📈 Receita mensal aumentou 12%</li>
              <li>🕓 3 tarefas em atraso</li>
              <li>💳 Nova cobrança processada</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
