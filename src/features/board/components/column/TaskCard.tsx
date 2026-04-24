/** @format */

"use client";
import { memo } from "react";
import { TaskType } from "../../types";
import { Draggable } from "@hello-pangea/dnd";
import { createPortal } from "react-dom";
import TaskCardContent from "./TaskCardContent";

interface TaskCardProps {
	task: TaskType;
	index: number;
}

export default memo(function TaskCard({ task, index }: TaskCardProps) {
	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot) => {
				const child = (
					<TaskCardContent
						task={task}
						snapshot={snapshot}
						provided={provided}
					/>
				);

				if (snapshot.isDragging && typeof document !== "undefined") {
					return createPortal(child, document.body);
				}
				return child;
			}}
		</Draggable>
	);
});
