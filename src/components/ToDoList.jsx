import "./ToDoList.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "Reading book", isDone: false },
    { id: 2, task: "Playing football", isDone: false },
    { id: 3, task: "Task 3", isDone: false },
    { id: 4, task: "Task 4", isDone: false },
  ]);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const completedTasks = (todos && todos.filter((task) => task.isDone)) || [];
  const inCompletedTasks =
    (todos && todos.filter((task) => !task.isDone)) || [];

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!isEdit) {
      const newTask = {
        id: uuidv4(),
        task: text,
        isDone: false,
      };

      setTodos([...todos, newTask]);
    }

    if (isEdit) {
      const updatedTasks = todos.map((todo) => {
        if (todo.id === editTask.id) {
          return { ...todo, task: text };
        }
        return todo;
      });

      setTodos(updatedTasks);
      setIsEdit(false);
    }

    setText("");
  };

  // const handleDoneClick = (task) => {
  // const restTasks = todos.filter((todo) => todo.id !== task.id);
  // task.isDone = true;
  // setTodos([...restTasks, task]);
  // };

  const handleDoneClick = (id) => {
    const data = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: true };
      }
      return todo;
    });

    setTodos(data);
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setIsEdit(true);
    setText(task.task);
  };

  const handleDeleteClick = (id) => {
    const filteredData = todos.filter((task) => task.id !== id);
    setTodos(filteredData);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <hr />

      <form onSubmit={handleAddTask}>
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          type="text"
          placeholder="Add a new task"
        />
        <button type="submit">{isEdit ? "Update" : "Add Task"}</button>
      </form>

      <hr />

      <ul>
        {todos &&
          todos.map((task, i) => {
            return (
              <li key={task.id} className={task.isDone ? "active" : ""}>
                <span>
                  {i + 1}. {task.task}
                </span>
                <button
                  onClick={() => {
                    handleDoneClick(task.id);
                  }}
                  className="done"
                >
                  done
                </button>
                <button
                  onClick={() => {
                    handleEditClick(task);
                  }}
                  className="update"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDeleteClick(task.id);
                  }}
                  className="delete"
                >
                  delete
                </button>
              </li>
            );
          })}
      </ul>

      <hr />
      <p>Total tasks: {todos.length}</p>
      <p>Completed tasks: {completedTasks.length}</p>
      <p>Incomplete tasks: {inCompletedTasks.length}</p>
      {/* <button>Delete Completed Tasks</button> */}
      {/* <button>Mark All Tasks As Completed</button> */}
      {/* <button>Clear All Tasks</button> */}
    </div>
  );
};

export default ToDoList;
