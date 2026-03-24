import "./TaskList.css";

const TaskList = ({ todos, onDone, onDelete, onEdit }) => {
  return (
    <div>
      <ul>
        {!todos.length && <h1>0 tasks</h1>}
        {todos.length &&
          todos.map((todo, i) => (
            <li key={todo.id} className={todo.isDone ? "active" : ""}>
              <span>
                {i + 1}. {todo.task}
              </span>
              <button
                className="done"
                onClick={() => onDone && onDone(todo.id)}
              >
                done
              </button>
              <button
                className="update"
                onClick={() => onEdit && onEdit(todo)}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => onDelete && onDelete(todo.id, i)}
              >
                delete
              </button>
            </li>
          ))}

      </ul>
    </div>
  );
};

export default TaskList;
