import React from 'react'
import { HiMagnifyingGlass } from "react-icons/hi2";

type bookingFilters = {
    bookingFilter:string, 
    setBookingFilter:React.Dispatch<React.SetStateAction<string>>, 
    filterArray:string[]
}

function BookingFilter({bookingFilter, setBookingFilter, filterArray}:bookingFilters) {
    //หน้า ui ตัวกรองสำหรับกรองรายการการจอง
    return (
        <div className='mb-7'>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='text-white text-3xl font-bold'>My Bookings</h1>
                <div className='py-2 border border-solid border-[#F2F5FC] rounded-lg flex items-center text-[#FFFFFFBF]'>
                    <HiMagnifyingGlass className='mx-3'/>
                    <input className='outline-none' type="text" placeholder='Search Bookings'/>
                </div>
            </div>
            <div className='flex items-center py-2 bg-[#F8F3EB] rounded-2xl text-xl font-bold px-5'>
                <button className={`w-full py-2 cursor-pointer rounded-lg 
                    ${bookingFilter === filterArray[0]?'bg-[#A27100] text-white':'hover:bg-[#dfdad2]'}`}
                    onClick={() => setBookingFilter(filterArray[0])}>
                    {filterArray[0]}
                </button>
            <div className='border-l border-solid border-[#6B7280] h-5 mx-5'></div>
                <button className={`w-full py-2 cursor-pointer rounded-lg 
                    ${bookingFilter === filterArray[1]?'bg-[#A27100] text-white':'hover:bg-[#dfdad2]'}`}
                    onClick={() => setBookingFilter(filterArray[1])}>
                    {filterArray[1]}
                </button>
            <div className='border-l border-solid border-[#6B7280] h-5 mx-5'></div>
                <button className={`w-full py-2 cursor-pointer rounded-lg 
                    ${bookingFilter === filterArray[2]?'bg-[#A27100] text-white':'hover:bg-[#dfdad2]'}`}
                    onClick={() => setBookingFilter(filterArray[2])}>
                    {filterArray[2]}
                </button>
            <div className='border-l border-solid border-[#6B7280] h-5 mx-5'></div>
            <button className={`w-full py-2 cursor-pointer rounded-lg 
                ${bookingFilter === filterArray[3]?'bg-[#A27100] text-white':'hover:bg-[#dfdad2]'}`}
                onClick={() => setBookingFilter(filterArray[3])}>
                {filterArray[3]}
            </button>
            </div>
        </div>
    )
}

export default BookingFilter