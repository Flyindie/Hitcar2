import prisma from "@/lib/prisma"
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"

export async function GET() {
    try{
        //อ่าน cookie
        const cookie = await cookies()
        const token = cookie.get('token')
        const tokenString:string = token?.value || ''

        const secretKey:string = process.env.SECRET_KEY || 'default'

        //ตรวจ user id
        const member = jwt.verify(tokenString, secretKey) as JwtPayload
        const account = await prisma.user.findFirst({where:{user_id: member.user_id}})
        const userID:number = account?.user_id || -1


        //หาข้อมูลผู้ใช้
        const res = await prisma.user.findFirst({
            where:{user_id: userID}
        })

        return(
            Response.json(res)
        )
    }
    catch(error){
        console.log(error)
        return(
            Response.json({status: 500})
        )
    }
}