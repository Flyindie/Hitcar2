'use client'
import AdminSidebar from '@/components/ui/detailsSidebar/AdminSidebar'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED'
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

type User = {
  user_id:number
  email:string
  status:Status
  gender:Gender
  region:string
  img_path:string
  phone:string
  name:string
  surname:string 
}

export default function page() {
  const [members, setMember] = useState<User[]>([])

  async function getMember() {
    const res = await axios.get('/api/account/list/admin')
    setMember(res.data)
  }

  useEffect(() => {
    try{
      getMember()
    }
    catch(error){
      alert('Cannot connect to server.')
    }
  },[])

  return (
    <div className='grid grid-cols-[1fr_3fr] px-25 gap-5 pt-10'>
      <div className='relative z-10'>
        <AdminSidebar/>
      </div>
      <div className='relative z-10'>
        <div className='border-[1.5px] border-solid border-[#FFFFFF66] rounded-2xl p-5 mb-3 backdrop-blur-xl'>
          <h1 className='text-white font-bold text-2xl pb-3 border-b border-solid border-[#D9D9D9] mb-5'>Admin list</h1>
          {members.map((member) => (
            <div key={member.user_id} className='flex items-center border border-solid border-white rounded-2xl text-white justify-between px-4 py-2 mb-5'>
              <div className='flex items-center'>
                <img className='w-15 h-15 object-cover rounded-full border-2 border-solid border-white bg-white' src={member.img_path}/>
                <span className='font-semibold ml-5'>{member.name} {member.surname}</span>
              </div>
              <HiOutlineDotsVertical/>
            </div>
          ))
            
          }
        </div>
      </div>
      <img className='absolute w-150 top-70 left-0' src="/img/Car_bg6.png"/>
    </div>
  )
}