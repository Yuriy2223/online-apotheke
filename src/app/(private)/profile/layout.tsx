import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-green-light">
        <Header />
      </header>
      <main className="bg-gray-light">{children}</main>
      <footer className="bg-green-light">
        <Footer />
      </footer>
    </>
  );
}
