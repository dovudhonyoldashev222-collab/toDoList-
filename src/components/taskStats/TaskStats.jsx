import "./TaskStats.css";
const TaskStats = ({ todos, onDeleteCompleted, onMarkAllCompleted, onClearAll }) => {
  // guard against missing prop
  const total = todos ? todos.length : 0;
  const completedTasksCount = todos ? todos.filter((todo) => todo.isDone).length : 0;
  const incompleteCount = total - completedTasksCount;

  return (
    <div className="task-stats">
      <p>Total tasks: {total}</p>
      <p>Completed tasks: {completedTasksCount}</p>
      <p>Incomplete tasks: {incompleteCount}</p>
      <div className="btns">
        <button onClick={onDeleteCompleted}>Delete Completed Tasks</button>
        <button onClick={onMarkAllCompleted}>Mark All Tasks As Completed</button>
        <button onClick={onClearAll}>Clear All Tasks</button>
      </div>
    </div>
  );
};

export default TaskStats;
