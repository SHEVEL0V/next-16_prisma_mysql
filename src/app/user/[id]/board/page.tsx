/** @format */

// features/board/components/board-canvas.tsx
import { Box, Typography, Paper, Stack } from "@mui/material";
import Sidebar from "@/features/board/components/sidebar";
import { getBoards, getBoardById } from "@/features/board/queries";
import CenteredMessage from "@/components/ui/message";
import BoardColumn from "@/features/board/components/column";

interface Props {
  searchParams: Promise<{ name?: string }>;
}

export default async function BoardPage({ searchParams }: Props) {
  const { name: boardName } = await searchParams;

  const boards = (await getBoards())?.data ?? [];

  const activeBoard = boardName || boards[0]?.title;
  // ==========!! костиль для отримання id !!=========================
  const id = boards.find((b) => b.title === activeBoard)?.id;

  if (!activeBoard) {
    return <CenteredMessage message="Будь ласка, створіть або виберіть дошку." />;
  }

  const boardResponse = await getBoardById(id!);
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
          <Box sx={{ p: 3, display: "flex", gap: 2, overflowX: "auto", flexGrow: 1 }}>
            {board.columns.map((column) => (
              <BoardColumn key={column.id} column={column} boardId={id!} />
            ))}
          </Box>
        ) : (
          <CenteredMessage message="Дошку не знайдено або сталася помилка." />
        )}
      </Box>
    </Box>
  );
}
