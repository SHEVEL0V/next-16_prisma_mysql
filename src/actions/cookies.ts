/** @format */
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export const userId = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  const user = await decrypt(session);

  if (!user?.id) {
    throw new Error("Користувач не авторизований");
  }

  return user?.id;
};
