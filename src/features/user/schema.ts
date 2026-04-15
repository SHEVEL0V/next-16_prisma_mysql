/** @format */

import { z } from "zod";

export const updateProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(3, "Ім'я занадто коротке"),
  position: z.string().trim().min(2, "Посада має бути не менше 2 символів").max(50, "Надто довге повідомлення"),
  bio: z.string().max(500, "Довжина біографії не може перевищувати 500 символів").optional().or(z.literal('')),
  image: z.string().url("Некоректний URL").optional().or(z.literal('')),
});
