import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TaskForm.module.css";

const taskSchema = z.object({
  title: z.string().min(3, "Мінімум 3 символи").max(100),
  description: z.string().max(500),
  priority: z.enum(["low", "medium", "high"], {
    message: "Оберіть пріоритет",
  }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

interface Props {
  onSubmit: (data: TaskFormData) => void;
}

function TaskForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const submitHandler = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      <div className={styles.field}>
        <input placeholder="Назва" {...register("title")} />
        <p className={styles.error}>{errors.title?.message}</p>
      </div>

      <div className={styles.field}>
        <textarea placeholder="Опис" {...register("description")} />
        <p className={styles.error}>{errors.description?.message}</p>
      </div>

      <div className={styles.field}>
        <select {...register("priority")}>
          <option value="">Оберіть пріоритет</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
        <p className={styles.error}>{errors.priority?.message}</p>
      </div>

      <button type="submit" className={styles.submit}>
        Додати задачу
      </button>
    </form>
  );
}

export default TaskForm;