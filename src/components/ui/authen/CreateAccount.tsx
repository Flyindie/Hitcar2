import axios from 'axios';
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import { Menu } from '@headlessui/react'

type singin = {
    setSingin:React.Dispatch<React.SetStateAction<boolean>>
    setCreateAccount:React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateAccount({setSingin, setCreateAccount}:singin) {

    function backToSingin(){
        setSingin(true)
        setCreateAccount(false)
    }

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [checkPassword, setCheckPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [gender, setGender] = useState<string>('OTHER')
    const [region, setRegion] = useState<string>("Thailand")
    const [phone, setPhone] = useState<string>("")

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(password.length < 8){
            alert('Password needs to be at least 8 characters')
            return
        }
        else if(password != checkPassword){
            alert("Password do not match")
            return
        }
        else if(!email || !name || !surname || !gender || !region || !phone){
            alert("Please complete all inputs")
            return
        }

        try{
            const response = await axios.get('/api/account/check', {
                params:{email}
            })
            if(!response.data.duplicateValues){
                await axios.post('/api/account/create',{
                    email,
                    password,
                    region,
                    phone,
                    name,
                    surname,
                    gender,
                })
                backToSingin()
            }
            else{
                alert("Duplicate email")
            }
        }
        catch(error){
            console.log('Error doring registration: ', error)
        }
    }

    return (
        <div className='absolute top-0 left-0 bg-[#0000006c] w-full h-screen flex justify-center items-center'>
            <div className='rounded-2xl bg-white w-full max-w-200 flex flex-col items-center px-3 py-4'>
                <div className='w-full flex justify-between'>
                    <button onClick={() => backToSingin()}><IoChevronBackOutline className='w-5 cursor-pointer'/></button>
                    <button onClick={() => setCreateAccount(false)}><IoMdClose className='w-5 cursor-pointer'/></button>
                </div>
                <h1 className='font-bold text-2xl mb-7 mt-2'>Create an account</h1>
                <form className='w-full px-5 text-sm' onSubmit={handleSubmit}>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <div className='border rounded-lg relative h-12 flex mb-3'>
                                <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Email</p>
                                <input onChange={(e) => setEmail(e.target.value)} 
                                    className='ml-3 w-full focus:outline-none' type="text" 
                                    placeholder='Please enter an email address'/>
                            </div>
                            <div className='border rounded-lg relative h-12 flex mb-3'>
                                <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Password</p>
                                <input onChange={(e) => setPassword(e.target.value)} 
                                    className='ml-3 w-full focus:outline-none' type="password" 
                                    placeholder='Please enter your password'/>
                            </div>
                            <div className='border rounded-lg relative h-12 flex mb-3'>
                                <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Confirm password</p>
                                <input onChange={(e) => setCheckPassword(e.target.value)} 
                                    className='ml-3 w-full focus:outline-none' type="password" 
                                    placeholder='Please confirm your password'/>
                            </div>
                            <p className='text-xs mb-5'>Password needs to be at least 8 characters</p>
                        </div>
                        <div className='border-l border-gray-400 mx-5 mb-3'></div>
                        <div className='w-full'>
                            <div className='border rounded-lg relative h-12 flex mb-3'>
                                <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Name</p>
                                <input onChange={(e) => setName(e.target.value)} 
                                    className='ml-3 w-full focus:outline-none' type="text" 
                                    placeholder='Please enter your name'/>
                            </div>
                            <div className='border rounded-lg relative h-12 flex mb-3'>
                                <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Surname</p>
                                <input onChange={(e) => setSurname(e.target.value)} 
                                    className='ml-3 w-full focus:outline-none' type="text" 
                                    placeholder='Please enter your surname'/>
                            </div>
                            <div className='border rounded-lg relative h-12 flex mb-3 items-center'>
                                <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Gender</p>
                                <Menu as='div' className='relative w-full h-fit focus:outline-none flex items-center'>
                                    <Menu.Button className='outline-none pl-3 flex items-center cursor-pointer text-sm'>
                                        {gender}
                                    </Menu.Button>
                                    <Menu.Items className='absolute left-0 top-4 outline-none bg-gray-100 text-black max-h-40 overflow-y-auto z-100'>
                                        <Menu.Item>
                                        <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                                            onClick={(e) => setGender('MALE')}>Male
                                        </button>
                                        </Menu.Item>
                                        <Menu.Item>
                                        <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                                            onClick={(e) => setGender('FEMALE')}>Female
                                        </button>
                                        </Menu.Item>
                                        <Menu.Item>
                                        <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                                            onClick={(e) => setGender('OTHER')}>Other
                                        </button>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                            <div className='border rounded-lg relative h-12 flex mb-3 items-center'>
                                <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Region</p>
                                <Menu as='div' className='relative w-full h-fit focus:outline-none flex items-center'>
                                    <Menu.Button className='outline-none pl-3 flex items-center cursor-pointer text-sm'>
                                        {region}
                                    </Menu.Button>
                                    <Menu.Items className='absolute left-0 top-5 outline-none bg-gray-100 text-black max-h-40 overflow-y-auto z-100 w-20'>
                                        <Menu.Item>
                                        <button type="button" className="w-full hover:bg-gray-200 cursor-pointer"
                                            onClick={(e) => setRegion('Thailand')}>Thailand
                                        </button>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                            <div className='border rounded-lg relative h-12 flex mb-3'>
                                <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Phone number</p>
                                <input onChange={(e) => setPhone(e.target.value)} 
                                    className='ml-3 w-full focus:outline-none' type="tel" 
                                    placeholder='Please enter your phone number'/>
                            </div>
                        </div>
                    </div>
                    <button className='bg-[#A27100] hover:bg-[#ac7801] text-white h-12 w-full rounded-lg text-lg font-bold mb-3 cursor-pointer'>
                        Register and Sign In
                    </button>
                </form>
                <p className='text-xs text-[#6B7280B2] px-5'>
                    By signing or registering, you are deemed to have agreed to the HitCar.com Terms and Conditions and Privacy Statement.
                </p>
            </div>
        </div>
    )
}