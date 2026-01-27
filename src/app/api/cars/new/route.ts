import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

enum Gear {
    Manual = 'Manual',
    Automatic = 'Automatic'
}
enum Energy {
    Fuel = 'Fuel',
    Hybrid = 'Hybrid',
    Electric = 'Electric'
}

export async function POST(req: NextRequest) {
    console.log('POST new car.')
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

        const file = data.get('file') as File

        if(!file){
            console.log('No file')
            return NextResponse.json({success: false})
        }

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

        if(account?.Role === 'Admin'){

            // รวมรูป
            const byte = await file.arrayBuffer()
            const buffer = Buffer.from(byte)

            // สร้าง path
            const fileExt = path.extname(file.name)
            const fileName = `${Date.now()}${fileExt}`

            const uploadDir = path.join(process.cwd(), 'public/img/carList')
            const filePath = path.join(uploadDir, fileName)

            // อัปโหลดรูป
            fs.writeFileSync(filePath, buffer)

            // เพื่มรถยนตร์
            await prisma.vehicle.create({
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
                    image_link:`/img/carList/${fileName}`,
                    status:'INACTIVE'
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