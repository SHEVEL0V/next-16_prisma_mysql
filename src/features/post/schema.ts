/** @format */
import { z } from "zod";

import { PostInputType } from "./types";

export const postSchema: z.ZodType<Omit<PostInputType, "author">> = z.object({
  surname: z.string().trim().min(1, "Прізвище обов'язкове"),
  name: z.string().trim().min(1, "Ім'я обов'язкове"),
  rank: z.string().trim().min(1, "Звання обов'язкове"),
  unit: z.string().trim().min(1, "Підрозділ обов'язковий"),
  mos: z.string().trim().min(1, "MOS обов'язковий"),
  dateOfBirth: z.string().trim().min(1, "Дата народження обов'язкова"),
  bloodType: z.string().trim().min(1, "Група крові обов'язкова"),
  status: z.string().trim().min(1, "Статус обов'язковий"),
  equipment: z.string().trim().min(1, "Обладнання обов'язкове"),
});

export type PostInput = z.infer<typeof postSchema>;
