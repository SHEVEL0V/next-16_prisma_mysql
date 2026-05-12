/** @format */

"use client";

import React, { useEffect, useState, ReactNode, Component } from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component (Client)
 * Catches errors in child components during rendering
 */
export class ClientErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 200,
            textAlign: "center",
            gap: 2,
            p: 3,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
          <Typography variant="h6">Something went wrong</Typography>
          <Typography variant="body2" color="text.secondary">
            {this.state.error?.message || "An unexpected error occurred"}
          </Typography>
          <Button variant="contained" size="small" onClick={this.reset}>
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ClientErrorBoundary;
