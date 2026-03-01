/** @format */

import { Prisma } from "@g/prisma/client";

export type PostInputType = Prisma.PostCreateInput;

export type PostType = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;
