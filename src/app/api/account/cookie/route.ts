import prisma from "@/lib/prisma"
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"

export async function GET() {
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

        //ส่งข้อมูลผู้ใช้
        const userInfo = {
            id:account?.user_id,
            name:account?.name,
            surname:account?.surname,
            img:account?.img_path,
            role:account?.Role,
            isLogin: (userID === member.user_id)
        }
        
        return (
            Response.json(userInfo, {status:201})
        )
    }
    catch(error){
        return(
            Response.json({ isLogin: false }, {status:500})
        )
    }
}