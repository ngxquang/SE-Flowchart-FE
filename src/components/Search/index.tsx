'use client'

import { SearchProps } from '@/types';
import React, { useState } from 'react'

function Search({onSearch}: SearchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    }
    return (
        <div className="relative w-[640px] 2xl:w-[720px] mx-auto">
            <input
                type="text"
                id="table-search"
                className="focus:outline-none block text-[22px] text-on-surface border border-outline-var rounded-[28px] w-full 2xl:h-[74px] h-[64px] placeholder-on-surface placeholder-[22px] pl-5 pr-12"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                <svg className="w-[20px] text-gray-500 h-[20px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
        </div>

    )
}

export default Search