/** @format */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const menu = [
  { name: "Персонал", link: "/pers" },
  { name: "Користувач", link: "/test" },
  { name: "Документи", link: "/test" },
  { name: "Звіти", link: "/test" },
  { name: "Новини", link: "/test" },
  { name: "Повідомлення", link: "/test" },
  { name: "Налаштування", link: "/test" },
  { name: "Допомога", link: "/test" },
];

export default function Menu() {
  const pathname = usePathname();
  const basePath = pathname
    ? "/" + pathname.split("/")[1] + "/" + pathname.split("/")[2]
    : "";

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Grid container залишається container */}
      <Grid container spacing={2}>
        {menu.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: 192,
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.700" : "grey.200",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.600" : "grey.300",
                },
              }}
            >
              <CardActionArea
                component={Link}
                href={basePath + item.link}
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {item.name}
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
