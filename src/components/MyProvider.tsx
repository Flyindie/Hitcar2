'use client'
import { useState, createContext} from "react";
import React from 'react'

export const Mycontext = createContext<ContextType | null>(null)

export type formS = {
  location:String
  picTime:String
  dropTime:String
  startDate:Date | null
  stopDate:Date | null
  country:String
  age:String
}

type Car = {
    vehicle_id: number
    model: string
    segment: string
    image_link: string
    price_per_day: number
    seats: number
    energy: string
    door: number
    gear: string
    baggage: number
}

type Account = {
    id:number
    name: string
    surname: string
    img: string
    role: string
    isLogin: boolean
}

type ContextType = {
  SearchForm: formS | null;
  setSearchForm: React.Dispatch<React.SetStateAction<formS | null>>;
  vehicle: Car | null;
  setVehicle: React.Dispatch<React.SetStateAction<Car | null>>;
  account: Account | null;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  bookingID: number
  setBookingID: React.Dispatch<React.SetStateAction<number>>;
};

export default function MyProvider({children}: Readonly<{children: React.ReactNode;}>) {
    const [SearchForm,setSearchForm] = useState<formS | null>({
        location: "",
        picTime: "",
        dropTime: "",
        startDate: new Date(),
        stopDate: new Date(),
        country: "",
        age: ""
    })
    const [vehicle, setVehicle] = useState<Car | null>({
        vehicle_id: -1,
        model: '',
        segment: '',
        image_link: '',
        price_per_day: 0,
        seats: 0,
        energy: '',
        door: 0,
        gear: '',
        baggage: 0
    })
    const [account, setAccount] = useState<Account | null>({
        id:-1,
        name: '',
        surname: '',
        img: '',
        role: '',
        isLogin: false
    })
    const [bookingID, setBookingID] = useState<number>(-1)

    return (
        <Mycontext.Provider value={{SearchForm, setSearchForm, vehicle, setVehicle, account, setAccount, bookingID, setBookingID}}>
            {children}
        </Mycontext.Provider>
    )
}