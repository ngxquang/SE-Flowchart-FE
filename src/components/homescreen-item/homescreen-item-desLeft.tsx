import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { HomeScreenItemsProps } from '@/types';

function HomescreenItemDesLeft({ title, des, image }: HomeScreenItemsProps) {
  return (
    <div className="flex h-screen flex-col bg-outline-var">
      {/* title */}
      <div className="my-16 text-center text-4xl font-bold text-high 2xl:my-20 2xl:text-6xl">
        {title}
      </div>

      {/* image & description */}
      <div className="mx-16 mb-auto flex flex-row justify-around 2xl:mx-20">
        <div className="mr-10 w-1/2 content-center">
          <p className="pr-12 text-3xl text-primary 2xl:text-5xl">{des}</p>
        </div>
        <Image alt="slider" className="w-[50%] self-center" src={image} />
      </div>

      {/* Divider */}
      <hr className="w-full border-t border-high" />
    </div>
  );
}

export default HomescreenItemDesLeft;
