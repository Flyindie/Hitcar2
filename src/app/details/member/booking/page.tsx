'use client'
import MemberSidebar from '@/components/ui/detailsSidebar/MemberSidebar'
import React, { useEffect, useState } from 'react'
import BookingFilter from '@/components/ui/BookingFilter';
import BookingCard from '@/components/ui/BookingCard';
import axios from 'axios';

enum BookingStatus {
  Completed = 'Completed',
  Canceled = 'Canceled',
  Awaiting = 'Awaiting'
}
enum PaymentMethod {
  Card,
  Bank,
  Qr
}

type Driver = {
  driver_id:number
  created_at:Date
  name:string
  surname:String
  age:number
  email:string
  phone:string
  flight_number:string
}
type Pd = {
  pd_id:number
  pickup_date:Date
  dropoff_date:Date
  total_day:number

  airport:Airport
}

type Payment = {
  payment_id:number
  created_at:Date
  payment_method:PaymentMethod
  total_price:number
}
type Airport = {
  id:number
  region:string
  name:string
  city:string
  states:string
  country:string
  business_hour:string
}

type cardInfo = {
  booking_id:number
  created_at:Date
  status:BookingStatus
  user_id:number
  vehicle_id:number
  driver:Driver
  payment:Payment
  pd:Pd
}

export default function page() {
  //filter
  const [bookingFilter, setBookingFilter] = useState<string>('')
  const filterArray:string[] = ['All', 'Awaiting Payment', 'Completed', 'Canceled']

  //ข้อมูลการจอง
  const [bookings, setBookings] = useState<cardInfo[]>([])

  //ค้นหาข้อมูลการจองผ่าน
  async function searchBooking(){
    const res = await axios.get('/api/booking/list', {
        params:{
          filter: bookingFilter
        }
      })
    setBookings(res.data)
  }

  function setPaymentStatusMessage(status:BookingStatus){
    if(status === BookingStatus.Awaiting) 
      return('Awaiting Payment')
    else 
      return(status.toString())
  }

  useEffect(() => {
    try{
      searchBooking()
    }
    catch(error){
      console.log(error)
    }
  },[bookingFilter])

  return (
    <div className='relative grid grid-cols-1 md:grid-cols-[1fr_3fr] px-25 gap-5 pt-10'>
      <img className='absolute z-0 left-30 top-80' src="/img/Car_bg5.svg"/>
      <MemberSidebar/>
      <div className='relative z-1'>
        <BookingFilter bookingFilter={bookingFilter} setBookingFilter={setBookingFilter} filterArray={filterArray}/>
        {Array.isArray(bookings) ? bookings.map((booking) => (
          <BookingCard key={booking.booking_id}
            bookingID ={booking.booking_id}
            bookingDate ={new Date(booking.created_at)}
            bookingStatus ={setPaymentStatusMessage(booking.status)}
            airport ={booking.pd.airport.name}
            price ={booking.payment.total_price}
            pickupDate ={new Date(booking.pd.pickup_date)}
            dropoffDate ={new Date(booking.pd.dropoff_date)}
            picupAddress ={`${booking.pd.airport.name}, ${booking.pd.airport.city}, ${booking.pd.airport.country}`}
            dropoffAddress ={`${booking.pd.airport.name}, ${booking.pd.airport.city}, ${booking.pd.airport.country}`}
            renter ={booking.driver.name}
            paymentID = {booking.payment.payment_id}
            setBookingFilter = {setBookingFilter}
            bookingFilter = {bookingFilter}
          />
        )):
          <div className='w-full flex items-center justify-center'>
            <p className='text-white'>No booking information</p>
          </div>
        }
      </div>
    </div>
  )
}