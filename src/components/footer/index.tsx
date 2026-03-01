/** @format */
"use client";

import React from "react";
import { Box, Container, Typography, Stack, Link } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer">
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" className="glass-text">
            © {currentYear} UI Portal. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link href="#" className="footer-link" variant="caption">
              Privacy Policy
            </Link>
            <Link href="#" className="footer-link" variant="caption">
              Terms of Service
            </Link>
            <Link href="#" className="footer-link" variant="caption">
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
