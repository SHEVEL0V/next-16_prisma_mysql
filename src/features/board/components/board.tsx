/** @format */

// features/board/components/board-canvas.tsx
import { Box } from "@mui/material";
import Sidebar from "@/features/board/components/sidebar/bar";
import { getBoards, getBoardById } from "@/features/board/queries";
import CenteredMessage from "@/components/ui/message";
import DragDropWrapper from "@/features/board/components/dragDrop";

export default async function Board({ boardId }: { boardId?: string }) {
  const boards = (await getBoards())?.data ?? [];

  const activeBoard = boardId || boards[0]?.id;

  if (!activeBoard) {
    return <CenteredMessage message="Будь ласка, створіть або виберіть дошку." />;
  }

  const boardResponse = await getBoardById(activeBoard!);
  const board = boardResponse?.data;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar boards={boards} activeBoard={activeBoard} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {board ? (
          <DragDropWrapper boardId={activeBoard} initialData={board.columns} />
        ) : (
          <CenteredMessage message="Дошку не знайдено або сталася помилка." />
        )}
      </Box>
    </Box>
  );
}
