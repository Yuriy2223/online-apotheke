import { Logo } from "@/components/Logo/Logo";
import { Container } from "@/shared/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Container>
          <Logo variant="green" />
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}
