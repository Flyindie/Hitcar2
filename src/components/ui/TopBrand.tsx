import React from 'react'

import { FaFacebook } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaYoutube } from "react-icons/fa";

function TopBrand() {
    const bmw = '/company/bmw.svg'
    const fort = '/company/fort.svg'
    const honda = '/company/honda.svg'
    const hundai = '/company/hundai.svg'
    const ringLogo = '/company/idk.svg'
    const starLogo = '/company/idk2.svg'
    const isuzu = '/company/isuzu.svg'
    const mazda = '/company/mazda.svg'
    const misu = '/company/misubishi.svg'
    const nisan = '/company/nissan.svg'
    const rolet = '/company/rolet.svg'
    const tesla = '/company/tesla.svg'
    const toyota = '/company/toyota.svg'
    const ww = '/company/ww.svg'

    return (
        <div className='flex flex-col items-center bg-[#F8F3EB]'>
            <h1 className='text-[#2F2F2FF0] font-bold text-5xl pt-15'>Top Brand Services</h1>
            <div className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 items-center justify-items-center border-b pb-15 pt-10'>
                <img src={bmw}/>
                <img src={fort}/>
                <img src={honda}/>
                <img src={hundai}/>
                <img src={ringLogo}/>
                <img src={starLogo}/>
                <img src={isuzu}/>
                <img src={mazda}/>
                <img src={misu}/>
                <img src={nisan}/>
                <img src={rolet}/>
                <img src={tesla}/>
                <img src={toyota}/>
                <img src={ww}/>
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-4 lg:max-w-212.5 max-w-137.5 w-full m-10'>
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

export default TopBrand