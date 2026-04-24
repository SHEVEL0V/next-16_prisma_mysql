/** @format */
"use server";
import { cache } from "react";
import { safeQuery } from "@/utils/wrapperQuery";
import { boardService } from "./services/board";
import { taskService } from "./services/task";

export const getBoards = cache(() => safeQuery(boardService.get));

export const getBoardById = cache((id: string) =>
	safeQuery(() => boardService.getById(id)),
);

export const getTasksAll = cache(() => safeQuery(taskService.getAllInfo));
