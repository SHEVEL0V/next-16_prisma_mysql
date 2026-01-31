/** @format */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// MUI Компоненти
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

// MUI Іконки
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import { logout } from "@/actions/auth/login";

export default function ButtonUser() {
  const router = useRouter();

  // Стан для керування меню (відкрито/закрито)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Відкриття меню при кліку на іконку
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Закриття меню
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Логіка виходу
  const handleLogout = async () => {
    handleClose(); // Спочатку закриваємо меню

    try {
      logout();
      console.log("User logged out");
      router.push("/login");
      router.refresh(); // Оновлення стану сторінки
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Кнопка-тригер */}
      <Tooltip title="Налаштування профілю">
        <IconButton
          onClick={handleClick}
          size="large"
          color="inherit"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <AccountCircle fontSize="inherit" />
        </IconButton>
      </Tooltip>

      {/* Випадаюче меню */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose} // Закривати меню при кліку на будь-який пункт
        slotProps={{
          paper: {
            elevation: 4, // Тінь меню
            sx: {
              minWidth: 150,
              mt: 1.5, // Відступ зверху
              // Стилізація трикутника (стрілочки) зверху меню
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Пункт 1: Профіль (посилання) */}
        <MenuItem component={Link} href="/profile">
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Профіль
        </MenuItem>

        <Divider />

        {/* Пункт 2: Вихід (кнопка з логікою) */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          Вийти
        </MenuItem>
      </Menu>
    </>
  );
}
