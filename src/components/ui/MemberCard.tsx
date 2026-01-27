'use client'
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

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

function MemberCard({user_id, email, status, gender, region, img_path, phone, name, surname}:User) {

    const [showInfo, setShowInfo] = useState<boolean>(false)
    return (
        <div className='border border-solid border-white rounded-2xl text-white px-4 py-2 mb-5'>
            <div className="flex items-center justify-between">
                <div className='flex items-center'>
                    <img className='w-15 h-15 object-cover rounded-full border-2 border-solid border-white bg-white' src={img_path}/>
                    <span className='font-semibold ml-5'>{name} {surname}</span>
                </div>
                <button className='cursor-pointer' onClick={() => setShowInfo(!showInfo)}>
                    <IoIosArrowForward />
                </button>
            </div>
            {showInfo && 
                <div className="border-t border-solid border-white pt-3 mt-3 grid grid-cols-3 gap-2 font-extralight">
                    <span>user ID: {user_id}</span>
                    <span>email: {email}</span>
                    <span>status: {status}</span>
                    <span>gender: {gender}</span>
                    <span>region: {region}</span>
                    <span>phone: {phone}</span>
                </div>
            }
        </div>
    )
}

export default MemberCard