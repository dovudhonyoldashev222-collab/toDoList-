
import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Form from "./components/form/Form";
import TaskList from "./components/taskList/TaskList";
import TaskStats from "./components/taskStats/TaskStats";
const App = () => {
  const [todos, setTodos] = useState([
 
  { id: 1, task: "Asosiy sahifa dizaynini yakunlash", isDone: true },
  { id: 2, task: "Mobil qurilmalar uchun moslashtirish (Adaptive)", isDone: false },
  { id: 3, task: "Backend bilan ulanishni tekshirish", isDone: true },
  { id: 4, task: "Dark mode funksiyasini qo'shish", isDone: false },
  { id: 5, task: "Rasmlarni yuklash tezligini oshirish", isDone: false },
  { id: 6, task: "Forma validatsiyasini sozlash", isDone: true },
  { id: 7, task: "Xatoliklar sahifasini (404) yaratish", isDone: false },
  { id: 8, task: "Loyihani hostga (Vercel/Netlify) yuklash", isDone: false }

  ]);

  const [editTask, setEditTask] = useState(null);

  function addTask(newTask) {
    setTodos((prev) => [...prev, newTask]);
  }

  const markDone = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDone: true } : t))
    );
  };

  const deleteTask = (id, index) => {
    // if index provided we remove by position to avoid removing duplicates
    if (typeof index === "number") {
      setTodos((prev) => prev.filter((_, i) => i !== index));
    } else {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const startEdit = (task) => {
    setEditTask(task);
  };

  const updateTask = (updated) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setEditTask(null);
  };

  // handlers for statistics buttons
  const deleteCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.isDone));
  };

  const markAllCompleted = () => {
    setTodos((prev) => prev.map((t) => ({ ...t, isDone: true })));
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="app">
      <Header />
      <Form
        onAddTask={addTask}
        editingTask={editTask}
        onUpdateTask={updateTask}
      />
      <TaskList
        todos={todos}
        onDone={markDone}
        onDelete={deleteTask}
        onEdit={startEdit}
      />
      <TaskStats
        todos={todos}
        onDeleteCompleted={deleteCompleted}
        onMarkAllCompleted={markAllCompleted}
        onClearAll={clearAll}
      />
    </div>
  );
};

export default App;
