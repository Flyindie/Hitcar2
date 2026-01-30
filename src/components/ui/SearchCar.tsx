"use client"
import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { PiWarningCircleFill } from "react-icons/pi";
import { TbCurrencyBaht } from "react-icons/tb";
import { Mycontext } from '../MyProvider';

function SearchCar() {
    //โหลดรูป
    const smallCar:string = '/img/segment/small_car.svg'
    const mediumCar:string = '/img/segment/medium.svg'
    const premiumCar:string = '/img/segment/premium.svg'
    const suvCar:string = '/img/segment/suv.svg'

    const router = useRouter();
    const context = useContext(Mycontext);

    //type ที่ใช้สร้าง object เพื่อวน loop
    type Car = {
        vehicle_id: number
        model: string
        segment: string
        image_link: string
        price_per_day: number
        seats: number
        energy: string
        door: number
        gear: string
        baggage: number
    }

    //เก็บตัวกรอง
    const [segment, setSegment] = useState<String>('all')
    const [seats, setSeats] = useState<String>('')
    const [energy, setEnergy] = useState<String>('')
    const [price, setPrice] = useState<String>('')

    const [cars, setCars] = useState<Car[]>([])

    //หารถรอบแรกตอน render
    useEffect(() => {
        const getCat = async () => {
            const carList = await axios.get('/api/cars')
            setCars(carList.data)
        }
        getCat()
    },[])

    const isFirstTime = useRef(true)

    useEffect(() => {
        //ทำให้ไม่ทำงานในครั้งแรก
        if(isFirstTime.current){
            isFirstTime.current = false
            return
        }

        //ดึงข้อมูลรถตามตัวกรอง
        const getCarFilter = async () => {
            const carList = await axios.get('/api/cars/filter',{
                params:{
                    segment:segment,
                    seats:seats,
                    energy:energy,
                    price:price
                }})
            setCars(carList.data)
        }
        getCarFilter()
    }, [segment, seats, energy, price])

    async function gotoBooking(car:Car){
        try{
            //ตรวจ token
            const checkLogin = await axios.get('/api/account/cookie')

            //เก็บข้อมูลรถไว้ใน context
            if(checkLogin.data.isLogin){
                context?.setVehicle({
                    vehicle_id: car.vehicle_id,
                    model: car.model,
                    segment: car.segment,
                    image_link: car.image_link,
                    price_per_day: car.price_per_day,
                    seats: car.seats,
                    energy: car.energy,
                    door: car.door,
                    gear: car.gear,
                    baggage: car.baggage
                })
                router.push('/booking')
            }
            else{
                context?.setAccount({
                    id:-1,
                    name: '',
                    surname: '',
                    img: '',
                    role: '',
                    isLogin: false
                })
                alert("Please sing in to continue.")
            }
        }
        catch(error){
            alert("Please sing in to continue.")
        }
    }

    return (
        <div className='bg-[#F8F3EB] flex justify-center gap-4 pt-10 pb-25'>
            {/* ตัวกรองตรง sidebar */}
            <div className='bg-white text-[#2F2F2F] w-62 rounded-2xl h-fit'>
                <h2 className='font-semibold text-xl pt-4 pl-3'>Filters</h2>
                <div className='m-2 border-t border-[#F8F3EB]'>
                    <h3 className='font-semibold text-base py-1'>Seats</h3>
                    <div className='text-sm grid grid-cols-2 gap-2'>
                        <button className={`rounded min-h-8.25 cursor-pointer ${seats === '6-7'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setSeats('6-7')}>6-7 seats
                        </button>
                        <button className={`rounded min-h-8.25 cursor-pointer ${seats === '4-5'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setSeats('4-5')}>4-5 seats
                        </button>
                        <button className={`rounded min-h-8.25 cursor-pointer ${seats === '8+'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setSeats('8+')}>8+ seats
                        </button>
                        <button className={`rounded min-h-8.25 cursor-pointer ${seats === 'Less'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setSeats('Less')}>Less than 4 <br />seats
                        </button>
                    </div>
                </div>
                <div className='m-2 border-t border-[#F8F3EB]'>
                    <h3 className='font-semibold text-base'>Energy Source</h3>
                    <div className='text-sm grid grid-cols-2 gap-2'>
                        <button className={`rounded min-h-8.25 cursor-pointer ${energy === 'Electric'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setEnergy('Electric')}>Electric
                        </button>
                        <button className={`rounded min-h-8.25 cursor-pointer ${energy === 'Fuel'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setEnergy('Fuel')}>Fuels
                        </button>
                        <button className={`rounded min-h-8.25 cursor-pointer ${energy === 'Hybrid'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setEnergy('Hybrid')}>Hybrid
                        </button>
                    </div>
                </div>
                <div className='m-2 border-t border-[#F8F3EB] pb-4'>
                    <h3 className='font-semibold text-base'>Price per day</h3>
                    <div className='text-sm grid grid-cols-2 gap-2'>
                        <button className={`flex items-center justify-center rounded min-h-8.25 cursor-pointer ${price === '<1200'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setPrice('<1200')}>Under <TbCurrencyBaht /> 1200
                        </button>
                        <button className={`flex items-center justify-center rounded min-h-8.25 cursor-pointer ${price === '1200-1400'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setPrice('1200-1400')}><TbCurrencyBaht /> 1200-1400
                        </button>
                        <button className={`flex items-center justify-center rounded min-h-8.25 cursor-pointer ${price === '1401-1600'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setPrice('1401-1600')}><TbCurrencyBaht /> 1401-1600
                        </button>
                        <button className={`flex items-center justify-center rounded min-h-8.25 cursor-pointer ${price === '1601-1800'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setPrice('1601-1800')}><TbCurrencyBaht /> 1601-1800
                        </button>
                        <button className={`flex items-center justify-center rounded min-h-8.25 cursor-pointer ${price === '>1800'?'bg-[#A27100] text-white':'bg-[#F8F3EB]'}`}
                            onClick={() => setPrice('>1800')}>Over <TbCurrencyBaht /> 1800
                        </button>
                    </div>
                </div>
            </div>
            {/* ตัวกรองเลือก segment */}
            <div>
                <div>
                    <div className='flex justify-around items-center bg-white rounded-2xl text-[#2F2F2F] text-base h-44 w-full max-w-235.5 p-1 mb-3'>
                        <button className={`px-3 py-13 rounded-lg cursor-pointer ${segment !== 'all' && "hover:bg-gray-50"} ${segment === 'all' && 'bg-[#A27100]'}`}
                            onClick={() => setSegment('all')}>
                            <h3 className={`font-bold ${segment === 'all' && 'text-white'}`}>All models</h3>
                            <span className={`${segment === 'all'? 'text-white':'text-[#6B7280]'}`}>From THB 74.39</span>
                        </button>
                        <div className='border-l border-[#F8F3EB] h-25'></div>
                        <button className={`px-3 py-4 rounded-lg cursor-pointer ${segment !== 'small' && "hover:bg-gray-50"} ${segment === 'small' && 'bg-[#A27100]'}`}
                            onClick={() => setSegment('small')}>
                            <h3 className={`font-bold ${segment === 'small' && 'text-white'}`}>Small car</h3>
                            <span className={`${segment === 'small'? 'text-white':'text-[#6B7280]'}`}>From THB 74.39</span>
                            <img src={smallCar}/>
                        </button>
                        <div className='border-l border-[#F8F3EB] h-25'></div>
                        <button className={`px-3 py-4 rounded-lg cursor-pointer ${segment !== 'medium' && "hover:bg-gray-50"} ${segment === 'medium' && 'bg-[#A27100]'}`}
                            onClick={() => setSegment('medium')}>
                            <h3 className={`font-bold ${segment === 'medium' && 'text-white'}`}>Medium & Large</h3>
                            <span className={`${segment === 'medium'? 'text-white':'text-[#6B7280]'}`}>From THB 111.58</span>
                            <img src={mediumCar}/>
                        </button>
                        <div className='border-l border-[#F8F3EB] h-25'></div>
                        <button className={`px-3 py-4 rounded-lg cursor-pointer ${segment !== 'premium' && "hover:bg-gray-50"} ${segment === 'premium' && 'bg-[#A27100]'}`}
                            onClick={() => setSegment('premium')}>
                            <h3 className={`font-bold ${segment === 'premium' && 'text-white'}`}>Premium</h3>
                            <span className={`${segment === 'premium'? 'text-white':'text-[#6B7280]'}`}>From THB 743.89</span>
                            <img src={premiumCar}/>
                        </button>
                        <div className='border-l border-[#F8F3EB] h-25'></div>
                        <button className={`px-3 py-4 rounded-lg cursor-pointer ${segment !== 'suv' && "hover:bg-gray-50"} ${segment === 'suv' && 'bg-[#A27100]'}`}
                            onClick={() => setSegment('suv')}>
                            <h3 className={`font-bold ${segment === 'suv' && 'text-white'}`}>SUV</h3>
                            <span className={`${segment === 'suv'? 'text-white':'text-[#6B7280]'}`}>From THB 171.09</span>
                            <img src={suvCar}/>
                        </button>
                    </div>
                    <div className='flex justify-end mb-3'>
                        <span className='text-sm font-normal'>{cars.length} cars found</span>
                    </div>
                </div>
                <div>
                    {/* วน loop แสดงข้อมูลรถ */}
                    {cars.map((car, index) => (
                    <div key={index} className='bg-white rounded-2xl w-full max-w-235.5 flex justify-between items-center mb-3 shadow-md'>
                        <div className='flex items-center pl-5'>
                            <img className='h-25 w-37 py-1' src={car.image_link}/>
                            <div className='text-#2F2F2F ml-8'>
                                <div className='flex items-center mb-1'>
                                    <div className='text-base font-normal rounded bg-[#F7EFC9] px-1'>{car.segment}</div>
                                    <span className='font-bold text-lg mx-2'>{car.model}</span>
                                    <PiWarningCircleFill className='text-[#6B7280] text-xs'/>
                                </div>
                                <div className='flex items-center'>
                                    <div className='flex items-center'>
                                        <img src="/symbol/car-info/WheelChair.svg"/>
                                        <span className='ml-3 mr-5'>{car.seats}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <img src="/symbol/car-info/Bag.svg"/>
                                        <span className='ml-3 mr-5'>{car.baggage}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <img src="/symbol/car-info/Door.svg"/>
                                        <span className='ml-3 mr-5'>{car.door}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <img src="/symbol/car-info/Gear.svg"/>
                                        <span className='ml-3 mr-5'>{car.gear}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <img src="/symbol/car-info/Fule.svg"/>
                                        <span className='ml-3 mr-5'>{car.energy}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pr-5 flex flex-col items-end'>
                            <div className='pb-1.5'>
                                <span className='text-[#6B7280]'>From</span>
                                <span className='font-bold text-2xl'>THB {car.price_per_day}</span>
                                <span className='text-[#6B7280]'>/day</span>
                            </div>
                            <button className='bg-[#A27100] hover:bg-[#ac7801] rounded-xl text-white w-24 h-9 cursor-pointer'
                                onClick={() => gotoBooking(car)}>Book
                            </button>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    )
}

export default SearchCar