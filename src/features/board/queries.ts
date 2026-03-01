/** @format */
"use server";
import { cache } from "react";
import { safeQuery } from "@/utils/wrapperQuery";
import { boardService } from "./services/board";

export const getBoards = cache(() => safeQuery(boardService.get));

export const getBoardById = cache((id: string) =>
  safeQuery(() => boardService.getById(id)),
);
