'use client'
import AdminSidebar from '@/components/ui/detailsSidebar/AdminSidebar'
import EditCar from '@/components/ui/cars/EditCar'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { PiBackpackLight } from "react-icons/pi";
import { GiCarDoor } from "react-icons/gi";
import { GiGearStick } from "react-icons/gi";
import { MdLocalGasStation } from "react-icons/md";
import AddCar from '@/components/ui/cars/AddCar';

type Vehicle = {
  vehicle_id:number
  brand:string
  model:string
  segment:string
  seats:number
  baggage:number
  door:number
  gear:string
  energy:string
  price_per_day:string
  image_link:string
  status:string
}

export default function page() {
  const [cars, setCars] = useState<Vehicle[]>([])
  const [isAdd, setAdd] = useState<boolean>(false)
  const [isEdit, setEdit] = useState<boolean>(false)
  const [carID, setCarID] = useState<number>(-1)

  const [top, setTop] = useState(0)

  async function getCars() {
    try{
      const res = await axios.get('/api/cars/all')
      setCars(res.data)
    }
    catch(error){
      alert('Cannot connect to server.')
    }
  }

  useEffect(() => {
      if(isAdd || isEdit){
        document.body.classList.add('overflow-hidden')
      }
      else{
        document.body.classList.remove('overflow-hidden')
      }
      
    },[isAdd, isEdit])

  useEffect(() =>{
    getCars()
  },[])

  async function removeCar(carID:number) {
    try{
      await axios.delete('/api/cars/remove',{
        params:{
          car_id:carID
        }
      })

      getCars()
    }
    catch(error){
      alert('Cannot connect to server.')
    }
  }

  async function editCar(carID:number) {
    setEdit(true)
    setTop(window.scrollY)
    setCarID(carID)
  }

  return (
    <div className='grid grid-cols-[1fr_3fr] px-25 gap-5 pt-10'>
      <div className='relative z-10'>
        <AdminSidebar/>
      </div>
      <div className='relative z-10 border-[1.5px] border-solid border-[#FFFFFF66] rounded-2xl p-5 mb-3 backdrop-blur-xl'>
        <div className='border-b border-solid border-[#D9D9D9] text-white flex items-center justify-between pb-3 mb-5'>
          <h1 className=' font-bold text-2xl '>Car edit</h1>
          <button onClick={() => setAdd(!isAdd)}>
            <CiSquarePlus className='w-10 h-10 cursor-pointer'/>
          </button>
        </div>
        {cars.map((car) => (
          <div key={car.vehicle_id} className='border border-solid border-white rounded-2xl w-full flex justify-between items-center mb-3 shadow-md'>
            <div className='flex items-center pl-5 text-white'>
              <img className='rounded my-2 h-25 w-37' src={car.image_link}/>
              <div className='text-#2F2F2F ml-8'>
                <div className='flex items-center mb-1'>
                  <span className='text-base font-normal rounded bg-[#F7EFC9] px-1 text-black'>{car.segment}</span>
                  <span className='font-bold text-lg mx-2'>{car.model} </span>
                  <span >THB {car.price_per_day}</span>
                  <span >/day</span>
                </div>
                <div className='flex items-center'>
                  <div className='flex items-center'>
                    <MdOutlineAirlineSeatReclineNormal />
                    <span className='ml-3 mr-5'>{car.seats}</span>
                  </div>
                  <div className='flex items-center'>
                    <PiBackpackLight />
                    <span className='ml-3 mr-5'>{car.baggage}</span>
                  </div>
                  <div className='flex items-center'>
                    <GiCarDoor />
                    <span className='ml-3 mr-5'>{car.door}</span>
                  </div>
                  <div className='flex items-center'>
                    <GiGearStick />
                    <span className='ml-3 mr-5'>{car.gear}</span>
                  </div>
                  <div className='flex items-center'>
                    <MdLocalGasStation />
                    <span className='ml-3 mr-5'>{car.energy}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='pr-5 flex flex-col items-end gap-5'>
                <button className='bg-[#be2a17] rounded-xl text-white w-24 h-9 cursor-pointer'
                    onClick={() => {removeCar(car.vehicle_id)}}>Remove
                </button>
                <button className='bg-[#dba717] rounded-xl text-white w-24 h-9 cursor-pointer'
                    onClick={() => {editCar(car.vehicle_id)}}>Edit
                </button>
            </div>
        </div>
        ))}
      </div>
      <img className='absolute w-150 top-70 left-0' src="/img/Car_bg6.png"/>
      {isAdd && <AddCar setVisible={setAdd} refresh={getCars}/>}
      {isEdit && <EditCar setVisible={setEdit} refresh={getCars} car_id={carID} top={top-80}/>}
    </div>
  )
}