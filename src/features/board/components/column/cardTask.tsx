/** @format */

"use client";
import { Card, CardContent, Stack, Chip } from "@mui/material";
import { TaskType } from "../../types";
import { deleteTaskAction, updateTaskAction } from "../../actions";
import InlineEditor from "@/components/ui/editor";
import { Draggable } from "@hello-pangea/dnd";
import { createPortal } from "react-dom";

interface TaskCardProps {
  task: TaskType;
  index: number;
}

const PRIORITY_CONFIG: Record<
  string,
  { color: "error" | "warning" | "info" | "success" | "primary" }
> = {
  high: { color: "error" },
  medium: { color: "warning" },
  low: { color: "success" },
};

export default function TaskCard({ task, index }: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        const child = (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          >
            <Card 
              className="glass-effect" 
              sx={{ 
                ...(snapshot.isDragging 
                    ? { boxShadow: 6, transform: "scale(1.02)", cursor: "grabbing" } 
                    : { cursor: "grab" }) 
              }}
            >
            <input type="hidden" name="id" value={task.id} />
            <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={1}
              >
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                  <InlineEditor
                    data={{ id: task.id, value: task.title, name: "title" }}
                    update={updateTaskAction}
                    remove={deleteTaskAction}
                  >
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
                  </InlineEditor>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </div>
        );
        
        if (snapshot.isDragging && typeof document !== "undefined") {
          return createPortal(child, document.body);
        }
        return child;
      }}
    </Draggable>
  );
}
