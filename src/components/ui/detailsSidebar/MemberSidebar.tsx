'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function MemberSidebar(){
  const accountImg:string = '/symbol/Member.svg'
  const thisPage:string = usePathname()

  const bookingPage:string = '/details/member/booking'
  const accountPage:string = '/details/member/account'

  return (
    <div className='text-[#2F2F2F] md:h-screen'>
        <div className='flex items-center bg-[#F8F3EB] rounded-2xl h-15 mb-5'>
          <img className='mx-5' src={accountImg}/>
          <h1>Member</h1>
        </div>
        <div className='bg-[#F8F3EB] rounded-2xl flex flex-col font-semibold text-xl px-5 py-1'>
          <Link href={bookingPage}>
            <button className={`w-full flex my-2 cursor-pointer ${thisPage === bookingPage?'pl-2 text-[#A27100] border-l-4 border-solid border-[#A27100]':''}`}
              >My Bookings
            </button>
          </Link>
          <div className='border-b border-solid border-[#D9D9D9]'></div>
          <Link href={accountPage}>
            <button className={`w-full flex my-2 cursor-pointer ${thisPage === accountPage?'pl-2 text-[#A27100] border-l-4 border-solid border-[#A27100]':''}`}
              >Account
            </button>
          </Link>
        </div>
    </div>
  )
}