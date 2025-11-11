import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

interface TasksState {
  tasks: Task[];
  filter: Filter;
  addTask: (task: Omit<Task, "id">) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  setFilter: (filter: Filter) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

// Função segura para gerar UUID (crypto pode reclamar em alguns TS setups)
const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 10);
};

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: "all",

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: generateId() }],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      setFilter: (filter) => set({ filter }),

      reorderTasks: (startIndex, endIndex) => {
        const tasks = Array.from(get().tasks);
        const [removed] = tasks.splice(startIndex, 1);
        tasks.splice(endIndex, 0, removed);
        set({ tasks });
      },
    }),
    {
      name: "tasks-storage", // chave no localStorage
      version: 1,
      migrate: (persistedState, version) => {
        return persistedState;
      },
    }
  )
);
