/** @format */

"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Column from "./column/column";
import { Stack } from "@mui/material";
import { reorderColumnAction } from "../actions";
import { useActionState, useOptimistic, startTransition } from "react";
import { ColumnType } from "../types";

export default function DragDropWrapper({
  initialData,
  boardId,
}: {
  initialData: ColumnType[];
  boardId: string;
}) {
  // 1. Ініціалізуємо Server Action
  const [, formAction, isPending] = useActionState(reorderColumnAction, {
    success: false,
    errors: {},
  });

  // 2. Використовуємо useOptimistic замість useState + useEffect
  const [optimisticColumns, setOptimisticColumns] = useOptimistic<
    ColumnType[],
    ColumnType[]
  >(initialData, (_currentColumns, newColumns) => newColumns);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === "column") {
      // Створюємо новий масив колонок
      const newColumns = Array.from(optimisticColumns);
      const [movedColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, movedColumn);

      // 3. Запускаємо транзакцію для оптимістичного оновлення та виклику екшену
      startTransition(() => {
        // Миттєво оновлюємо UI
        setOptimisticColumns(newColumns);

        // Відправляємо дані на сервер
        const formData = new FormData();
        formData.append("id", draggableId);
        formData.append("order", destination.index.toString());

        formAction(formData);
      });
    }
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
            // Можна додати візуальний індикатор завантаження, якщо isPending === true
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
