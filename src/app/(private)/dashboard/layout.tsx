import { HeaderDashboard } from "@/components/Header/HeaderDashboard";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-green-light">
        <HeaderDashboard />
      </header>
      <main>{children}</main>
    </>
  );
}
