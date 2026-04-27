/** @format */

// features/board/components/board-canvas.tsx
import { Box } from "@mui/material";
import CenteredMessage from "@/components/ui/CenteredMessage";
import DragDropWrapper from "@/features/board/components/DragDrop";
import Sidebar from "@/features/board/components/sidebar/Sidebar";
import { getBoardById, getBoards } from "@/features/board/queries";

export default async function Board({ boardId }: { boardId?: string }) {
  const boards = (await getBoards())?.data ?? [];

  const activeBoard = boardId || boards[0]?.id;

  if (!activeBoard) {
    return (
      <CenteredMessage message="Будь ласка, створіть або виберіть дошку." />
    );
  }

  const boardResponse = await getBoardById(activeBoard);
  const board = boardResponse?.data;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar boards={boards} activeBoard={activeBoard} />
      {board ? (
        <DragDropWrapper boardId={activeBoard} initialData={board.columns} />
      ) : (
        <CenteredMessage message="Дошку не знайдено або сталася помилка." />
      )}
    </Box>
  );
}
