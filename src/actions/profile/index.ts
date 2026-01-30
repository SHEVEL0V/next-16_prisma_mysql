/** @format */

import prisma from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { userId } from "../cookies";
import { revalidatePath } from "next/cache";
import { FormServerAction } from "@/types";

export const getAllPost = async () => await prisma.profile.findMany();
