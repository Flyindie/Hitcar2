'use client'
import React, { useContext, useEffect, useState } from 'react'
import { PiCarFill } from "react-icons/pi";
import { Mycontext } from '@/components/MyProvider';
import { useRouter } from 'next/navigation';
import axios from 'axios';


type cardInfo = {
  bookingID:number
  bookingDate:Date
  bookingStatus:string
  airport:string
  price:number
  pickupDate:Date
  dropoffDate:Date
  picupAddress:string
  dropoffAddress:string
  renter:string
  paymentID:number
  setBookingFilter:React.Dispatch<React.SetStateAction<string>>
  bookingFilter: string
}

export default function BookingCard(
  {
    bookingID, 
    bookingDate, 
    bookingStatus, 
    airport, 
    price, 
    pickupDate, 
    dropoffDate, 
    picupAddress, 
    dropoffAddress, 
    renter,
    setBookingFilter,
    bookingFilter
  }:cardInfo) {

    const router = useRouter()
    const context = useContext(Mycontext)

    //เก็บสีสถานะการจอง
    const [bookingColor, setBookColor] = useState<string>()

    useEffect(() => {
      renderColer() 
    },[bookingFilter, bookingStatus])

    //ปุ่มยกเลิกการจอง
    async function cancelBooking(){
      try{
        await axios.patch('/api/booking/payment/cancel',{
          bookingId:bookingID
        })
        setBookingFilter('Canceled')
      }
      catch(error){
        alert("Cannot connect to server.")
      }
    }

    //เปลี่ยนสี ui
    function renderColer(){
      if(bookingStatus === 'Awaiting Payment')
        setBookColor('#FFFFFF4D')
      else if(bookingStatus === 'Completed')
        setBookColor('#42bd41')
      else 
        setBookColor('#ff5722')
    }

    //ไปหน้าชำระเงิน
    function gotoPaying(){
      context?.setBookingID(bookingID)
      router.push('/booking/payment')
    }
  
    return (
      <div className='border-[1.5px] border-solid border-[#FFFFFF66] rounded-2xl backdrop-blur-xl text-white mb-3'>
        <div className='flex justify-between items-center mx-5 py-5 border-b border-solid border-white'>
          <div className='flex items-center'>
            <PiCarFill className='text-2xl'/>
            <p className='ml-3.5'>Booking No.</p>
            <span className='underline ml-1'>{bookingID}</span>
            <img className='mx-2' src="/symbol/clipBoard.svg"/>
            <p className='pl-3 border-l border-solid border-white'>Booking Date: {bookingDate.toLocaleDateString()}</p>
          </div>
          <div className={`border border-solid rounded-2xl px-3 py-1 font-semibold`}
            style={{borderColor: bookingColor}}>
            <span style={{color: bookingColor}}>{bookingStatus}</span>
          </div>
        </div>
        <div className='flex justify-between mx-5 my-3'>
          <h2 className='text-2xl font-bold'>{airport}</h2>
          <h2 className='text-2xl font-bold'>THB {price}</h2>
        </div>
        <div className='mx-5 border border-solid border-[#FFFFFF66] rounded-2xl grid grid-cols-3 gap-5 px-3 py-5 mb-5'>
          <div>
            <span className='text-sm font-semibold'>Pick-up Date</span>
            <p className='text-xs text-[#FFFFFFCC]'>{pickupDate.toLocaleDateString()}</p>
          </div>
          <div>
            <span className='text-sm font-semibold'>Pick-up Address</span>
            <p className='text-xs text-[#FFFFFFCC]'>{picupAddress}</p>
          </div>
          <div>
            <span className='text-sm font-semibold'>Renter</span>
            <p className='text-xs text-[#FFFFFFCC]'>{renter}</p>
          </div>
          <div>
            <span className='text-sm font-semibold'>Drop-off Date</span>
            <p className='text-xs text-[#FFFFFFCC]'>{dropoffDate.toLocaleDateString()}</p>
          </div>
          <div>
            <span className='text-sm font-semibold'>Drop-off Address</span>
            <p className='text-xs text-[#FFFFFFCC]'>{dropoffAddress}</p>
          </div>
        </div>
        {bookingColor === '#FFFFFF4D' && <div className='text-[#A27100] flex items-center justify-end'>
          <button className='bg-[#F8F3EB] px-3 py-2 rounded-xl mb-3 cursor-pointer' onClick={() => cancelBooking()}>
            Cancel
          </button>
          <button className='bg-[#F8F3EB] px-3 py-2 rounded-xl mx-5 mb-3 cursor-pointer' onClick={() => gotoPaying()}>
            Pay Now
          </button>
        </div>}
    </div>
    )
}