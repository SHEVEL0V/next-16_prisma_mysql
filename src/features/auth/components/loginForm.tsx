/** @format */

// features/auth/components/LoginForm.tsx
"use client";

import React, { useActionState } from "react";
import { loginAction } from "@/features/auth/actions";
import { Box, Typography, Link } from "@mui/material";
import { LoginFields } from "./loginFields";
import NextLink from "next/link";
import ContainerForm from "./container";

const initialState = { success: false as const, message: "", errors: {} };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <ContainerForm>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please enter your details to sign in
        </Typography>
      </Box>

      <Box component="form" action={formAction} noValidate sx={{ width: "100%" }}>
        <LoginFields state={state} isPending={isPending} />
      </Box>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {"Don't have an account?"}{" "}
          <Link component={NextLink} href="/signup" fontWeight={600} underline="hover">
            Sign up
          </Link>
        </Typography>
      </Box>
    </ContainerForm>
  );
}
