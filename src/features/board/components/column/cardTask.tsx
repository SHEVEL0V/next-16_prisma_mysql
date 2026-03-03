/** @format */

"use client";
import { Card, CardContent, Stack, Chip } from "@mui/material";
import { TaskType } from "../../types";
import { deleteTaskAction, updateTaskAction } from "../../actions";
import InlineEditor from "@/components/ui/editor";

interface TaskCardProps {
  task: TaskType;
}

const PRIORITY_CONFIG: Record<
  string,
  { color: "error" | "warning" | "info" | "success" | "primary" }
> = {
  high: { color: "error" },
  medium: { color: "warning" },
  low: { color: "success" },
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="glass-effect bordered">
      <input type="hidden" name="id" value={task.id} />
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
        >
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            {/* Відображення пріоритету */}
            {task.priority && (
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
            )}

            <InlineEditor
              data={{ id: task.id, value: task.title, name: "title" }}
              update={updateTaskAction}
              remove={deleteTaskAction}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
