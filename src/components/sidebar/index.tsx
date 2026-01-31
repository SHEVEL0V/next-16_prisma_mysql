/** @format */
"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// Іконки
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

interface SidebarProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Sidebar({ onEdit, onDelete }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
    if (onEdit) onEdit();
    setOpen(false); // Закриваємо меню після кліку
  };

  const handleDelete = () => {
    console.log("Delete clicked");
    if (onDelete) onDelete();
    setOpen(false);
  };

  // Вміст сайдбару
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      {/* Заголовок сайдбару */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h6">Меню дій</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {/* Кнопка Редагувати */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Редагувати" />
          </ListItemButton>
        </ListItem>

        {/* Кнопка Видалити */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleDelete}
            sx={{
              color: "error.main", // Червоний текст
              "&:hover": {
                backgroundColor: "error.lighter", // (Опціонально) світло-червоний фон
              },
            }}
          >
            <ListItemIcon>
              <DeleteIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Видалити" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Кнопка для відкриття сайдбару (можна винести окремо) */}
      <IconButton
        onClick={toggleDrawer(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      {/* Сам компонент Drawer */}
      <Drawer
        anchor="right" // 'left' (зліва) або 'right' (справа)
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
