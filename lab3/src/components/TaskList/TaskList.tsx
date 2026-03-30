import TaskCard from "../TaskCard/TaskCard";
import type { Task, TaskStatus } from "../../types/task";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

function TaskList({ tasks, onDelete, onStatusChange }: Props) {
  if (tasks.length === 0) {
    return <p>Задач немає. Додайте першу задачу!</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskList;