import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"

export async function PATCH(req: NextRequest) {
    console.log('PATCH email address.')
    try{
        const {birth} = await req.json()

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

        // อัปเดท วันเกิด
        await prisma.user.update({
            where:{user_id:userID},
            data:{
                date_of_birth:birth
            }
        })


        return NextResponse.json({ success: true })
    }
    catch(error){
        console.log(error)
        return NextResponse.json({ success: false })
    }
}