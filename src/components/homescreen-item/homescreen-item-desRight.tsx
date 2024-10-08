import React from 'react';
import Image from 'next/image';
import { HomeScreenItemsProps } from '@/types';

function HomescreenItemDesRight({
  title,
  des,
  image,
}: HomeScreenItemsProps) {
  return (
    <div className="flex h-screen flex-col bg-primary-container">
      {/* title  */}
      <div className=" my-16 text-center text-4xl font-bold text-high 2xl:my-20 2xl:text-6xl">
        {title}
      </div>

      {/* image & description */}
      <div className=" mx-16 2xl:mx-20 mb-auto flex flex-row justify-around ">
        <Image
          alt="slider"
          className=" w-[50%] self-center "
          src={image}
        />
        <div className='ml-10 content-center w-full'>
          <p className=" pl-12 text-3xl 2xl:text-5xl text-primary2">
            {des}
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full border-t border-high" />
    </div>
  );
}

export default HomescreenItemDesRight;
