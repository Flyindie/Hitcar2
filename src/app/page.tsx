'use client'
import { useContext, useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Menu } from '@headlessui/react'
import { IoIosSearch } from "react-icons/io";
import { Mycontext } from "@/components/MyProvider";
import Navbar from "@/components/ui/navbars/Navbar";
import TopBrand from "@/components/ui/TopBrand";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  //โหลดรูป
  const carBg:string = '/img/Car_bg.svg'
  const carLogo:string = '/symbol/Car-front.svg'
  const dorpdown:string = '/symbol/DropDown.svg'

  type airport = {
    name:string
  }

  //Form สำหรับกรอกข้อมูล
  const [picTime, setPicTime] = useState<string>('00:00')
  const [dropTime, setDropTime] = useState<string>('00:00')
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [stopDate, setStopDate] = useState<Date | null>(new Date())
  const [country, setCountry] = useState<string>('Thailand')
  const [driverAge, setDriverAge] = useState<string>('20-30')
  const [place, setPlace] = useState<string>('Airport, city, station, district...')

  const context = useContext(Mycontext)
  const router = useRouter();

  //วน for loop สร้างเวลา
  let times:string[] = []
  let strH:string
  let strM:string
  for(let hour:number = 0; hour < 24; hour++){
    for(let minute:number = 0; minute <= 30; minute += 30){

      strH = hour < 10?`0${hour}`:`${hour}`
      strM = minute == 0?`0${minute}`:`${minute}`

      times.push(`${strH}:${strM}`)
    }
  }
  
  //ดึงข้อมูลสนามบิน
  const [airports, setAirports] = useState<airport[]>([])
  useEffect(() => {
    const setHomePage = async () => {
      try{
        const airport = await axios.get("/api/airport")
        setAirports(airport.data)
      }
      catch(e){
        alert("Please connect to server")
      }
    }
    setHomePage()

  },[])

  //ส่งข้อมูลไปที่ context เพื่อใช้ในหน้าถัดไป
  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    const oneDay = 24 * 60 * 60 * 1000
    const firstDate = startDate?.getTime() || new Date().getTime()
    const seconDate = stopDate?.getTime() || new Date().getTime()

    const diffMs = seconDate - firstDate
    const bookingDays = Math.ceil(diffMs / oneDay)

    if(place === 'Airport, city, station, district...') alert("กรุณาใส่สถานที่")
    else if(bookingDays < 0){
      alert("วันที่ไม่สัมพันธ์กัน")
    }
    else{
      context?.setSearchForm({
        location:place,
        picTime:picTime,
        dropTime:dropTime,
        startDate:startDate,
        stopDate:stopDate,
        country:country,
        age:driverAge
      })
      router.push('/ChooseCar')
    }
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-10 w-full">
        <Navbar/>
      </div>
      <img className="h-175 w-full object-cover lg:h-auto 2xl:h-175" src={carBg}/>

      {/*เนื้อหาหลักบนรูปภาพ*/}
      <div className="absolute top-30 left-0 z-1 text-white flex flex-col justify-between w-full px-20 lg:flex-row 2xl:px-50">
        {/*ชื่อเว็บทางขวา*/}
        <div className="mb-5">
          <h1 className="text-7xl 2lg:text-8xl font-extrabold">Car Rentals</h1>
          <h2 className="text-5xl font-semibold">Services</h2>
        </div>

        {/*form กรอกข้อมูลทางซ้าย*/}
        <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-2xl border border-white/40 backdrop-blur-xl">

          <h3 className="text-2xl font-semibold py-3">Find your rental now</h3>
          <div className="border border-white/40 rounded-2xl px-6 pb-2 pt-1 w-10/12">
            <div className="flex mb-1">
              <img src={carLogo}/>
              <label className="ml-2 text-[#D9D9D9]/40 text-xs font-medium">Pick-up Location</label>
            </div>
            <Menu as="div" className="relative">
              <Menu.Button className="outline-none">
                {place}
              </Menu.Button>
              <Menu.Items className='absolute outline-none bg-white text-black max-h-40 w-fit overflow-y-auto z-100'>
                {Array.isArray(airports) && airports.map((airport) => (
                  <Menu.Item key={airport.name}>
                    <button type="button" className="px-5 w-full hover:bg-gray-200 cursor-pointer flex items-center" 
                      onClick={() => setPlace(airport.name)}>{airport.name}
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>

          <div className="flex flex-col md:flex-row w-10/12 mt-5">
            <div className="border border-white/40 rounded-2xl px-6 pb-2 pt-1 w-64">
              <div className="flex mb-2">
                <FaCalendarAlt className='w-2.5'/>
                <label className="ml-2 text-[#D9D9D9]/40 text-xs font-medium">Pick-up Time</label>
              </div>
              <div className="flex items-center">
                <DatePicker selected={startDate} onChange={(date:Date | null) => setStartDate(date)} className="outline-none focus:outline-none w-20 text-sm"/>
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button className="outline-none border-l-2 border-[#FFFFFFA6] pl-3 ml-3 flex items-center cursor-pointer h-4 text-sm">
                        {picTime}
                        <img
                          src={dorpdown}
                          className={`m-1 transition-transform duration-300 ${
                            open ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </Menu.Button>

                      <Menu.Items className="absolute outline-none bg-white text-black max-h-40 overflow-y-auto z-100">
                        {times.map((time, index) => (
                          <Menu.Item key={index}>
                            <button
                              type="button"
                              className="px-5 w-full hover:bg-gray-200 cursor-pointer"
                              onClick={() => setPicTime(time)}
                            >
                              {time}
                            </button>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </>
                  )}
                </Menu>
              </div>
            </div>
            <div className="border border-white/40 rounded-2xl md:ml-3 px-6 pb-2 pt-1 w-64 mt-4 md:mt-0">
              <div className="flex mb-2">
                <FaCalendarAlt className='w-2.5'/>
                <label className="ml-2 text-[#D9D9D9]/40 text-xs font-medium" htmlFor="">Drop-off Time</label>
              </div>
              <div className="flex items-center">
                <DatePicker selected={stopDate} onChange={(date:Date | null) => setStopDate(date)} className="outline-none focus:outline-none w-20 text-sm"/>
                <Menu as="div" className='relative flex items-center'>
                  {({open}) => (
                    <>
                      <Menu.Button className='outline-none border-l-2 border-[#FFFFFFA6] pl-3 ml-3 flex items-center cursor-pointer h-4 text-sm'>
                        {dropTime}
                        <img src={dorpdown}
                          className={`m-1 transition-transform duration-300 ${
                          open ? 'rotate-180' : 'rotate-0'
                          }`} 
                        />
                      </Menu.Button>
                      <Menu.Items className='absolute top-full left-0 outline-none bg-white text-black max-h-40 overflow-y-auto z-100'>
                        {times.map((time, index) => (
                          <Menu.Item key={index}>
                            <button type="button" className="px-5 w-full hover:bg-gray-200 cursor-pointer" 
                              onClick={() => setDropTime(time)}>{time}
                            </button>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>
            <button className={`flex justify-center items-center bg-[#A27100] rounded-2xl w-32 h-14 font-medium text-xl mb-5 mt-5
              cursor-pointer hover:bg-white hover:text-[#A27100] transition-all duration-300 ease-in-out`}>
              <IoIosSearch /><p className="ml-2 ">Search</p>
            </button>
        </form>
      </div>

      <TopBrand/>
    </div>
  );
}


/*
          <div className="flex justify-end-safe">
            <div className="grid grid-cols-[3fr_1fr] justify-items-end my-4 items-center">
              <div className="flex items-center">
                <span className="opacity-75 text-sm">Driver’s license issuing country/region</span>
                <div className="opacity-40"> <PiWarningCircleFill /> </div>
              </div>
              <Menu as='div' className='relative'>
                <Menu.Button className='outline-none pl-3 ml-3 flex cursor-pointer text-sm'>
                  {country}<img className="m-1" src={dorpdown}/>
                </Menu.Button>
                <Menu.Items className='absolute outline-none bg-white text-black max-h-40 overflow-y-auto z-100'>
                  <Menu.Item>
                    <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => setCountry('Thailand')}>Thailand
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => setCountry('Japan')}>Japan
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => setCountry('Germany')}>Germany
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>

              <div>
                <span className="opacity-75 text-sm">Driver’s  Age</span>
              </div>
              <Menu as='div' className='relative'>
                <Menu.Button className='outline-none pl-3 ml-3 flex cursor-pointer text-sm'>
                  {driverAge}<img className="m-1" src={dorpdown}/>
                </Menu.Button>
                <Menu.Items className='absolute outline-none bg-white text-black max-h-40 overflow-y-auto z-100'>
                  <Menu.Item>
                    <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => setDriverAge('20-30')}>20-30
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => setDriverAge('30-40')}>30-40
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                      onClick={(e) => setDriverAge('40-50')}>40-50
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div> */
