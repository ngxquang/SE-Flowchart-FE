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
                            {/* description */}
                            <div className="w-[30%]">
                                <p className=" text-high text-[40px] 2xl:text-6xl font-bold text-left break-words">{slide.description1}</p>
                                <p className=" text-primary text-[25px] 2xl:text-4xl text-left">{slide.description2}</p>
                            </div>
                            {/* image  */}
                            <Image
                                alt="slider"
                                className="self-center lg:w-[270px] 2xl:w-[450px] ml-7 2xl:ml-11 "
                                src={slide.src}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
