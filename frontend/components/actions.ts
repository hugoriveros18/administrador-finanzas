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

export async function revalidateAllPathsData() {
  await revalidatePath("/");
  await revalidatePath("/cuentas");
  await revalidatePath("/categorias");
  await revalidatePath("/transacciones");
  await revalidatePath("/movimientos");
}

export async function revalidateInterestPathsData() {
  await revalidatePath("/");
  await revalidatePath("/cuentas");
}
