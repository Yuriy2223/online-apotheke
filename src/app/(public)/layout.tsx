import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-green-light">
        <Header />
      </header>
      <main>{children}</main>
      <footer className="bg-green-light">
        <Footer />
      </footer>
    </>
  );
}
