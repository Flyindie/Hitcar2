import prisma from "@/lib/prisma"
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"

export async function PATCH() {
    console.log("POST account is runing!")

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


        //อัปเดทสถานะผู้ใช้
        await prisma.user.update({
            where:{user_id:userID},
            data:{
                status:'INACTIVE'
            }
        })

        //ลบ token
        cookie.delete("token");
        return (
            Response.json({status:201})
        )
    }
    catch(error){
        return(
            Response.json({status:500})
        )
    }
}