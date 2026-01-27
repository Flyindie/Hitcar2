'use client'
import React, { useContext } from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";
import Navbar from "@/components/ui/navbars/Navbar";
import SearchCar from '@/components/ui/SearchCar';
import Link from 'next/link';
import { Mycontext } from "@/components/MyProvider";

export default function chooseCar() {
    
    const carLogo:string = '/symbol/Car-front.svg'
    const Form = useContext(Mycontext)

    //วาง nevbar แสดงข้อมูลด้านบน และวาง SearchCar
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 z-2 w-full">
                <Navbar/>
            </div>
            <img className='w-full object-cover max-h-72' src="/img/Car_bg2.svg"/>
            <div className='absolute top-5 left-0 z-1 w-full'>
                <div className='rounded-2xl border border-white/40 backdrop-blur-xl m-20'>
                    <div className='flex justify-items-center items-center gap-5 mx-5 my-6'>
                        <div className="border border-white/40 rounded-2xl px-6 pb-2 pt-1 w-10/12">
                            <div className="flex mb-1">
                                <img src={carLogo}/>
                                <p className="ml-2 text-[#D9D9D9]/40 text-xs font-medium">Pick-up Location</p>
                            </div>
                            <p className='text-[#D9D9D9] text-base'>{Form?.SearchForm?.location}</p>
                        </div>
                        <div className="border border-white/40 rounded-2xl px-6 pb-2 pt-1 w-55 text-white">
                            <div className="flex mb-2">
                                <FaCalendarAlt className='w-2.5'/>
                                <label className="ml-2 text-[#D9D9D9]/40 text-xs font-medium">Pick-up Time</label>
                            </div>
                            <div className="flex items-center">
                                <p className='w-20 text-sm'>
                                    {Form?.SearchForm?.startDate && `${Form?.SearchForm?.startDate.toLocaleDateString()}`}
                                </p>
                                <p className='outline-none border-l-2 border-[#FFFFFFA6] pl-3 ml-3 flex items-center cursor-pointer h-4 text-sm'>
                                    {Form?.SearchForm?.picTime}
                                </p>
                            </div>
                        </div>
                        <div className="border border-white/40 rounded-2xl px-6 pb-2 pt-1 w-55 text-white">
                            <div className="flex mb-2">
                                <FaCalendarAlt className='w-2.5'/>
                                <label className="ml-2 text-[#D9D9D9]/40 text-xs font-medium">Drop-off Time</label>
                            </div>
                            <div className="flex items-center">
                                <p className='w-20 text-sm'>
                                    {Form?.SearchForm?.stopDate && `${Form?.SearchForm?.stopDate.toLocaleDateString()}`}
                                </p>
                                <p className='outline-none border-l-2 border-[#FFFFFFA6] pl-3 ml-3 flex items-center cursor-pointer h-4 text-sm'>
                                    {Form?.SearchForm?.dropTime}
                                </p>
                            </div>
                        </div>
                        <Link href={"/"}>
                            <div className=' bg-white hover:bg-[#A27100] text-[#A27100] hover:text-white rounded-2xl h-16 w-36 flex items-center justify-center transition-all duration-300 ease-in-out'>
                                <FaArrowLeft />
                                <span>Back</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <SearchCar/>
            </div>
        </div>
    )
}


/*<div className='text-white flex items-center pl-5 py-3'>
                        <span className='text-white/75 text-[15px]'>Driver's license issuing country/region</span>
                        <PiWarningCircleFill className='text-white/75'/>
                        <span className='ml-3 pl-5'>Thailand</span>
                        <span className='text-[15px] pl-5 text-white/75'>Driver’s  Age</span>
                        <span className='pl-5'>20-30</span>
                    </div> */
