import axios from 'axios';
import React, {useContext, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { Mycontext } from "@/components/MyProvider";
import { useRouter } from "next/navigation";

type singin = {
    setSingin:React.Dispatch<React.SetStateAction<boolean>>
    setCreateAccount:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Singin({setSingin, setCreateAccount}:singin) {

    const router = useRouter();

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const context = useContext(Mycontext)

    function gotoCreateAccount(){
        setCreateAccount(true)
        setSingin(false)
    }

    async function singin(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(!email || !password){
            alert('Please enter email and password')
        }

        try{
            const res = await axios.post('/api/account/singin', {email, password})
            if(res.data.authen == "succeed"){
                setSingin(false)

                const userInfo = await axios.get("/api/account/cookie")
                context?.setAccount(userInfo.data)


                if(userInfo.data.role === 'Admin'){
                    router.push('/details/admin/account')
                }
            }
            else{
                alert("The password or email address is incorrect.")
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className='absolute top-0 left-0 bg-[#0000006c] w-full h-screen flex justify-center items-center'>
            <div className='rounded-2xl bg-white w-full max-w-112.5 flex flex-col items-center px-3 py-4'>
                <div className='w-full flex justify-end'>
                    <button onClick={() => setSingin(false)}><IoMdClose className='w-5 cursor-pointer'/></button>
                </div>
                <h1 className='font-bold text-2xl mb-7 mt-2'>Sign In</h1>
                <form className='w-full px-5 text-sm' onSubmit={singin}>
                    <div className='border rounded-lg relative h-12 flex mb-3'>
                        <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Email</p>
                        <input className='ml-3 w-full focus:outline-none' type="email" onChange={(e) => setEmail(e.target.value)} 
                            placeholder='Please enter an email address'/>
                    </div>
                    <div className='border rounded-lg relative h-12 flex mb-3'>
                        <p className='absolute top-0 left-3 -translate-y-1/2 bg-white px-1'>Password</p>
                        <input className='ml-3 w-full focus:outline-none' type="password" onChange={(e) => setPassword(e.target.value)}
                            placeholder='Please enter your password'/>
                    </div>
                    <button className='bg-[#A27100] hover:bg-[#ac7801] text-white h-12 w-full rounded-lg text-lg font-bold mb-3 cursor-pointer'>Sign In</button>
                </form>
                <div className='w-full flex justify-end px-5 text-xs mb-10'>
                    <span className='text-[#6B7280B2]'>Don’t have an account?</span>
                    <button type='button' className='text-blue-700 ml-1 underline cursor-pointer' onClick={() => gotoCreateAccount()}>
                        Create one
                    </button>
                </div>
                <p className='text-xs text-[#6B7280B2] px-5'>
                    By signing or registering, you are deemed to have agreed to the HitCar.com Terms and Conditions and Privacy Statement.
                </p>
            </div>
        </div>
    )
}