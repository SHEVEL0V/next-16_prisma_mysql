/** @format */
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";

// Іконки
import AddBoxIcon from "@mui/icons-material/AddBox";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { createBoardAction } from "../actions";

type SidebarProps = {
  boards: { id: string; title: string }[];
  activeBoard?: string;
};

const DRAWER_WIDTH = 320;
const COLLAPSED_WIDTH = 80;

// Окрема кнопка для відстеження стану Server Action
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Tooltip title="Створити дошку" placement="right">
      <IconButton type="submit" color="primary" disabled={pending} sx={{ p: "8px" }}>
        {pending ? <CircularProgress size={28} /> : <AddBoxIcon fontSize="large" />}
      </IconButton>
    </Tooltip>
  );
}

export default function Sidebar({ boards, activeBoard }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const [state, formAction] = useActionState(createBoardAction, {
    success: false,
    errors: {},
  });

  return (
    <Box
      component="aside"
      className="glass-effect"
      sx={{
        width: isOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          height: 64,
        }}
      >
        {isOpen && (
          <Typography variant="h6" className="glass-text">
            Планери
          </Typography>
        )}
        <IconButton onClick={toggleSidebar} color="inherit">
          {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider />

      <List
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: isOpen ? 2 : 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {boards.map((board) => {
          const isActive = board.title === activeBoard;

          return (
            <ListItem key={board.id} disablePadding>
              <Tooltip
                title={board.title}
                placement="right"
                disableHoverListener={isOpen}
              >
                <ListItemButton
                  component={Link}
                  href={"?name=" + board.title}
                  selected={isActive}
                  sx={{
                    justifyContent: isOpen ? "initial" : "center",
                    px: isOpen ? 2 : 0,
                  }}
                >
                  <ListItemIcon
                    sx={{ minWidth: 0, mr: isOpen ? 2 : 0, justifyContent: "center" }}
                  >
                    <ViewKanbanIcon />
                  </ListItemIcon>

                  <ListItemText
                    primary={board.title}
                    sx={{ display: isOpen ? "block" : "none" }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <Box
        component="form"
        action={formAction}
        sx={{
          justifyContent: isOpen ? "flex-start" : "center",
          mt: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          name="title"
          size="small"
          placeholder="Нова дошка..."
          required={isOpen}
          fullWidth
          variant="outlined"
          sx={{ display: isOpen ? "block" : "none" }}
        />
        <SubmitButton />
      </Box>
    </Box>
  );
}
