"use client";
import { Chip } from "@mui/material";
import { useActionState } from "react";
import { updateTaskPriorityAction } from "../../actions";
import { TaskType } from "../../types";

const PRIORITY_CONFIG: Record<
  string,
  { color: "error" | "warning" | "info" | "success" | "primary" }
> = {
  high: { color: "error" },
  medium: { color: "warning" },
  low: { color: "success" },
};

const NEXT_PRIORITY: Record<string, string> = {
  LOW: "MEDIUM",
  MEDIUM: "HIGH",
  HIGH: "URGENT",
  URGENT: "LOW",
};

export default function TaskPriorityToggle({ task }: { task: TaskType }) {
  const [, priorityAction, isPriorityPending] = useActionState(
    updateTaskPriorityAction,
    { success: false, message: "", errors: {} }
  );

  if (!task.priority) return null;

  return (
    <form action={priorityAction}>
      <input type="hidden" name="id" value={task.id} />
      <input type="hidden" name="priority" value={NEXT_PRIORITY[task.priority] || "MEDIUM"} />
      <button
        type="submit"
        disabled={isPriorityPending}
        style={{
          all: "unset",
          cursor: isPriorityPending ? "not-allowed" : "pointer",
          opacity: isPriorityPending ? 0.5 : 1,
          transition: "opacity 0.2s"
        }}
      >
        <Chip
          label={task.priority}
          size="small"
          color={PRIORITY_CONFIG[task.priority.toLowerCase()]?.color || "primary"}
          sx={{
            height: 20,
            fontSize: "0.65rem",
            fontWeight: 700,
            width: "fit-content",
          }}
        />
      </button>
    </form>
  );
}
