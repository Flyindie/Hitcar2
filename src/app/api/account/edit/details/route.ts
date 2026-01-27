import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"

export async function PATCH(req: NextRequest) {
    console.log('PATCH user details.')
    try{
        const {gender, region, name, surname} = await req.json()

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

        // อัปเดท รายละเอียด
        await prisma.user.update({
            where:{user_id:userID},
            data:{
                gender:gender,
                region:region,
                name:name,
                surname:surname
            }
        })


        return NextResponse.json({ success: true })
    }
    catch(error){
        console.log(error)
        return NextResponse.json({ success: false })
    }
}