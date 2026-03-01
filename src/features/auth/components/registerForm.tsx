/** @format */
"use client";

import React, { useActionState } from "react";
import { registerAction } from "@/features/auth/actions";
import { Box, Typography, Link } from "@mui/material";
import { RegisterFields } from "./registerFields";
import NextLink from "next/link";
import ContainerForm from "./container";

const initialState = { success: false, message: "", errors: {} };

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <ContainerForm>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Create an account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Join us to start managing your menu
        </Typography>
      </Box>

      <Box component="form" action={formAction} noValidate sx={{ width: "100%" }}>
        <RegisterFields state={state} isPending={isPending} />
      </Box>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Link component={NextLink} href="/signin" fontWeight={600} underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </ContainerForm>
  );
}
