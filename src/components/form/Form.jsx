import "./Form.css";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const Form = ({ onAddTask, editingTask, onUpdateTask }) => {
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState(editingTask ? editingTask.task : "");

  // keep inputValue in sync when editingTask changes
  useEffect(() => {
    setInputValue(editingTask ? editingTask.task : "");
    setError("");
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputValue.trim();

    if (!value) {
      setError("Please enter a task.");
      return;
    }

    if (editingTask) {
      onUpdateTask({ ...editingTask, task: value });
    } else {
      const newTask = {
        id: uuidv4(),
        task: value,
        isDone: false,
      };
      onAddTask(newTask);
    }

    setInputValue("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-controls">
        <input
          name="taskInput"
          type="text"
          placeholder={editingTask ? "Edit task" : "Add a new task"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Form;
