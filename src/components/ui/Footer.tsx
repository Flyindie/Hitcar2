import React from 'react'

import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className='bg-white flex justify-center'>
        <div className='grid grid-cols-2 lg:grid-cols-4 lg:max-w-300 max-w-212.5 w-full m-10'>
            <div className='text-[#2F2F2FF0] w-26.25'>
                <h2 className='text-xl font-bold mb-2'>Contact us</h2>
                <p className='text-sm font-normal'>
                    andreas.n@ku.th
                </p>
                <div className='flex justify-between mt-1'>
                    <FaFacebook />
                    <PiInstagramLogoFill />
                    <FaYoutube />
                </div>
            </div>
            <div className='text-[#2F2F2FF0]'>
                <h2 className='text-xl font-bold mb-2'>About</h2>
                <p className='text-sm font-normal w-30.25'>
                    A smart car rental
                    platform designed
                    for convenience, 
                    trust, and flexibility.
                </p>
            </div>
            <div className='text-[#2F2F2FF0]'>
                <h2 className='text-xl font-bold mb-2'>Other services</h2>
                <p className='text-sm font-normal w-30.25'>
                    Nah I’m just kidding
                    we don’t have
                    the other services
                    ha ha ha
                    it’s so funny,
                    isn’t it?
                </p>
            </div>
            <div>
                <h2 className='font-normal text-[#6B7280] text-base mb-2'>Payment Methods</h2>
                <img src="/img/image 16.svg"/>
            </div>
        </div>
    </div>
  )
}

export default Footer