/** @format */
"use client";
import React, { useActionState } from "react";
import { actionLoginUser } from "@/actions/user";

// MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

export default function Login() {
  const [state, formAction, pending] = useActionState(actionLoginUser, { message: "" });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Заголовок */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              Please enter your details to sign in
            </Typography>
          </Box>

          {/* Форма */}
          <Box component="form" action={formAction} noValidate sx={{ width: "100%" }}>
            <Stack spacing={2.5}>
              {" "}
              {/* Збільшений відступ між полями для "повітря" */}
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                placeholder="name@example.com"
              />
              <Box>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="••••••"
                />
              </Box>
              {state?.message && (
                <Alert
                  severity="error"
                  variant="outlined"
                  sx={{ border: "none", bgcolor: "error.50" }}
                >
                  {state.message}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={pending}
                size="large"
                disableElevation
                sx={{
                  mt: 1,
                  height: 48,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
                startIcon={pending && <CircularProgress size={20} color="inherit" />}
              >
                {pending ? "Signing in..." : "Sign in"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
