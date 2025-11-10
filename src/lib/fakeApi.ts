// lib/fakeApi.ts
export type FinanceItem = { id: number; title: string; value: number; type: "entrada" | "saida" };
export type ProjectItem = { id: number; name: string; status: "active" | "archived" };
export type TaskItem = { id: number; title: string; status: "done" | "pending" | "late" };

const wait = (ms = 600) => new Promise((res) => setTimeout(res, ms));

export async function fetchDashboardData() {
  await wait(400);
  const finances: FinanceItem[] = [
    { id: 1, title: "Receita - Cliente A", value: 1200, type: "entrada" },
    { id: 2, title: "Assinatura Figma", value: 25, type: "saida" },
    { id: 3, title: "Projeto B", value: 860, type: "entrada" },
    { id: 4, title: "Hosting", value: 60, type: "saida" },
    { id: 5, title: "Consultoria", value: 400, type: "entrada" },
  ];
  const projects: ProjectItem[] = [
    { id: 1, name: "FreelaFlow", status: "active" },
    { id: 2, name: "Mente Viva", status: "active" },
    { id: 3, name: "PetShop UI", status: "archived" },
  ];
  const tasks: TaskItem[] = [
    { id: 1, title: "Landing Page", status: "done" },
    { id: 2, title: "API Login", status: "pending" },
    { id: 3, title: "Dashboard Finanças", status: "late" },
    { id: 4, title: "Deploy on Vercel", status: "pending" },
  ];

  return { finances, projects, tasks };
}
