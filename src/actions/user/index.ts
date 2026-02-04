/** @format */

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, deleteSession, getSession } from "@/lib/session";
import prisma from "../../lib/prisma";

export async function actionLoginUser(
  prevState: { message: string },
  formData: FormData,
) {
  const email = formData.get("email");
  const password = formData.get("password");

  // call to db to find user
  const user = await prisma.user.findUnique({
    where: {
      email: email as string,
      password: password as string,
    },
  });

  if (user) {
    await createSession(user);
    console.log("🔑 User logged in:", user.name);
    revalidatePath("/");
    redirect("/user/" + user.name + "/menu");
  }
  console.log("❌ Login failed for email:", email);
  return { message: "🔒 Please enter a valid email and password" };
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function changeTheme() {
  await prisma.user.update({
    where: { id: (await getSession())?.id },
    data: {
      theme: {
        set: (await getSession())?.theme === "DARK" ? "LIGHT" : "DARK",
      },
    },
  });
  revalidatePath("/");
}
