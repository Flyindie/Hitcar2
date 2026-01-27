import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server'

enum Gear {
  Manual = 'Manual',
  Automatic = 'Automatic'
}
enum Energy {
  Fuel = 'Fuel',
  Hybrid = 'Hybrid',
  Electric = 'Electric'
}

export async function PATCH(req: NextRequest) {
    console.log('PATCH car details.')
    try{
        const data = await req.formData()

        const brand = data.get('brand') as string
        const model = data.get('model') as string
        const segment = data.get('segment') as string

        const gear = data.get('gear') as Gear
        const energy = data.get('energy') as Energy

        const seats = Number(data.get('seats'))
        const baggage = Number(data.get('baggage'))
        const door = Number(data.get('door'))
        const price_per_day = Number(data.get('price'))
        const id = Number(data.get('id'))

        // อ่าน token ใน cookie
        const cookie = await cookies()
        const token = cookie.get('token')
        const tokenString:string = token?.value || ''

        const secretKey:string = process.env.SECRET_KEY || 'default'

        const member = jwt.verify(tokenString, secretKey) as JwtPayload
        const account = await prisma.user.findFirst({where:{user_id: member.user_id}})
        const userID:number = account?.user_id || -1

        if(userID === -1){
            return NextResponse.json({success: false})
        }

        // ตรวจ Role
        if(account?.Role === 'Admin'){
            // แก้ไขข้อมูล
            await prisma.vehicle.update({
                where:{vehicle_id:id},
                data:{
                    brand:brand,
                    model:model,
                    segment:segment,
                    seats:seats,
                    baggage:baggage,
                    door:door,
                    gear:gear,
                    energy:energy,
                    price_per_day:price_per_day,
                }
            })
        }
        
        return NextResponse.json({ success: true })
    }
    catch(error){
        console.log(error)
        return NextResponse.json({ success: false })
    }
}