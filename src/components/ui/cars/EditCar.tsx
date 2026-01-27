'use client'
import { Menu } from '@headlessui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

type showPage = {
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
    refresh:() => void
    car_id:number
    top:number
}

enum Gear {
  Manual = 'Manual',
  Automatic = 'Automatic'
}
enum Energy {
  Fuel = 'Fuel',
  Hybrid = 'Hybrid',
  Electric = 'Electric'
}

export default function EditCar({setVisible, refresh, car_id, top}:showPage) {
    const [brand, setBrand] = useState<string>()
    const [model, setModel] = useState<string>()
    const [segment, setSegment] = useState<string>('Small car')
    const [seats, setSeats] = useState<number>(1)
    const [baggage, setBaggage] = useState<number>(1)
    const [door, setDoor] = useState<number>(1)
    const [gear, setGear] = useState<Gear>()
    const [energy, setEnergy] = useState<Energy>()
    const [price, setPrice] = useState<number>()

    const [image, setImage] = useState<File>()
    const [linkImg, setLinkImg] = useState<string>()

    async function editCarDetails(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      if(!brand || !model || !segment || !seats || !baggage || !door || !gear || !energy || !price){
        alert('All information must be provided.')
      }
      else{
        try{
          const data = new FormData()

          data.set('model', model)
          data.set('segment', segment)
          data.set('seats', seats.toString())
          data.set('baggage', baggage.toString())
          data.set('door', door.toString())
          data.set('gear', gear)
          data.set('energy', energy)
          data.set('price', price.toString())
          data.set('brand', brand)
          data.set('id', car_id.toString())

          await axios.patch('/api/cars/edit/details',data,{
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })

          if(image){
            const imgForm = new FormData()

            imgForm.set('file', image)
            imgForm.set('id', car_id.toString())

            await axios.patch('/api/cars/edit/image', imgForm,{
              headers: {
                'Content-Type': 'multipart/form-data',
              }
            })
          }
          setVisible(false)
          refresh()
        }
        catch(error){
          console.log(false)
        }
      }
    }

    async function getData() {
      try{
        const res = await axios.get('/api/cars/one',{
          params:{
            carId:car_id
          }
        })
        setBrand(res.data.brand)
        setModel(res.data.model)
        setSegment(res.data.segment)
        setSeats(res.data.seats)
        setBaggage(res.data.baggage)
        setDoor(res.data.door)
        setGear(res.data.gear)
        setEnergy(res.data.energy)
        setPrice(res.data.price_per_day)

        setLinkImg(res.data.image_link)
      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
      getData()
    },[])

    const [preview, setPreview] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const url = URL.createObjectURL(file)
      setPreview(url)
      setImage(e.target.files?.[0])
    }

    return (
        <div className='absolute z-20 left-0 bg-[#0000006c] w-full h-screen flex justify-center items-center'
            style={{ top }}>
            <form onSubmit={editCarDetails} className='border-[1.5px] border-solid border-[#FFFFFF66] rounded-2xl backdrop-blur-xl px-10 pb-5 pt-6'>
                <h1 className='text-white font-bold text-2xl'>Edit</h1>
                <div className='bg-white rounded-2xl mt-3 pr-7 py-5 flex w-full max-w-228'>
                   <div className='mx-5 min-w-37'>
                      <div className='h-25 w-37 border border-solid border-black rounded-lg'>
                        {preview && <img src={preview} className='h-25 w-37 rounded-lg' />}
                        {!preview && <img src={linkImg} className='h-25 w-37 rounded-lg' />}
                      </div>
                      <input type="file" name="file" className=' border border-solid border-[#6B7280] w-36 rounded-lg my-2 px-1'
                        onChange={handleChange}
                      />
                   </div>
                   <div className='border-l border-solid border-[#6B7280] pl-4'>
                      <div className='grid grid-cols-[2fr_3fr] gap-3'>
                          <div>
                              <p className='text-lg font-medium text-[#2F2F2F]'>brand</p>
                              <div className=' border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center px-2'>
                                  <input type="text" className='outline-none' value={brand} onChange={(e) => setBrand(e.target.value)}/>
                              </div>
                          </div>
                          <div>
                              <p className='text-lg font-medium text-[#2F2F2F]'>Model Name</p>
                              <div className=' border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center px-2'>
                                  <input type="text" className='outline-none' value={model} onChange={(e) => setModel(e.target.value)}/>
                              </div>
                          </div>
                      </div>
                      <div className='grid grid-cols-5 gap-3 pt-3'>
                        <div>
                          <p className='text-lg font-medium text-[#2F2F2F]'>Seats</p>
                          <div className=' border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center px-2'>
                            <input type="number" className='outline-none w-full' value={seats} onChange={(e) => setSeats(Number(e.target.value))}/>
                          </div>
                        </div>
                        <div>
                          <p className='text-lg font-medium text-[#2F2F2F]'>Backages</p>
                          <div className=' border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center px-2'>
                            <input type="number" className='outline-none w-full' value={baggage} onChange={(e) => setBaggage(Number(e.target.value))}/>
                          </div>
                        </div>
                        <div>
                          <p className='text-lg font-medium text-[#2F2F2F]'>Doors</p>
                          <div className=' border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center px-2'>
                            <input type="number" className='outline-none w-full' value={door} onChange={(e) => setDoor(Number(e.target.value))}/>
                          </div>
                        </div>
                        <div>
                          <p className='text-lg font-medium text-[#2F2F2F]'>Gear</p>
                          <Menu>
                            <Menu.Button className='relative border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center justify-between px-2'>
                              {gear}
                              <IoIosArrowDown />
                            </Menu.Button>
                            <Menu.Items className={'border border-gray-300 border-solid bg-white rounded-sm absolute grid grid-cols-1'}>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setGear(Gear.Automatic)}>
                                  {Gear.Automatic}
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setGear(Gear.Manual)}>
                                  {Gear.Manual}
                                </button>
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </div>
                        <div>
                          <p className='text-lg font-medium text-[#2F2F2F]'>Energy Source</p>
                          <Menu>
                            <Menu.Button className=' border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center justify-between px-2'>
                              {energy}
                              <IoIosArrowDown />
                            </Menu.Button>
                            <Menu.Items className={'border border-gray-300 border-solid bg-white rounded-sm absolute grid grid-cols-1'}>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setEnergy(Energy.Electric)}>
                                  {Energy.Electric}
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setEnergy(Energy.Fuel)}>
                                  {Energy.Fuel}
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setEnergy(Energy.Hybrid)}>
                                  {Energy.Hybrid}
                                </button>
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </div>
                        <div>
                          <p className='text-lg font-medium text-[#2F2F2F]'>Price per day</p>
                          <div className=' border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center px-2'>
                              <input type="number" className='w-full outline-none' value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
                          </div>
                        </div>
                        <div>
                          <p className='text-lg font-medium text-[#2F2F2F]'>Category</p>
                          <Menu>
                            <Menu.Button className=' border border-solid border-[#6B7280] rounded-lg w-full py-0.5 flex items-center justify-between px-2'>
                              {segment}
                              <IoIosArrowDown />
                            </Menu.Button>
                            <Menu.Items className={'border border-gray-300 border-solid bg-white rounded-sm absolute grid grid-cols-1'}>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setSegment('Small car')}>
                                  Small car
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setSegment('Medium & Large')}>
                                  Medium & Large
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setSegment('Premium')}>
                                  Premium
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button className='hover:bg-gray-100 px-3' onClick={() => setSegment('suv')}>
                                  suv
                                </button>
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </div>
                      </div>
                   </div>
                </div>
                <div className='flex justify-end gap-3 mt-5'>
                    <button type='button' className='text-white border border-solid border-white rounded-lg py-1 w-38.25 text-lg cursor-pointer'
                        onClick={() => setVisible(false)}>
                        cancel
                    </button>
                    <button className='bg-[#FFCC00] rounded-lg py-1 w-38.25 text-[#2F2F2F] text-lg cursor-pointer'
                        type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}