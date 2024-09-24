'use client';

import Image from 'next/image';
import slide1 from '../../public/images/HS_Dashboard 1.svg';
import slide2 from '../../public/images/SV_Danh sách đề 1.svg';
import slide3 from '../../public/images/GV_Danh sách đề 1.svg';
import slide4 from '../../public/images/SV_Xem chạy từng bước 1.svg';

import Dashboard from '../../public/images/HS_Dashboard 2.svg';
import TheoriesList from '../../public/images/SV_Danh sách đề 1.svg';
import Theory from '../../public/images/SV_Xem đề LT 1.svg';
import Step from '../../public/images/SV_Xem chạy từng bước 2.svg';
import Do from '../../public/images/SV_Xem chạy thủ công 1.svg';
import { Carousel } from '@/components';
import { HomescreenItemDesLeft, HomescreenItemDesRight } from '@/components';

export default function Home() {
  const slides = [
    {
      src: slide1,
      description1: 'Dashboard',
      description2: 'For Student'
    },
    {
      src: slide2,
      description1: 'Essential Theories',
      description2: 'For Student'
    },
    {
      src: slide3,
      description1: 'Exercises Management',
      //description1: "Dashboard",
      description2: 'For Teacher'
    },
    {
      src: slide4,
      description1: 'Step-by-step Exercise',
      //description1: "Dashboard",
      description2: 'For Student'
    }
  ];
  return (
    <main className="">
      <div className="flex h-screen flex-col ">
        {/* Header */}
        <div className="fixed left-0 top-0 z-10 w-full">
          <div className="flex w-full flex-row items-center justify-between border-b-[1px] border-high bg-primary-container">
            {/* Icon & tên app */}
            <div className=" my-2 ml-9 flex flex-row items-center">
              <img
                src="/images/UITTogether.ico"
                alt="favicon"
                className="h-11 w-11 "
              />
              <p className="pl-4 text-base font-semibold text-primary">
                F C V I S U A L I Z E
              </p>
            </div>

            {/* SignIn & SignUp & GetStarted */}
            <div className="mr-5 flex flex-row items-center gap-5">
              <button
                className="bg--primary-container rounded-[10px] px-4 py-2 text-xl text-high
           transition-shadow duration-1000 hover:-translate-y-[3px] hover:bg-primary hover:text-on-primary hover:shadow-lg"
              >
                Sign In
              </button>

              <button
                className="bg--primary-container rounded-[10px] px-4 py-2 text-xl text-high
           transition-shadow duration-1000 hover:-translate-y-[3px] hover:bg-primary hover:text-on-primary hover:shadow-lg"
              >
                Sign Up
              </button>

              <button
                className="rounded-[5px] bg-high px-4 py-2 text-xl text-on-primary
          transition-shadow duration-1000 hover:-translate-y-[3px] hover:bg-primary hover:text-primary-container hover:shadow-lg"
              >
                Get started
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-grow flex-col justify-center">
          {/* 2 Slogan & 2 button  */}
          <div className="flex flex-col items-center">
            <p className="mt-[7%] text-center font-lato text-6xl font-bold text-high 2xl:text-7xl">
              Where study mindset
            </p>
            <p className="mt-4 text-center font-lato text-xl font-semibold text-high xl:mt-6 2xl:text-2xl">
              Learning problem-solving skills through algorithm flowcharts
            </p>
            <div className="mt-8 flex justify-center xl:mt-10">
              <button className="mr-4 rounded-[20px] bg-high px-6 py-3 text-xl font-semibold text-on-primary hover:bg-primary hover:text-primary-container">
                Get started
              </button>
              <button className="rounded-[20px] border border-high bg-on-secondary px-6 py-3 text-xl font-semibold text-primary hover:bg-primary-container">
                See how it works
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="my-6 flex w-full justify-center xl:my-auto">
            <div className="h-72 w-full max-w-[600px] self-center rounded-[5px] bg-primary p-1 xl:h-80 2xl:h-[450px] 2xl:max-w-[950px]">
              <div className="h-full w-full rounded-[5px] bg-outline-var ">
                <Carousel
                  slides={slides}
                  autoSlide={true}
                  autoSlideInterval={5000}
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="w-full border-t border-high" />
        </div>
      </div>

      <HomescreenItemDesRight
        title="Dashboard"
        des="Track learning progress to plan future studies."
        image={Dashboard}
      />

      <HomescreenItemDesLeft
        title="Essential Theories List"
        des="Essential Knowledge, Symbols, and Information Required Prior to Initiating the Learning Process of Algorithm Flowcharts."
        image={TheoriesList}
      />

      <HomescreenItemDesRight
        title="Theory for the problem"
        des="Offering theoretical approaches to problems helps students understand and follow them more easily, while also building problem-solving skills for new challenges."
        image={Theory}
      />

      <HomescreenItemDesLeft
        title="Step by step"
        des="The website provides an algorithm flowchart for the corresponding problem and illustrates the problem by running it step by step."
        image={Step}
      />

      <HomescreenItemDesRight
        title="Do It Yourself."
        des="Additionally, there is a 'do it yourself' feature that encourages students to think through and solve the problem, helping them develop problem-solving skills for future challenges."
        image={Do}
      />
    </main>
  );
}
