import { AdminLayout } from "./components/AdminLayout";

export default function CateogryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}
