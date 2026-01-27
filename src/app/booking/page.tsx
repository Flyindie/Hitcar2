'use client'
import React, { useContext, useEffect, useState } from 'react'
import { RiErrorWarningLine } from "react-icons/ri";
import { SiGooglemaps } from "react-icons/si";
import { LuClock4 } from "react-icons/lu";
import { PiWarningCircleLight } from "react-icons/pi";
import { FaCaretRight } from "react-icons/fa";
import Link from 'next/link';
import { LuPencil } from "react-icons/lu";
import StateNavbar from "@/components/ui/navbars/StateNavbar";
import { Mycontext } from '@/components/MyProvider';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function page() {
  //ดึงข้อมูลจาก context ทั้ง form ที่กรอกในหน้าแรก รถที่เลือก และข้อมูลผู้ใช้
  const context = useContext(Mycontext)
  const car = context?.vehicle
  const forms = context?.SearchForm
  const user = context?.account
  const router = useRouter()

  const bg:string = '/img/Car_bg3.svg'

  //เก็บข้อมูลคนขับรถ
  const [driverName ,setName] = useState<string>()
  const [driverSurname ,setSurname] = useState<string>()
  const [driverAge ,setDriverAge] = useState<number>()
  const [driverEmail, setDriverEmail] = useState<string>()
  const [driverPhone, setDriverPhone] = useState<string>()
  const [driverFlight, setDriverFlight] = useState<string>()

  //เก็บข้อมูลสนามบิน
  const [businessHour, setBusinessHour] = useState<string>('')
  const [airportID, setAirportID] = useState<number>()

  //จำนวนวันที่จอง
  const [bookingDay, setBookingDay] = useState<number>(0)

  //ถ้าเป็น True จะแสดงข้อทั้งหมด ถ้าไม่จะไม่แสดงไรเลย
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    //ดูว่ามีข้อมูลรถมั้ย
    const carPrice:number = car?.price_per_day || -1
    if(carPrice !== -1){
      setVisible(true)

      //ดึงข้อมูลสนามบิน
      const getAirportInfo = async () => {
        const res = await axios.get("/api/airport/hour",{params:{name:forms?.location}})
        setBusinessHour(res.data.business_hour)
        setAirportID(res.data.id)
      }

      getAirportInfo()
      
      //คำนวนจำนวนวัน
      const startDate:Date = forms?.startDate || new Date;
      const stopDate:Date = forms?.stopDate || new Date;
      
      const oneDay = 24 * 60 * 60 * 1000;
      const diffMs = Math.abs(startDate.getTime() -  stopDate.getTime());
      setBookingDay(Math.ceil(diffMs / oneDay) || 1)
    }
    else{
      setVisible(false)
    }
  },[])

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    try{
      //บันทึกข้อมูลการจอง
      const res = await axios.post('/api/booking',{
        user_id: user?.id, 
        vehicle_id: car?.vehicle_id, 
        airport_id: airportID, 
        pickup_time: forms?.picTime, 
        dropoff_time: forms?.dropTime, 
        start_date: forms?.startDate, 
        stop_date: forms?.stopDate,
        driverName,
        driverSurname,
        driverAge,
        driverEmail,
        driverPhone,
        driverFlight
      })

      //เก็บ bookingID
      context?.setBookingID(res.data.bookingID)
      router.push('/booking/payment')
    }
    catch(e){
      alert("Booking unavailable. Please try again.")
    }
  }

  return (
    <div className='relative'>
      <img className='w-full h-17 object-cover' src={bg}/>
      <div className='absolute top-0 left-0'><StateNavbar page={2} /></div>
      <div className={`bg-[#F8F3EB] text-[#2F2F2F] ${isVisible && 'grid grid-cols-[4fr_2fr]'} gap-5 px-30 xl:px-50 2xl:px-70`}>
        {isVisible? <>
          <div className='w-full'>
            <div>
              <h2 className='font-bold text-2xl pb-3 pt-4'>Car Details</h2>
              <div className='bg-white rounded-xl mb-3'>
                <div className='flex items-center pl-5 pt-4'>
                  <span className='bg-[#F7EFC9] rounded font-normal text-base'>{car?.segment}</span>
                  <span className='text-lg font-bold ml-2'>{car?.model}</span>
                  <RiErrorWarningLine className='text-xs text-[#6B7280] ml-2'/>
                </div>
                <div className='flex items-center pl-5'>
                  <img className='h-25 w-37' src={car?.image_link}/>
                  <div className='flex items-center pl-6'>
                      <div className='flex items-center'>
                        <img src="/symbol/car-info/WheelChair.svg"/>
                        <span className='ml-3 mr-5'>{car?.seats}</span>
                      </div>
                      <div className='flex items-center'>
                        <img src="/symbol/car-info/Bag.svg"/>
                        <span className='ml-3 mr-5'>{car?.baggage}</span>
                      </div>
                      <div className='flex items-center'>
                        <img src="/symbol/car-info/Door.svg"/>
                        <span className='ml-3 mr-5'>{car?.door}</span>
                      </div>
                      <div className='flex items-center'>
                        <img src="/symbol/car-info/Gear.svg"/>
                        <span className='ml-3 mr-5'>{car?.gear}</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-white rounded-xl pl-5 text-[#2F2F2F] text-sm mb-3 pb-3'>
              <h2 className='font-bold text-2xl pb-3 pt-4'>Pick-up & drop-off</h2>
              <div className='flex mb-3'>
                <SiGooglemaps />
                <div className='flex flex-col ml-2'>
                  <span className='font-semibold'>Getting there</span>
                  <span className='text-[#6B7280]'>Near the airport, free shuttle bus</span>
                </div>
              </div>
              <div className="flex">
                <LuClock4 />
                <div className='flex flex-col ml-2'>
                  <span className='font-semibold'>Business hours</span>
                  <span className='text-[#6B7280]'>{businessHour}</span>
                </div>
              </div>
            </div>
            {/* form รายละเอียดผู้จอง */}
            <form onSubmit={handleSubmit}>
              <div className='bg-white rounded-xl px-5 text-[#2F2F2F] text-sm mb-3 pb-3'>
                <h2 className='font-bold text-2xl pb-3 pt-4'>Driver details</h2>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='border rounded-lg relative h-12 flex'>
                      <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Given names (standard Latin alphabet)</p>
                      <input className='ml-3 w-full focus:outline-none' type="text" placeholder='E.g. Thaporn' 
                        onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className='border rounded-lg relative h-12 flex'>
                      <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Surname (standard Latin alphabet)</p>
                      <input className='ml-3 w-full focus:outline-none' type="text" placeholder='Latin letters only, e.g. Phaetbandit' 
                        onChange={(e) => {setSurname(e.target.value)}}/>
                    </div>
                    <div>
                      <div className='border rounded-lg h-12 flex'>
                        <input className='ml-3 w-full focus:outline-none' type="number" placeholder='Driver age'
                          onChange={(e) => {setDriverAge(Number(e.target.value))}}/>
                      </div>
                    </div>
                    <div>
                      <div className='border rounded-lg h-12 flex'>
                        <input className='ml-3 w-full focus:outline-none' type="email" placeholder='Email'
                          onChange={(e) => {setDriverEmail(e.target.value)}}/>
                      </div>
                      <p className='text-xs text-[#6B7280]'>Rental voucher will be sent to this email</p>
                    </div>
                    <div className='border rounded-lg relative h-12 flex'>
                      <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Mobile phone number</p>
                      <input className='ml-3 w-full focus:outline-none' type="text"
                        onChange={(e) => {setDriverPhone(e.target.value)}}/>
                    </div>
                    <div>
                      <div className='border rounded-lg h-12 flex'>
                        <input className='ml-3 w-full focus:outline-none' type="text" placeholder='Flight number'
                          onChange={(e) => {setDriverFlight(e.target.value)}}/>
                      </div>
                      <div className='text-xs text-[#6B7280] flex'>
                        <PiWarningCircleLight className='pt-1'/>
                        <p className='ml-1'>If you have a connecting flight, please provide the details of your final flight segment</p>
                      </div>
                      <div className='text-xs text-[#A27100] flex'>
                        <p className='flex'>If your flight is delayed, your car will be held until 12:00 on the day of pick-up</p>
                        <FaCaretRight className='pt-1'/>
                      </div>
                    </div>
                </div>
              </div>
              <div className='bg-white rounded-xl px-5 text-[#2F2F2F] text-sm mb-10 pt-3'>
                <p className='pb-3'>By proceeding, I acknowledge that I have read and agree to HitCar.com's 
                  <a className='text-[#A27100] underline' href="">Terms and Conditions</a> and 
                  <a className='text-[#A27100] underline' href="">Privacy Statement.</a>
                </p>
                <p className='pb-3'>
                  {`Frequent traveler and contact information are saved for more convenient booking next time. You can edit or delete this information anytime 
                  by going to "Account" > "Travelers & Contacts" > "Frequent traveler info" and "Contact info".`}
                </p>
                <button className='text-white bg-[#A27100] w-full rounded-lg h-12 mb-5 hover:bg-[#ac7801] cursor-pointer' 
                  type='submit'>Book Now
                </button>
              </div>
            </form>
          </div>
          <div>
            <div className='bg-white rounded-xl px-9 text-[#2F2F2F] text-sm mb-3 mt-4 pt-2 relative shadow-lg'>
              <div className='mb-7'>
                <h2 className='font-semibold text-xl mb-2'>Pick-up</h2>
                <p className='text-[#6B7280] text-sm'>{forms?.picTime}, {forms?.startDate?.toDateString()} {forms?.location}</p>
              </div>
              <div className='pb-3'>
                <h2 className='font-semibold text-xl'>Drop-off</h2>
                <p className='text-[#6B7280] text-sm'>{forms?.dropTime}, {forms?.stopDate?.toDateString()} {forms?.location}</p>
              </div>
              <div className='text-[#A27100] flex justify-end items-center pb-3'>
                <LuPencil />
                <Link href={'/ChooseCar'}>Change cars</Link>
              </div>
              <div className='absolute top-4 left-3 w-3 h-3 rounded-full bg-[#D9D9D9]'></div>
              <div className='absolute top-30 left-3 w-3 h-3 rounded-full bg-[#D9D9D9]'></div>
              <div className='absolute top-5 left-4 w-0.5 h-28 bg-[#D9D9D9] translate-x-1/2'></div>
            </div>
            <div className='bg-white rounded-xl px-5 text-[#2F2F2F] text-sm mb-3 mt-4 pt-2 relative'>
              <h2 className='font-semibold text-xl'>Price details</h2>
              <div className='flex justify-between border-b border-dashed border-[#D9D9D9]'>
                <h3 className='font-semibold text-sm'>Car rental fee</h3>
                <div className='flex flex-col items-end pb-3'>
                  <h3 className='text-sm'>THB {((car?.price_per_day || 0) * bookingDay).toFixed(2)}</h3>
                  <p className='text-[10px] text-[#6B7280]'>Approx. THB {car?.price_per_day}×{bookingDay} days</p>
                </div>
              </div>
              <div className='flex justify-between py-3'>
                <h2 className='font-semibold text-xl'>Total</h2>
                <h2 className='font-semibold text-xl'>THB {((car?.price_per_day || 0) * bookingDay).toFixed(2)}</h2>
              </div>
                <p className='pb-3 text-xs'>By proceeding, I acknowledge that I have read and agree to HitCar.com's 
                  <a className='text-[#A27100] underline' href="">Terms and Conditions</a> and 
                  <a className='text-[#A27100] underline' href="">Privacy Statement.</a>
                </p>
            </div>
          </div>
        </> : <div className='h-screen flex justify-center items-center'>
          <Link href={'/'}>Return to home page</Link>
          </div>}
      </div>
    </div>
  )
}

export default page