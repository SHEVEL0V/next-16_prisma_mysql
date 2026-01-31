/** @format */

"use client";

import React, { useActionState } from "react";
import { actionLoginUser } from "@/actions/auth/login";

// MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

// Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
  const [state, formAction, pending] = useActionState(actionLoginUser, { message: "" });

  return (
    // Container центрує контент по горизонталі та обмежує ширину (xs = ~444px)
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8, // Відступ зверху
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Картка форми */}
        <Paper
          elevation={3} // Тінь (аналог shadow-lg)
          sx={{
            p: 4, // padding (аналог p-4)
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2, // заокруглення
          }}
        >
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Login UI
            </Typography>
          </>

          <Box component="form" action={formAction} noValidate sx={{ width: "100%" }}>
            <Stack spacing={2}>
              {" "}
              {/* Stack автоматично додає відступи (gap) між елементами */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="success" // Ваш вибір кольору
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="success"
              />
              {/* Блок помилок */}
              {state?.message && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {state.message}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                disabled={pending}
                size="large"
                sx={{ mt: 2, mb: 2, height: 48 }} // Висота кнопки (аналог h-12)
                startIcon={pending && <CircularProgress size={20} color="inherit" />}
              >
                {pending ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
