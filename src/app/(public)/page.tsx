"use client";

import Image from "next/image";
import { Container } from "@/shared/Container";

const HomePage = () => {
  return (
    <>
      <section className="bg-green-light h-[600px] sm:h-[700px] md:h-[800px]">
        <Container>
          <Image
            src="/images/hero.webp"
            alt="Description"
            width={750}
            height={508}
            sizes="(max-width: 375px) 330px, (max-width: 768px) 704px, 750px"
            className="w-full max-w-[749px] h-auto"
          />
        </Container>
      </section>
    </>
  );
};

export default HomePage;
