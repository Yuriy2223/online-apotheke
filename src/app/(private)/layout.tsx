import { AppGuard } from "@/providers/AppGuard";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppGuard>{children}</AppGuard>;
}
