import styles from "./TaskCard.module.css";
import clsx from "clsx";
import type { Task, TaskStatus } from "../../types/task";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

function TaskCard({ task, onDelete, onStatusChange }: Props) {
  // формат дати: дд.мм.рррр
  const formattedDate = task.createdAt.toLocaleDateString("uk-UA");

  return (
    <div
      className={clsx(
        styles.card,
        task.priority === "low" && styles.cardLow,
        task.priority === "medium" && styles.cardMedium,
        task.priority === "high" && styles.cardHigh
      )}
    >
      <h3 className={styles.title}>{task.title}</h3>

      {task.description && <p>{task.description}</p>}

      <div className={styles.meta}>
        <span>Пріоритет: {task.priority}</span> |{" "}
        <span>Дата: {formattedDate}</span>
      </div>

      <div className={styles.actions}>
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button onClick={() => onDelete(task.id)}>Видалити</button>
      </div>
    </div>
  );
}

export default TaskCard;