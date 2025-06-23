"use client";

import Image from "next/image";
import { Container } from "@/shared/Container";

const HomePage = () => {
  return (
    <>
      <section className="bg-green-light h-[600px] tablet:h-[700px] desctop:h-[800px] flex justify-center items-center">
        <Container className="relative">
          <Image
            src="/images/hero.webp"
            alt="Description"
            width={750}
            height={508}
            sizes="(max-width: 375px) 330px, (max-width: 768px) 704px, 750px"
            className="w-full max-w-[750px] h-auto"
            priority // ✅ важливо пріорететне завантаження!
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
            <div className="pt-[19px] tablet:pt-[140px] tablet:pl-[31px] tablet:pr-[83px] bg-img h-[312px] w-[331px] max-tablet:w-[280px] tablet:h-[508px] tablet:w-auto lg:w-[749px] mx-auto">
              <h1 className="w-[293px] tablet:w-[609px] font-semibold text-[50px] tablet:text-[74px] leading-[1] text-white-true mb-[20px] tablet:mb-[24px]">
                Your medication delivered
              </h1>
              <p className="w-[156px] tablet:w-[207px] font-normal text-[12px] tablet:text-[16px] leading-[1.25] text-white-true ml-auto">
                Say goodbye to all your healthcare worries with us
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
