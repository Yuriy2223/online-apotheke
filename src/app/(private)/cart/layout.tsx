import { Logo } from "@/components/Logo/Logo";
import { Container } from "@/shared/Container";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Container className="flex items-center justify-between sm:h-[84px] md:h-[100px]">
          <Logo variant="green" />
        </Container>
      </header>
      <main>{children}</main>
      <footer>
        <Container>
          <Logo variant="green" />
        </Container>
      </footer>
    </>
  );
}
