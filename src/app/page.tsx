import Image from 'next/image';
import Carousel from '@/components/carousel/Carousel';
import HomescreenItem from '@/components/homescreen-item/homescreen-item';
import slide1 from '../../public/images/HS_Dashboard 1.svg';
import slide2 from '../../public/images/SV_Danh sách đề 1.svg';
import slide3 from '../../public/images/GV_Danh sách đề 1.svg';
import slide4 from '../../public/images/SV_Xem chạy từng bước 1.svg';

export default function Home() {
  const slides = [
    {
      src: slide1,
      description1: "Dashboard",
      description2: "For Student",
    },
    {
      src: slide2,
      description1: "Essential Theories",
      description2: "For Student",
    },
    {
      src: slide3,
      description1: "Exercises Management",
      //description1: "Dashboard",
      description2: "For Teacher",
    },
    {
      src: slide4,
      description1: "Step-by-step Exercise",
      //description1: "Dashboard",
      description2: "For Student",
    },
  ]
  return (
    <main className="flex flex-col justify-between h-screen">
      
      {/* Header */}
      <div className="bg-primary-container w-full flex flex-row items-center justify-between">

        {/* Icon & tên app */}
        <div className=" flex flex-row items-center my-2 ml-9">
          <img src="/images/UITTogether.ico" alt="favicon" className="h-11 w-11 " />
          <p className="pl-4 text-primary font-semibold text-base">F C V I S U A L I Z E</p>
        </div>

        {/* SignIn & SignUp & GetStarted */}
        <div className="flex flex-row items-center mr-5 gap-5">
          <button className="rounded-[10px] bg--primary-container text-xl text-high px-4 py-2
           hover:bg-primary hover:text-on-primary hover:shadow-lg hover:-translate-y-[3px] transition-shadow duration-1000">
            Sign In
          </button>

          <button className="rounded-[10px] bg--primary-container text-xl text-high px-4 py-2
           hover:bg-primary hover:text-on-primary hover:shadow-lg hover:-translate-y-[3px] transition-shadow duration-1000">
            Sign Up
          </button>

          <button className="rounded-[5px] bg-high text-xl text-on-primary px-4 py-2
          hover:bg-primary hover:text-primary-container hover:shadow-lg hover:-translate-y-[3px] transition-shadow duration-1000">
            Get started
          </button>
        </div>
      </div>

      {/* 2 Slogan & 2 button  */}
      <div className="flex flex-col items-center">
        <p className="font-lato font-bold text-6xl 2xl:text-7xl text-high mt-9 ">Where study mindset</p>
        <p className="font-lato font-semibold text-xl 2xl:text-2xl text-high mt-4 ">Learning problem-solving skills through algorithm flowcharts</p>
        <div className="mt-8">
          <button className="rounded-[20px] font-semibold bg-high text-xl text-on-primary px-4 py-2 mr-14
          hover:bg-primary hover:text-primary-container">
            Get started
          </button>

          <button className="rounded-[20px] font-semibold bg-on-secondary text-xl text-primary px-4 py-2 border border-high
          hover:bg-primary-container">
            See how it works
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="bg-primary h-full w-1/2 rounded-[5px] p-1 my-6 self-center">
        <div className="bg-outline-var h-full w-full rounded-[5px] ">
          <Carousel slides={slides} autoSlide={true} autoSlideInterval={5000} />
        </div>
      </div>

      {/* Phân trang bằng dấu gạch ngang */}
      <hr className="border-t border-gray-300 w-full py-10" />

      <HomescreenItem />
    </main>
  );
}
