import { Logo } from "@/components/Logo/Logo";
import { Container } from "@/shared/Container";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-green-light flex items-center justify-between">
        <Container>
          <Logo variant="white" />
        </Container>
      </header>
      <main>{children}</main>
      <footer className="bg-green-light">
        <Container>
          <Logo variant="white" />
        </Container>
      </footer>
    </>
  );
}
