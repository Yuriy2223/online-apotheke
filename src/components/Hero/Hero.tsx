"use client";

import Image from "next/image";
import { Container } from "@/shared/Container";

export const Hero = () => {
  return (
    <section
      className="bg-green-light h-[400px] tablet:h-[700px] desctop:h-[800px]
     flex justify-center items-center"
    >
      <Container className="relative">
        <Image
          src="/images/hero.webp"
          alt="Description"
          width={750}
          height={508}
          sizes="(max-width: 375px) 330px, (max-width: 768px) 704px, 750px"
          className="w-full max-w-[750px] h-auto  mx-auto"
          priority
        />
        <div
          className="absolute top-0 left-0 w-full h-full 
        flex flex-col justify-center items-center"
        >
          <div
            className="pt-[20px] tablet:pt-[140px] tablet:pl-[32px] 
          tablet:pr-[83px] bg-img h-[312px] w-[330px] max-tablet:w-[280px]
          tablet:h-[508px] tablet:w-auto lg:w-[750px] mx-auto"
          >
            <h1
              className="w-[292px] tablet:w-[600px] font-semibold text-[50px]
             tablet:text-[74px] leading-[1] text-white-true mb-[20px] tablet:mb-[24px]"
            >
              Your medication delivered
            </h1>
            <p
              className="w-[150px] tablet:w-[200px] font-normal text-[12px] 
            tablet:text-[16px] leading-[1.25] text-white-true ml-auto"
            >
              Say goodbye to all your healthcare worries with us
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
