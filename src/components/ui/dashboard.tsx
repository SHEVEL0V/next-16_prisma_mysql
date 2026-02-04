/** @format */
"use client";

import React from "react";
import Card from "@mui/material/Card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Typography, CardActionArea, Box } from "@mui/material";

interface MenuProps {
  menu: {
    name: string;
    link: string;
  }[];
}

export default function Dashboard({ menu }: MenuProps) {
  const pathname = usePathname();
  const basePath = pathname
    ? "/" + pathname.split("/")[1] + "/" + pathname.split("/")[2]
    : "";

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2} columns={16} alignItems="stretch">
        {menu.map((item, i) => (
          <Grid size={{ xs: 16, sm: 8, md: 4 }} key={i} sx={{ display: "flex" }}>
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: 200,
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  boxShadow: 6, // Тінь при наведенні (стандартний ефект MUI)
                  borderColor: "primary.main", // Підсвітка рамки
                },
              }}
            >
              <CardActionArea
                component={Link}
                href={`${basePath}${item.link}`}
                sx={{
                  height: "100%", // Розтягує клік на всю висоту
                  display: "flex",
                  alignItems: "center", // Центрування по вертикалі
                  justifyContent: "center", // Центрування по горизонталі
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="text.primary"
                  sx={{ fontWeight: "medium" }}
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
