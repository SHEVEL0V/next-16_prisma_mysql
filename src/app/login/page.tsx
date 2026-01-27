/** @format */

/** @format */
"use client";

import React from "react";
import { useActionState } from "react";
import { actionLoginUser } from "@/actions/auth/login";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
  const [state, formAction, pending] = useActionState(actionLoginUser, { message: "" });
  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 p-4 max-w-md mx-auto mt-32  border rounded-md shadow-lg bg-slate-50 dark:bg-gray-800 text-green-700"
    >
      <h1 className="text-3xl font-bold text-center">Login NEM UI</h1>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        name="email"
        color="success"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        name="password"
        color="success"
        type="password"
      />

      <div className="text-red-500 text-sm font-bold h-4 text-center">
        {state.message}
      </div>

      <Button
        variant="contained"
        color="success"
        disabled={pending}
        type="submit"
        className="h-12"
      >
        Sing in
      </Button>
    </form>
  );
}
