'use client'
import { Mycontext } from '@/components/MyProvider';
import StateNavbar from '@/components/ui/navbars/StateNavbar'
import { Menu } from '@headlessui/react'
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { useRouter } from "next/navigation";

export default function page() {
    const context = useContext(Mycontext)
    const router = useRouter()

    type bankOJ = {
        name:string,
        count:number
    }

    const [choose, setChoose] = useState<string>()
    const [bank, setBank] = useState<bankOJ>({name:'Bank of Ayudaya', count:0})
    const [price, setPrice] = useState<number>(0)

    //ข้อมูลบัตร
    const [cardNumber, setCardNumber] = useState<string>()
    const [cardHolderName, setCardHolderName] = useState<string>()
    const [expirationDate, setExpirationDate] = useState<string>()
    const [cvv, setCVV] = useState<string>()

    const [showQR, setShowQR] =useState<boolean>(false)

    const banksImg = [
        "/symbol/banks/ayudtaya.svg", 
        "/symbol/banks/bangkok.svg", 
        "/symbol/banks/k_bank.svg", 
        "/symbol/banks/krungT.svg",
        "/symbol/banks/SCB.svg"
    ]

    async function getPaymentInfo() {
        const bookingID = context?.bookingID
        try{
            const res = await axios.get('/api/booking/payment/info',{
                params:{
                    bookingID:bookingID
                }
            })
 
            if(res.data.noVehicle){
                alert("This car has been removed.")
                gotoDetails()
            }
            else{
                setPrice(Number(res.data.paymentPrice))
            }
        }
        catch(error){
            alert("This booking id does not exist.")
            gotoDetails()
        }
    }

    //รับจำนวนเงินที่ต้องจ่าย
    useEffect(() => {
        getPaymentInfo()
    }, [])

    //ชำระเงิน
    async function paymentSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(choose === "Card"){
            if(!cardNumber || !cardHolderName || !expirationDate || !cvv){
                alert('Please provide all the required information.')
                return
            }
        }
        else if(!choose){
            alert("Please choose a payment method.")
            return
        }

        try{
            await axios.patch('/api/booking/payment',{
                bookingId:context?.bookingID,
                paymentMethod:choose
            })
            router.push('/booking/confirmed')
        }
        catch(error){
            alert("Cannot connect to server")
        }
    }

    //ย้ายไปหน้า details
    function gotoDetails(){
        router.push('/details/member/booking')
    }

    return (
        <div className='bg-[#F8F3EB] relative h-screen lg:h-180'>
            <img className='w-full h-50 object-cover' src="/img/Car_bg4.svg"/>
            <div className='absolute top-0'><StateNavbar page={3}/></div>
            <div className='absolute top-35 w-full grid grid-cols-[4fr_2fr] gap-5 px-30 xl:px-60 2xl:px-80'>
                <div>
                    <form onSubmit={paymentSubmit}>
                        <div className='bg-white rounded-2xl w-full text-[#2F2F2F] px-7 pb-2 mb-5'>
                            <div className='flex justify-between items-center pt-4 pb-2'>
                                <h1 className='font-bold text-[26px]'>Select a Payment Method</h1>
                                <div>
                                    <span className='text-xs text-[#6B7280]'>Please secure your booking within</span>
                                    <span className='text-sm font-semibold ml-1'>00:30:30</span>
                                </div>
                            </div>
                            <div className={`border border-[#6B7280] rounded-lg px-5 mb-3
                                ${choose === "Card" && 'border-[#A27100] bg-linear-to-r from-[#FFCC0033] to-white pb-4'}`}>
                                <div className='flex items-center justify-between my-3'>
                                    <div className='flex items-center'>
                                        <input className='accent-[#A27100]' type="radio" name="payment" value="Card" 
                                            onChange={(e) => setChoose(e.target.value)}/>
                                        <h2 className='ml-5 font-semibold text-xl'>New Credit/debit Card</h2>
                                    </div>
                                    <img src="/img/payment/cards logo.svg"/>
                                </div>
                                {choose === "Card" &&
                                    <div>
                                        <div className='border border-[#D9D9D9] rounded-lg bg-white h-10 mb-3 flex items-center pl-3'>
                                            <input className='outline-none' type="text" placeholder='Card Number'
                                                onChange={(e) => setCardNumber(e.target.value)}/>
                                        </div>
                                        <div className='border border-[#D9D9D9] rounded-lg bg-white h-10 mb-3 flex items-center pl-3'>
                                            <input className='outline-none' type="text" placeholder='Cardholder Name'
                                                onChange={(e) => setCardHolderName(e.target.value)}/>
                                        </div>
                                        <div className='flex justify-between gap-3'>
                                            <div className='border border-[#D9D9D9] rounded-lg bg-white w-full h-10 flex items-center pl-3'>
                                                <input className='outline-none' type="text" placeholder='Expiration Date'
                                                    onChange={(e) => setExpirationDate(e.target.value)}/>
                                            </div>
                                            <div className={`border border-[#D9D9D9] rounded-lg bg-white w-full h-10 
                                                flex items-center justify-between px-3`}>
                                                <input className='outline-none w-fit' type="text" placeholder='CVV/CVC'
                                                    onChange={(e) => setCVV(e.target.value)}/>
                                                <img className='mr-7' src="/symbol/credit_card.svg"/>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className={`border border-[#6B7280] rounded-lg px-5 mb-3
                                ${choose === "Bank" && 'border-[#A27100] bg-linear-to-r from-[#FFCC0033] to-white pb-4'}`}>
                                <div className='flex items-center justify-between my-3'>
                                    <div className='flex items-center'>
                                        <input className='accent-[#A27100]' type="radio" name="payment" value="Bank" 
                                            onChange={(e) => setChoose(e.target.value)}/>
                                        <h2 className='ml-5 font-semibold text-xl'>Bank Transfer</h2>
                                    </div>
                                    <img src="/img/payment/banks logo.svg"/>
                                </div>
                                {choose === "Bank" &&
                                    <Menu as="div" className='relative'>
                                        <Menu.Button className={`border border-[#A27100] rounded-lg h-10 w-9/12 
                                            flex items-center justify-between px-3 bg-white cursor-pointer`}>
                                            <div className='flex items-center'>
                                                <img src={banksImg[bank.count]}/>
                                                <span className='ml-3'>{bank.name}</span>
                                            </div>
                                            <SlArrowDown />
                                        </Menu.Button>
                                        <Menu.Items className='absolute outline-none bg-white w-50'>
                                            <Menu.Item>
                                                <button type="button" className='flex items-center cursor-pointer hover:bg-amber-100 w-full py-1'
                                                    onClick={() => setBank({name:'Bank of Ayudaya', count:0})}>
                                                    <img className='mx-3' src={banksImg[0]}/>
                                                    <span>Bank of Ayudaya</span>
                                                </button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button type="button" className='flex items-center cursor-pointer hover:bg-blue-200 w-full py-1'
                                                    onClick={() => setBank({name:'Bangkok Bank', count:1})}>
                                                    <img className='mx-3' src={banksImg[1]}/>
                                                    <span>Bangkok Bank</span>
                                                </button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button type="button" className='flex items-center cursor-pointer hover:bg-green-100 w-full py-1'
                                                    onClick={() => setBank({name:'Kasikorn Bank', count:2})}>
                                                    <img className='mx-3' src={banksImg[2]}/>
                                                    <span>Kasikorn Bank</span>
                                                </button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button type="button" className='flex items-center cursor-pointer hover:bg-blue-100 w-full py-1'
                                                    onClick={() => setBank({name:'Krung Thai Bank', count:3})}>
                                                    <img className='mx-3' src={banksImg[3]}/>
                                                    <span>Krung Thai Bank</span>
                                                </button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button type="button" className='flex items-center cursor-pointer hover:bg-purple-200 w-full py-1'
                                                    onClick={() => setBank({name:'SCB', count:4})}>
                                                    <img className='mx-3' src={banksImg[4]}/>
                                                    <span>SCB</span>
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                }
                            </div>
                            <div className={`border border-[#6B7280] rounded-lg h-14 flex items-center justify-between px-5 mb-3
                                ${choose === "Qr" && 'border-[#A27100] bg-linear-to-r from-[#FFCC0033] to-white'}`}>
                                <div className='flex items-center'>
                                    <input className='accent-[#A27100]' type="radio" name="payment" value="Qr" 
                                        onChange={(e) => setChoose(e.target.value)}/>
                                    <div className='ml-5'>
                                        <h2 className='font-semibold text-xl'>QR PromptPay</h2>
                                        <p className='text-[#6B7280] text-sm'>Scan to pay using a banking app</p>
                                    </div>
                                </div>
                                <img src="/img/payment/promptpay logo.svg"/>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <button type='button' 
                                className={`text-[#c58b03] border border-[#c58b03] w-full rounded-lg h-13.5 
                                    font-bold text-xl cursor-pointer hover:border-[#f1ac09] hover:text-[#f1ac09] mb-5`}
                                onClick={() => gotoDetails()}>
                                Pay later
                            </button>
                            <button type='submit' className='bg-[#A27100] text-white w-full rounded-lg h-13.5 font-bold text-xl cursor-pointer mb-5 hover:bg-[#ac7801]'>
                                Pay {price.toFixed(2)} THB
                            </button>
                        </div>
                    </form>
                </div>
                <div className='bg-white rounded-2xl w-full text-[#2F2F2F] h-fit'>
                    <div className='border-b border-dashed border-[#D9D9D9] font-bold text-base mx-4'>
                        <h3 className='mt-2 mb-1'>Car rental payment</h3>
                    </div>
                    <h3 className='font-bold ml-4 mt-1'>Price Details</h3>
                    <div className='flex justify-between text-[#6B7280] mx-4 text-sm border-b border-dashed border-[#D9D9D9] pb-2'>
                        <span>Prepay Online</span>
                        <span>THB {price.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between font-bold text-2xl mx-4 my-4'>
                        <h2>Total</h2>
                        <h2>THB {price.toFixed(2)}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}


/*context?.setBookingID(-1) */