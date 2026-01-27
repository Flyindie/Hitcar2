"use client"
import React, { useEffect, useState, useContext } from 'react'
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { TbGenderBigender } from "react-icons/tb";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { IoEarth } from "react-icons/io5";
import axios from 'axios';
import EditAccountCard from './EditAccountCard';
import { Mycontext } from "@/components/MyProvider";
import { IoCalendar } from "react-icons/io5";
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/navigation';

enum Role {
  Admin,
  User
}
enum Status {
  ACTIVE,
  INACTIVE,
  BANNED
}
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

type User = {
  user_id:number
  email:string
  password:string
  created_at:Date
  status:Status
  gender:Gender
  region:string
  img_path:string
  phone:string
  name:string
  surname:string
  Role:Role
  date_of_birth:Date
}

 export default function AccountDetail() {
    const router = useRouter()
    const context = useContext(Mycontext)

    const [user, setUser] = useState<User>()

    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [name, setName] = useState<string>()
    const [surname, setSurname] = useState<string>()

    const [gender, setGender] = useState<Gender>()
    const [region, setRegion] = useState<string>()
    const [birthDate, setBirthDate] = useState<Date | null>()
    const [userImage, setUserImage] = useState<File>()

    const [formVisible, setFormVisible] = useState<boolean[]>(
        [false, false, false, false]
    )


    function swtichFormVisible(position: number){
        setFormVisible(prev => {
            const newArray = [...prev]
            newArray[position] = !newArray[position]
            return newArray
        })
    }


    async function getAccountInfo(){
        try{
            const res = await axios.get('/api/account/info')
            setUser(res.data)

        }
        catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        getAccountInfo()
    },[context?.account])

    useEffect(() => {
        setGender(user?.gender)
        setRegion(user?.region)
        setName(user?.name)
        setSurname(user?.surname)
    },[user])


    async function uploadUserImage(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        
        if(!userImage) return

        try{
            const data = new FormData()
            data.set('file', userImage)

            await axios.post('/api/account/edit/profile',data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            
            getAccountInfo()
        }
        catch(error){
            return
        }
    }


    async function updateEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        swtichFormVisible(0)

        try{
            await axios.patch('/api/account/edit/email',{
                email:email
            })

            getAccountInfo()
        }
        catch(error){
            alert('Email is already in use.')
        }
    }

    async function updatePhone(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        swtichFormVisible(1)

        try{
            await axios.patch('/api/account/edit/phone',{
                phone:phone
            })

            getAccountInfo()
        }
        catch(error){
            alert('Email is already in use.')
        }
    }

    async function updateBirthdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        swtichFormVisible(2)
        try{
            await axios.patch('/api/account/edit/birth',{
                birth:birthDate
            })

            getAccountInfo()
        }
        catch(error){
            alert('Email is already in use.')
        }
    }

    async function updateUserDetails(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        swtichFormVisible(3)

        try{
            await axios.patch('/api/account/edit/details',{
                gender, 
                region, 
                name,
                surname
            })
            
            getAccountInfo()
        }
        catch(error){
            console.log('Cannot connect to server.')
        }
    }

    function getBirthdate(){
        if(user?.date_of_birth){
            return new Date(user?.date_of_birth || 0).toDateString()
        }
        return "unknow"
    }

    async function deleteAccount(){
        try{
            await axios.delete('/api/account/remove')
            router.push('/')
        }
        catch(error){
            alert('Cannot connect to server.')
        }
    }

    return (
        <div>
            <div className='border-[1.5px] border-solid border-[#FFFFFF66] rounded-2xl p-5 mb-3 backdrop-blur-xl'>
                <h2 className='font-bold text-xl text-white mb-4'>Account Security</h2>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='border border-solid border-[#FFFFFF66] rounded-2xl px-3'>
                        <div className='py-3 w-full'>
                            <div className='flex items-center gap-2 text-[#FFFFFF80]'>
                                <CiMail />
                                <p>Linked Email</p>
                            </div>
                            {!formVisible[0] &&
                                <div className='flex items-center justify-between w-full'>
                                    <p className='text-white font-medium'>{user?.email}</p>
                                    <button className='text-amber-300 cursor-pointer' onClick={() => swtichFormVisible(0)}>
                                        Update
                                    </button>
                                </div>
                            }
                            {formVisible[0] &&
                                <EditAccountCard 
                                    placeHolder={user?.email || ''} submitForm={updateEmail} swtichFormVisible={swtichFormVisible} setFun={setEmail} mode={'email'} position={0}>
                                </EditAccountCard>
                            }
                        </div>
                    </div>
                    <div className='border border-solid border-[#FFFFFF66] rounded-2xl px-3'>
                        <div className='py-3 w-full'>
                            <div className='flex items-center gap-2 text-[#FFFFFF80]'>
                                <FaPhoneAlt />
                                <p>Linked Phone Number</p>
                            </div>
                            {!formVisible[1] &&
                                <div className='flex items-center justify-between w-full'>
                                    <p className='text-white font-medium'>{user?.phone}</p>
                                    <button className='text-amber-300 cursor-pointer' onClick={() => swtichFormVisible(1)}>
                                        Update
                                    </button>
                                </div>
                            }
                            {formVisible[1] &&
                                <EditAccountCard 
                                    placeHolder={user?.phone || ''} submitForm={updatePhone} swtichFormVisible={swtichFormVisible} setFun={setPhone} mode={'tel'} position={1}>
                                </EditAccountCard>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-[1.5px] border-solid border-[#FFFFFF66] rounded-2xl p-5 mb-3 flex items-center gap-15 backdrop-blur-xl'>
                <div className='flex flex-col gap-5'>
                    <form onSubmit={uploadUserImage}>
                        <h2 className='font-bold text-xl text-white'>Member Profile</h2>
                        <div className='bg-white rounded-full w-36 h-36'>
                            <img className='w-36 h-36 object-cover rounded-full border-2 border-solid border-white' src={user?.img_path}/>
                        </div>
                        <input type="file" name="file" className='text-white border border-solid border-white w-36 rounded-lg my-2 px-1'
                            onChange={(e) => {setUserImage(e.target.files?.[0])}}
                        />
                        <button type='submit' className={`text-[#A27100] bg-[#F8F3EB] rounded-xl h-9 w-36 cursor-pointer 
                            hover:text-[#F8F3EB] hover:bg-[#A27100] transition-all duration-300 ease-in-out`}>
                            Upload photo
                        </button>
                    </form>
                </div>
                <div className='border border-solid border-[#FFFFFF66] rounded-2xl flex items-center justify-between px-3 h-fit w-full'>
                    <div className='py-3 w-full'>
                        <div className='flex items-center gap-2 text-white'>
                            <p>{`${user?.name} ${user?.surname}`}</p>
                        </div>
                        {!formVisible[2] &&
                            <p className='text-white'>{`Date of birth: ${getBirthdate()}`}</p>
                        }
                        {formVisible[2] &&
                            <form onSubmit={updateBirthdate} className='flex items-center justify-between w-full'>
                                <div className='flex items-center'>
                                    <input type="date" className='text-white outline-none'
                                        onChange={(e) => setBirthDate(new Date(e.target.value))}/>
                                    <IoCalendar className='text-white'/>
                                </div>
                                <div>
                                    <button type='button' className='text-white cursor-pointer border border-solid border-white px-2 rounded-md' 
                                        onClick={() => swtichFormVisible(2)}>Close
                                    </button>
                                    <button className={`text-[#A27100] bg-[#F8F3EB] cursor-pointer px-2 rounded-md mx-2
                                        hover:text-[#F8F3EB] hover:bg-[#A27100] transition-all duration-300 ease-in-out`} 
                                        type='submit'>Confirm
                                    </button>
                                </div>
                            </form>
                        }
                    </div>
                    {!formVisible[2] && 
                        <button className='text-amber-300 cursor-pointer' onClick={() => swtichFormVisible(2)}>
                            Update
                        </button>
                    }
                </div>
            </div>
            <form onSubmit={updateUserDetails} className='border-[1.5px] border-solid border-[#FFFFFF66] rounded-2xl p-5 mb-3 backdrop-blur-xl'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-xl text-white mb-4'>Personal Info</h2>
                    {!formVisible[3] &&
                        <button type='button' className='text-amber-300 flex gap-1 items-center cursor-pointer'
                            onClick={() => swtichFormVisible(3)}>
                            <RiEditLine />
                            <p>edit</p>
                        </button>
                    }
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='border border-solid border-[#FFFFFF66] rounded-2xl flex items-center px-3'>
                        <div className='py-3'>
                            <div className='flex items-center gap-2 text-[#FFFFFF80]'>
                                <TbGenderBigender />
                                <p>Gender</p>
                            </div>
                            {!formVisible[3] && <p className='text-white font-semibold'>{user?.gender}</p>}
                            {formVisible[3] && 
                                <Menu as="div" className="relative">
                                    <Menu.Button>
                                        <div className='cursor-pointer'>
                                            <span className='text-white'>Select gender: </span>
                                            <span className='text-gray-200'> {gender}</span>
                                        </div>
                                    </Menu.Button>
                                    <Menu.Items className='absolute outline-none bg-white text-black max-h-40 w-full overflow-y-auto z-100 rounded'>
                                        <Menu.Item>
                                            <button type="button" className="px-5 w-full hover:bg-gray-200 cursor-pointer flex items-center justify-center" 
                                                onClick={() => setGender(Gender.MALE)}>
                                                MALE
                                            </button>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <button type="button" className="px-5 w-full hover:bg-gray-200 cursor-pointer flex items-center justify-center" 
                                                onClick={() => setGender(Gender.FEMALE)}>
                                                FEMALE
                                            </button>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <button type="button" className="px-5 w-full hover:bg-gray-200 cursor-pointer flex items-center justify-center" 
                                                onClick={() => setGender(Gender.OTHER)}>
                                                OTHER
                                            </button>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            }
                        </div>
                    </div>
                    <div className='border border-solid border-[#FFFFFF66] rounded-2xl flex items-center px-3'>
                        <div className='py-3'>
                            <div className='flex items-center gap-2 text-[#FFFFFF80]'>
                                <MdOutlineDisplaySettings />
                                <p>Name</p>
                            </div>
                            {!formVisible[3] && <p className='text-white font-semibold'>{`${user?.name} ${user?.surname}`}</p>}
                            {formVisible[3] && 
                                <div className='text-white'>
                                    <div className='flex gap-1'>
                                        <label>Name:</label>
                                        <input type="text" placeholder={user?.name} className='outline-none'
                                            onChange={(e) => {setName(e.target.value)}}/>
                                    </div>
                                    <div className='flex gap-1'>
                                        <label>Surname:</label>
                                        <input type="text" placeholder={user?.surname} className='outline-none'
                                            onChange={(e) => {setSurname(e.target.value)}}/>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='border border-solid border-[#FFFFFF66] rounded-2xl flex items-center px-3'>
                        <div className='py-3'>
                            <div className='flex items-center gap-2 text-[#FFFFFF80]'>
                                <IoEarth />
                                <p>Country or region</p>
                            </div>
                            {!formVisible[3] && <p className='text-white font-semibold'>{user?.region}</p>}
                            {formVisible[3] && 
                                <Menu as="div" className="relative">
                                    <Menu.Button>
                                        <div className='cursor-pointer'>
                                            <span className='text-white'>Select region: </span>
                                            <span className='text-gray-200'> {region}</span>
                                        </div>
                                    </Menu.Button>
                                    <Menu.Items className='absolute outline-none w-full bg-white text-black max-h-40 overflow-y-auto z-100 rounded'>
                                        <Menu.Item>
                                            <button type="button" className="px-5 w-full hover:bg-gray-200 cursor-pointer flex items-center justify-center" 
                                                onClick={() => setRegion('Thailand')}>
                                                Thailand
                                            </button>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            }
                        </div>
                    </div>
                    {formVisible[3] && 
                        <div className='flex items-center gap-5 justify-end'>
                            <button type='button' className='text-white cursor-pointer border border-solid border-white px-4 py-1 rounded-md'
                                onClick={() => swtichFormVisible(3)}>cancel
                            </button>
                            <button type='submit' className={`text-[#A27100] bg-[#F8F3EB] rounded-xl h-9 w-36 cursor-pointer 
                                hover:text-[#F8F3EB] hover:bg-[#A27100] transition-all duration-300 ease-in-out`}>
                                Confirm
                            </button>
                        </div>
                    }
                </div>
            </form>
            <div className='flex gap-3 justify-center mb-15'>
                <p className='text-[#FFFFFFBF]'>
                    <button className='text-white cursor-pointer px-2' onClick={deleteAccount}>Delete My Account</button>
                    Once deleted, all account information will be removed. You will not be able to recover this information
                </p>
            </div>
        </div>
    )
}