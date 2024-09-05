import Image from 'next/image';
import React from 'react';

const Preview = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl">
      <div className="flex items-center  justify-center bg-primary-container px-3 py-2">
        <div className="flex size-6 justify-center rounded-full border border-primary ">
          <Image
            alt="dropdown-icon"
            src={'/icons/up.svg'}
            width={10}
            height={5}
            className="select-none"
          />
        </div>
      </div>
      <div className="flex-grow">
        <p className="font-roboto_slab">157 bài học</p>
      </div>
      <footer className="flex w-full flex-row-reverse bg-primary-container px-5 py-3">
        <div className="flex flex-row rounded-full bg-secondary px-4 py-2 text-on-secondary shadow-lg ">
          <span className="mr-3 font-medium">Chạy từng bước</span>
          <Image
            alt="dropdown-icon"
            src={'/icons/arrow-right.svg'}
            color="white"
            width={20}
            height={20}
          />
        </div>
      </footer>
    </div>
  );
};

export default Preview;
