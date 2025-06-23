import { Logo } from "@/components/Logo/Logo";
import { Container } from "@/shared/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-gray-light ">
        <Container className="flex items-center justify-start sm:h-[84px] md:h-[100px]">
          <Logo variant="green" />
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}
