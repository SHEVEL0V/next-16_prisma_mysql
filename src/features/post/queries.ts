/** @format */
"use server";
import { cache } from "react";
import { safeQuery } from "@/utils/wrapperQuery";
import { postService } from "./services";

export const getPosts = cache(() => safeQuery(postService.get));
