"use client"
import { usePathname } from 'next/navigation'
import React, {useContext, useEffect, useState } from 'react'
import Singin from '../authen/Singin'
import CreateAccount from '../authen/CreateAccount'
import { Mycontext } from "@/components/MyProvider";
import axios from 'axios'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { IoCalendarSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  const thaiIcon = '/symbol/Thailand.svg'
  
  const [isSingin, setSingin] = useState<boolean>(false)
  const [isCreateAccount, setCreateAccount] = useState<boolean>(false)

  const myPath:string = usePathname()
  const isMemberPage:boolean = myPath.includes('/details')

  const context = useContext(Mycontext)

  useEffect(() => {
    if(isSingin || isCreateAccount){
      document.body.classList.add('overflow-hidden')
    }
    else{
      document.body.classList.remove('overflow-hidden')
    }
    
  },[isSingin, isCreateAccount])

  useEffect(() =>{
    const userSetup = async () => {
      try{
        if(!context?.account?.isLogin){
          const userInfo = await axios.get("/api/account/cookie")
          context?.setAccount(userInfo.data)
        }
      }
      catch(error){
      }
    }
    userSetup()
  },[])

  async function singout(){
    try{
      await axios.patch('/api/account/singout')

      context?.setAccount({
        id:-1,
        name: '',
        surname: '',
        img: '',
        role: '',
        isLogin: false
      })
      router.push('/')
    }
    catch(error){
      alert("Cannot connect to server.")
    }
  }
  
  return(
    <div className={`${!isMemberPage ? 'bg-linear-to-b from-black to-transparent' : ''} h-32 px-10`}>
      <div className='flex justify-between pt-4 items-center'>
        <Link href={'/'}>
          <div className='flex font-extrabold text-3xl'>
            <h1 className='text-white'>Hit</h1>
            <h1 className='text-yellow-300'>Car2</h1>
          </div>
        </Link>
        <div className='flex items-center'>
          <img className='h-6' src={thaiIcon}/>
          <span className='text-white text-lg ml-1.5'>| THB</span>
          {context?.account?.isLogin? 
            <Menu as="div" className="relative">
              <Menu.Button className='bg-white p-0.5 cursor-pointer ml-9 rounded-full'>
                <img className='rounded-full w-10 h-10' src={context.account.img}/>
              </Menu.Button>
                <Menu.Items className='absolute right-0 outline-none bg-white text-black w-79.25 overflow-y-auto z-100 rounded'>
                  <Menu.Item>
                    <button className='flex items-center bg-[#F8F3EB] w-full rounded py-4 pl-3'>
                      <img className='rounded-full w-10 h-10 bg-white p-1' src={context.account.img}/>
                      <p className='pl-2 font-bold text-[#A27100] text-xl'>{`${context.account.name} ${context.account.surname}`}</p>
                    </button>
                  </Menu.Item>
                  {context.account.role !== 'Admin' &&
                  <Menu.Item>
                    <div className='text-[#2F2F2F] mx-2 border-b border-solid border-[#D9D9D9]'>
                      <Link href={'/details/member/booking'} className='flex items-center w-full py-2 pl-3 mt-1  cursor-pointer hover:bg-gray-100'>
                          <IoCalendarSharp />
                          <p className='pl-3'>My Bookings</p>
                      </Link>
                      <Link href={'/details/member/account'} className='flex items-center w-full py-2 pl-3 mb-1 cursor-pointer hover:bg-gray-100'>
                        <FaUserAlt />
                        <p className='pl-3'>Manage My Account</p>
                      </Link>
                    </div>
                  </Menu.Item>
                  }
                  <Menu.Item>
                    <div className='mx-2 text-[#2F2F2F] py-1'>
                      <button className='flex items-center w-full py-2 pl-3 cursor-pointer hover:bg-gray-100'
                        onClick={singout}>
                        <p>Sign Out</p>
                      </button>
                    </div>
                  </Menu.Item>
                </Menu.Items>
            </Menu>
            :
            <button className='bg-white rounded-lg text-lg font-medium w-32 h-9 ml-9 cursor-pointer hover:bg-gray-100'
              onClick={() => setSingin(true)}>Sing In
            </button>
          }
        </div>
      </div>
      <div >
        {isSingin && <Singin setSingin={setSingin} setCreateAccount={setCreateAccount}/>}
        {isCreateAccount && <CreateAccount setSingin={setSingin} setCreateAccount={setCreateAccount}/>}
      </div>
    </div>
  )
  
}

export default Navbar