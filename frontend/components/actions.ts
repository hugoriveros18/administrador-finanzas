"use server";

import { revalidatePath } from "next/cache";

type LayoutInput = "page" | "layout";

interface RevalidateProps {
  path: string;
  layout?: LayoutInput;
}

export async function revalidatePathData({
  path,
  layout = "page",
}: RevalidateProps) {
  await revalidatePath(path, layout);
}
