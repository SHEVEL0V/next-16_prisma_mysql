/** @format */
"use client";
import { Box, ListItem, ListItemButton, ListItemIcon, Tooltip } from "@mui/material";

import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import Link from "next/link";
import { updateBoardAction, deleteBoardAction } from "../../actions";

import Editor from "../editor";

interface SidebarItemProps {
  id: string;
  title: string;
  isActive: boolean;
  isOpen: boolean;
}

export default function SidebarItem({ id, title, isActive, isOpen }: SidebarItemProps) {
  // Визначаємо URL для переходу
  const href = `?id=${id}`;

  return (
    <ListItem
      disablePadding
      sx={{
        mb: 0.5,
        display: "block",
        "&:hover .item-actions": { opacity: 1 },
      }}
    >
      <Tooltip title={title} placement="right" disableHoverListener={isOpen}>
        <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
          <ListItemButton
            selected={isActive}
            sx={{
              borderRadius: 2,
              px: isOpen ? 2 : 0,
              minHeight: 48,
              width: "100%",
              // Залишаємо місце для кнопок дій, якщо сайдбар відкритий
              pr: isOpen ? 10 : 0,
            }}
          >
            <Link href={href}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <ViewKanbanIcon color={isActive ? "primary" : "inherit"} />
              </ListItemIcon>
            </Link>

            <Editor
              data={{ id, value: title, name: "title" }}
              update={updateBoardAction}
              remove={deleteBoardAction}
            />
          </ListItemButton>
        </Box>
      </Tooltip>
    </ListItem>
  );
}
