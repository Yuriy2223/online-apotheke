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
        <Container className="flex items-center justify-start max-tablet:h-[84px] tablet:h-[100px]">
          <Logo variant="green" />
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}
