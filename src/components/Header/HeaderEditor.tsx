import React from 'react'
import Image from 'next/image';
import { HeaderProps } from '@/types';

function HeaderEditor({
    title,
  }: HeaderProps) {
    return (
        <div className="bg-primary w-full flex flex-row items-center justify-between">

            {/* Icon & tên app */}
            <div className="flex flex-row items-center my-2">
                <button className='mx-4 2xl:mx-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" color='white'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <img src="/icons/lab-logo.svg" alt="favicon" className="h-11 w-11 " />
                <p className="pl-4 2xl:pl-7 text-on-primary font-semibold text-base">F C V I S U A L I Z E</p>
            </div>

            <p className='text-on-secondary text-2xl 2xl:text-3xl'>{title}</p>

            {/* icon user */}
            <button className="mr-14 2xl:mr-16">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="size-10 bg-primary-container rounded-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </button>
        </div>
    )
}

export default HeaderEditor;