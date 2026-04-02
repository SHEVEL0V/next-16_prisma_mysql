/** @format */

import Board from "@/features/board/components/Board";

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function BoardPage({ searchParams }: Props) {
  const { id } = await searchParams;
  return <Board boardId={id} />;
}
