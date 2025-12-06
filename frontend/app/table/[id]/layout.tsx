import { ReactNode } from "react";
import CartProvider from "@/lib/context/ItemContext";
import { use } from "react";
export default function TableLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const tableId = Number(use(params).id);
  console.log(tableId)
  return <CartProvider tID={tableId}>{children}</CartProvider>;
}
