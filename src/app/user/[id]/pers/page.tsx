/** @format */

import { actionPost } from "@/actions/post";
import { Grid } from "@/components/ui/grid";

export default async function Pers() {
  const posts = await actionPost.getAllPost();

  return <Grid data={posts} />;
}
