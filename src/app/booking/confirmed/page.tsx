'use client'
import StateNavbar from '@/components/ui/navbars/StateNavbar'
import React, { useContext, useEffect, useState } from 'react'
import { FaCopy } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaCaretRight } from "react-icons/fa";
import { Mycontext } from '@/components/MyProvider';
import Link from 'next/link';
import axios from 'axios';

enum BookingStatus {
  Completed = 'Completed',
  Canceled = 'Canceled',
  Awaiting = 'Awaiting'
}
enum PaymentMethod {
  Card,
  Bank,
  Qr
}
enum Gear {
  Manual,
  Automatic
}
enum Energy {
  Fuel,
  Hybrid,
  Electric
}
enum Status {
  ACTIVE,
  INACTIVE,
  BANNED
}

type Driver = {
  driver_id:number
  created_at:Date
  name:string
  surname:String
  age:number
  email:string
  phone:string
  flight_number:string
}
type Pd = {
  pd_id:number
  pickup_date:Date
  dropoff_date:Date
  total_day:number

  airport:Airport
}

type Payment = {
  payment_id:number
  created_at:Date
  payment_method:PaymentMethod
  total_price:number
}
type Airport = {
  id:number
  region:string
  name:string
  city:string
  states:string
  country:string
  business_hour:string
}

type vehicle = {
    vehicle_id:number
    brand:string
    model:string
    segment:string
    seats:number
    baggage:number
    door:number
    gear: Gear
    energy: Energy
    price_per_day:number
    image_link:string
    status: Status
}

type bookingInfo = {
  booking_id:number
  created_at:Date
  status:BookingStatus
  user_id:number
  vehicle_id:number
  driver:Driver
  payment:Payment
  pd:Pd
  vehicle:vehicle
}

export default function page() {
    const backGround = '/img/Car_bg3.svg'

    const context = useContext(Mycontext)
    const [bookingInfo, setBookingInfo] = useState<bookingInfo>()

    const [picupTime, setPicupTime] = useState<string>()
    const [dropOffTime, setDropOffTime] = useState<string>()

    const [picupDate, setPicupDate] = useState<Date>()
    const [dropOffDate, setDropOffDate] = useState<Date>()

    //รับข้อมูลการจองทั้งหมด
    async function readBookingInfo(){
        try{
            const res = await axios.get('/api/booking/info',{
                params:{
                    bookingId:context?.bookingID
                }
            })
            setBookingInfo(res.data)
        }
        catch(error){
            alert('Cannot connect to server.')
        }
    }

    useEffect(() =>{
        readBookingInfo()
    },[])

    //จัดรูปข้อมูลวันที่และเวลาเพื่อเตรียมใช้แสดงผล
    useEffect(() =>{
        setPicupDate(new Date(bookingInfo?.pd.pickup_date || 0))
        setDropOffDate(new Date(bookingInfo?.pd.dropoff_date || 0))

        setPicupTime(
            picupDate?.toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })
        )
        setDropOffTime(
            dropOffDate?.toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })
        )
    },[bookingInfo])

    return (
        <div className=' relative'>
            <img className='w-full h-17 object-cover' src={backGround} alt="" />
            <div className='absolute top-0'><StateNavbar page={4}/></div>
            <div className='bg-[#F8F3EB] text-[#2F2F2F] grid grid-cols-[4fr_2fr] gap-5 px-30 xl:px-50 2xl:px-70 pt-7 pb-20'>
                <div>
                    <div className='bg-white rounded-2xl pl-6 pt-3 pb-6'>
                        <h1 className='font-bold text-2xl mb-1'>Booking Confirmed</h1>
                        <p>Your booking has been successfully completed. Thank you for using HitCar.com</p>
                        <div className='flex items-center mt-1.5'>
                            <span className='text-[#6B7280]'>Booking no.</span>
                            <span className='ml-1'>{bookingInfo?.booking_id}</span>
                            <FaCopy className='text-[#A27100] text-sm ml-2'/>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl mb-3 mt-3'>
                        <div className='flex items-center pl-5 pt-4'>
                            <span className='bg-[#F7EFC9] rounded font-normal text-base'>{bookingInfo?.vehicle.segment}</span>
                            <span className='text-lg font-bold ml-2'>{bookingInfo?.vehicle.model}</span>
                            <RiErrorWarningLine className='text-xs text-[#6B7280] ml-2'/>
                        </div>
                        <div className='flex items-center pl-5'>
                            <img className='h-25 w-37' src={bookingInfo?.vehicle.image_link}/>
                            <div className='flex items-center pl-6'>
                                <div className='flex items-center'>
                                    <img src="/symbol/car-info/WheelChair.svg"/>
                                    <span className='ml-3 mr-5'>{bookingInfo?.vehicle.seats}</span>
                                </div>
                                <div className='flex items-center'>
                                    <img src="/symbol/car-info/Bag.svg"/>
                                    <span className='ml-3 mr-5'>{bookingInfo?.vehicle.baggage}</span>
                                </div>
                                <div className='flex items-center'>
                                    <img src="/symbol/car-info/Door.svg"/>
                                    <span className='ml-3 mr-5'>{bookingInfo?.vehicle.door}</span>
                                </div>
                                <div className='flex items-center'>
                                    <img src="/symbol/car-info/Gear.svg"/>
                                    <span className='ml-3 mr-5'>{bookingInfo?.vehicle.gear}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl mb-3 mt-3 px-5 pt-4 pb-5'>
                        <div className='flex justify-between items-center border-b border-solid border-[#F8F3EB] pb-3'>
                            <div>
                                <p className='text-[#6B7280]'>Pick-up (branch's local time)</p>
                                <h3 className='text-xl font-semibold'>{picupDate?.toDateString()} {picupTime}</h3>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-[#2F2F2FCC]'>{bookingInfo?.pd.total_day} days</p>
                                <img src="/symbol/half arrow.svg"/>
                            </div>
                            <div className='flex flex-col items-end'>
                                <p className='text-[#6B7280]'>Drop-off (branch's local time)</p>
                                <h3 className='text-xl font-semibold'>{dropOffDate?.toDateString()} {dropOffTime}</h3>
                            </div>
                        </div>
                        <div className='flex items-center mt-3'>
                            <img src="/symbol/location.svg"/>
                            <p className='font-semibold ml-2'>Pick-up & drop-off locations</p>
                            <p className='text-[#6B7280] text-sm ml-6'>{bookingInfo?.pd.airport.name}</p>
                        </div>
                        <div className='flex items-center mt-1'>
                            <p className='font-semibold'>Getting there</p>
                            <p className='text-[#6B7280] text-sm ml-6'>Near the airport, free shuttle bus</p>
                        </div>
                        <div className='flex items-center mt-1'>
                            <p className='font-semibold'>Business Hours</p>
                            <p className='text-[#6B7280] text-sm ml-6'>{bookingInfo?.pd.airport.business_hour}</p>
                        </div>
                        <div className='flex items-center mt-1 text-xs text-[#A27100]'>
                            <p>If your flight is delayed, your car will be held until 12:00 on the day of pick-up</p>
                            <FaCaretRight />
                        </div>
                    </div>
                    <div className='bg-white rounded-xl mb-3 mt-3 px-5 pt-4 pb-5'>
                        <h2 className='text-2xl font-semibold'>Booking details</h2>
                        <div className='grid grid-cols-2 max-w-150 w-full gap-1'>
                            <div className='flex items-center text-sm'>
                                <span className='text-[#6B7280]'>Driver’s name</span>
                                <p className='font-semibold ml-2'>{bookingInfo?.driver.name}</p>
                            </div>
                            <div className='flex items-center text-sm'>
                                <span className='text-[#6B7280]'>Email</span>
                                <p className='font-semibold ml-2'>{bookingInfo?.driver.email}</p>
                            </div>
                            <div className='flex items-center text-sm'>
                                <span className='text-[#6B7280]'>Mobile phone number</span>
                                <p className='font-semibold ml-2'>{bookingInfo?.driver.phone}</p>
                            </div>
                        </div>
                    </div>
                    <Link className='text-white font-bold text-xl' href={'/'}>
                        <div className='bg-[#A27100] rounded-2xl h-14 w-full flex items-center justify-center'>Back to first page</div>
                    </Link>
                </div>
                <div className='bg-white rounded-xl mb-3 px-5 pt-4 pb-5 h-fit'>
                    <div className='flex justify-between border-b border-dashed border-[#D9D9D9] pb-2'>
                        <h2 className='font-bold text-xl'>Total</h2>
                        <div className='flex flex-col items-end'>
                            <h2 className='font-medium text-xl'>THB {bookingInfo?.payment.total_price}</h2>
                            <div>
                                <span className='text-sm'>Prepay online</span>
                                <span className='text-sm ml-2'>THB {bookingInfo?.payment.total_price}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-2'>
                        <h3 className='text-sm font-semibold'>Car rental fee</h3>
                        <div className='flex flex-col items-end'>
                            <h3 className='text-sm'>THB {bookingInfo?.payment.total_price}</h3>
                            <p className='text-xs'>Approx. THB {((bookingInfo?.payment.total_price || 0) / (bookingInfo?.pd.total_day || 0))}×{bookingInfo?.pd.total_day} days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}