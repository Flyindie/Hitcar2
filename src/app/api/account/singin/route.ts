import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    console.log("Singin is runing!")

    try{
        const {email, password} = await req.json()

        if(!email || !password){
            return(Response.json({ authen: "failed" }))
        }

        //หาด้วย email
        const account = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        const originalPassword:string = account?.password || ''
        if(!originalPassword) Response.json({ authen: "failed" })

        const cookie = await cookies()

        if(await bcrypt.compare(password, originalPassword)){
            //ถ้ารหัสผ่านถูก
            await prisma.user.update({
                where:{
                    email: email
                },
                data:{
                    status: 'ACTIVE'
                }
            })

            const theUser = {
                user_id:account?.user_id
            }

            //สร้าง token ที่อยู่ได้ 1 ชั่วโมง
            const secretKey:string = process.env.SECRET_KEY || 'default'
            const token = jwt.sign(theUser,secretKey,{ expiresIn: "1h" })
            cookie.set('token', token, {maxAge:60*60, httpOnly:true})
            
            return (
                Response.json({ authen: "succeed" })
            )
        }
        else{
            cookie.delete('token')
            return (
                Response.json({ authen: "failed" })
            )
        }
    }
    catch(error){
        console.log(error)
        Response.json({ message: "There is an error in the singin system." }, {status:500})
    }
}