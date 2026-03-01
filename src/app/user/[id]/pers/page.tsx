/** @format */

import { Grid } from "@/components/ui/grid";
import { getPosts } from "@/features/post/queries";

export default async function Pers() {
  const posts = (await getPosts())?.data || [];

  return <Grid data={posts} />;
}
