"use client";

import { useState } from "react";
import { useTasksStore, Task } from "@/store/tasksStore";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export default function Tasks() {
  const tasks = useTasksStore((state) => state.tasks);
  const filter = useTasksStore((state) => state.filter);
  const addTask = useTasksStore((state) => state.addTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const removeTask = useTasksStore((state) => state.removeTask);
  const setFilter = useTasksStore((state) => state.setFilter);
  const reorderTasks = useTasksStore((state) => state.reorderTasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask({ title, description, completed: false });
    setTitle("");
    setDescription("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Título da task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="text"
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
        >
          Adicionar
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md transition ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {f === "all"
              ? "Todas"
              : f === "active"
              ? "Pendentes"
              : "Concluídas"}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition hover:shadow-md ${
                        snapshot.isDragging ? "shadow-xl scale-105" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        <div>
                          <h3
                            className={`font-semibold text-gray-900 dark:text-gray-100 ${
                              task.completed
                                ? "line-through text-gray-400 dark:text-gray-500"
                                : ""
                            }`}
                          >
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="mt-3 md:mt-0 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                      >
                        Remover
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {tasks.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-6">
          Nenhuma task adicionada ainda.
        </p>
      )}
    </div>
  );
}
