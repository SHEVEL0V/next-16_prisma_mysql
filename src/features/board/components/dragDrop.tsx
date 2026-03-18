/** @format */

"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Column from "./column/column";
import { Stack } from "@mui/material";
import { reorderAction } from "../actions";
import { useOptimistic, startTransition, useTransition } from "react";
import { ColumnType } from "../types";

/**
 * Main wrapper for Kanban drag-and-drop features.
 * Integrates Next.js 16 optimal features: `useOptimistic` and `useTransition` for 
 * instant client-side rendering without waiting for server action completion.
 */
export default function DragDropWrapper({
  initialData,
  boardId,
}: {
  initialData: ColumnType[];
  boardId: string;
}) {
  const [isPending, startTransitionAction] = useTransition();

  const [optimisticColumns, setOptimisticColumns] = useOptimistic<
    ColumnType[],
    ColumnType[]
  >(initialData, (_currentColumns, newColumns) => newColumns);

  /**
   * Evaluates drop destination and performs optimistic local array mutations. 
   * Submits final repositioned indexes to server via form data.
   */
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    startTransitionAction(() => {
      const newColumns = Array.from(optimisticColumns);
      const formData = new FormData();
      formData.append("id", draggableId);
      formData.append("type", type);

      if (type === "column") {
        const [movedColumn] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, movedColumn);

        setOptimisticColumns(newColumns);
        formData.append("order", destination.index.toString());
      }

      if (type === "task") {
        const sourceColIndex = newColumns.findIndex((col) => col.id === source.droppableId);
        const destColIndex = newColumns.findIndex((col) => col.id === destination.droppableId);

        if (sourceColIndex !== -1 && destColIndex !== -1) {
          const sourceColumn = newColumns[sourceColIndex];
          const destColumn = newColumns[destColIndex];

          const sourceTasks = Array.from(sourceColumn.tasks);
          const destTasks = source.droppableId === destination.droppableId ? sourceTasks : Array.from(destColumn.tasks);

          const [movedTask] = sourceTasks.splice(source.index, 1);
          const order = (destination.index + 1) * 1000;
          movedTask.order = order;
          
          destTasks.splice(destination.index, 0, movedTask);

          newColumns[sourceColIndex] = { ...sourceColumn, tasks: sourceTasks };
          newColumns[destColIndex] = { ...destColumn, tasks: destTasks };

          setOptimisticColumns(newColumns);
          
          formData.append("columnId", destination.droppableId);
          formData.append("order", order.toString());
        }
      }

      // Call action directly
      reorderAction({ success: false, errors: {} }, formData);
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="column" direction="horizontal">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            direction="row"
            spacing={3}
            sx={{ p: 3, overflowX: "auto", minHeight: "80vh" }}
            style={{ opacity: isPending ? 0.7 : 1, transition: "opacity 0.2s" }}
          >
            {optimisticColumns.map((column, index) => (
              <Draggable key={column.id} draggableId={column.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    <Column column={column} boardId={boardId} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}
