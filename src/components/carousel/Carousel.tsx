"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

interface SlideProps {
    src: string;
    description1: string;
    description2: string;
}

interface CarouselProps {
    slides: SlideProps[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
}

export default function Carousel({
    slides,
    autoSlide = false,
    autoSlideInterval = 3000,
}: CarouselProps) {
    const [curr, setCurr] = useState(0);

    const prev = () =>
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () =>
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval]);

    return (
        <div className="overflow-hidden relative h-full w-full bg-white rounded-[20px]">

            <div className="absolute inset-0 flex items-center p-4">
                <div
                    className="flex transition-transform ease-out duration-500 "
                    style={{ transform: `translateX(-${curr * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full flex flex-row flex-shrink-0 items-center">
                            <div className="w-[30%]">
                                <p className=" text-high text-[40px] 2xl:text-6xl font-bold text-left break-words">{slide.description1}</p>
                                <p className=" text-primary text-[25px] 2xl:text-4xl text-left">{slide.description2}</p>
                            </div>
                            <Image
                                alt="slider"
                                className="self-center w-[350px] 2xl:w-[450px] ml-7 2xl:ml-11 "
                                src={slide.src}
                            //  width={400}
                            // //  height={300}
                            />
                        </div>
                    ))}
                </div>
                {/* <button
                    type="button"
                    className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-prev
                    onClick={prev}
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-[#6B7E84] dark:bg-gray-800/30 group-hover:bg-[#6B7E84]/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                        <span className="hidden">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-next
                    onClick={next}
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-[#6B7E84] dark:bg-gray-800/30 group-hover:bg-[#6B7E84]/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                        <span className="hidden">Next</span>
                    </span>
                </button> */}
            </div>
        </div>
    );
}
