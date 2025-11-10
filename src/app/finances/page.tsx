"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

const dataFinancas = [
  { name: "Receitas", value: 4500 },
  { name: "Despesas", value: 2300 },
  { name: "Investimentos", value: 1200 },
];

const resumoMensal = [
  { mes: "Jan", receita: 3800, despesa: 2400 },
  { mes: "Fev", receita: 4200, despesa: 2100 },
  { mes: "Mar", receita: 4600, despesa: 2300 },
  { mes: "Abr", receita: 4800, despesa: 2500 },
  { mes: "Mai", receita: 5100, despesa: 2800 },
  { mes: "Jun", receita: 5300, despesa: 2900 },
];

const cores = ["#3B82F6", "#F59E0B", "#10B981"];

const transacoesRecentes = [
  {
    id: 1,
    descricao: "Pagamento de cliente A",
    tipo: "Receita",
    valor: "+€850",
  },
  { id: 2, descricao: "Assinatura SaaS", tipo: "Despesa", valor: "-€45" },
  {
    id: 3,
    descricao: "Investimento em ações",
    tipo: "Investimento",
    valor: "-€250",
  },
  {
    id: 4,
    descricao: "Cliente B - projeto concluído",
    tipo: "Receita",
    valor: "+€1200",
  },
  {
    id: 5,
    descricao: "Compra de equipamento",
    tipo: "Despesa",
    valor: "-€600",
  },
];

function FinancasPage() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
        <Wallet className="w-7 h-7 text-blue-600" /> Finanças
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Receitas Totais",
            value: "€4.500",
            icon: TrendingUp,
            color: "text-green-500",
          },
          {
            title: "Despesas Totais",
            value: "€2.300",
            icon: TrendingDown,
            color: "text-red-500",
          },
          {
            title: "Investimentos",
            value: "€1.200",
            icon: PiggyBank,
            color: "text-yellow-500",
          },
          {
            title: "Saldo Atual",
            value: "€3.400",
            icon: Wallet,
            color: "text-blue-500",
          },
        ].map(({ title, value, icon: Icon, color }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {title}
              </p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {value}
              </p>
            </div>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Distribuição Financeira
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataFinancas}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {dataFinancas.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={cores[index % cores.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Receita vs Despesa (6 meses)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={resumoMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="receita" fill="#10B981" name="Receita" />
              <Bar dataKey="despesa" fill="#EF4444" name="Despesa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Crescimento Financeiro
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={resumoMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="receita"
                stroke="#3B82F6"
                name="Receita"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="despesa"
                stroke="#F59E0B"
                name="Despesa"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de transações */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Transações Recentes
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400">
              <tr>
                <th className="py-2 px-3">Descrição</th>
                <th className="py-2 px-3">Tipo</th>
                <th className="py-2 px-3 text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {transacoesRecentes.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-2 px-3 text-gray-800 dark:text-gray-100">
                    {t.descricao}
                  </td>
                  <td className="py-2 px-3 text-gray-500 dark:text-gray-400">
                    {t.tipo}
                  </td>
                  <td
                    className={`py-2 px-3 text-right font-medium ${
                      t.valor.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.valor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FinancasPage;
