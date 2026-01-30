import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"

export async function DELETE(req: Request) {
    console.log('DELETE car.')
    try{
        const { searchParams } = new URL(req.url)
        const carID:number = Number(searchParams.get('car_id'))

        // อ่าน token ใน cookie
        const cookie = await cookies()
        const token = cookie.get('token')
        const tokenString:string = token?.value || ''

        const secretKey:string = process.env.SECRET_KEY || 'default'

        const member = jwt.verify(tokenString, secretKey) as JwtPayload
        const account = await prisma.user.findFirst({where:{user_id: member.user_id}})
        const userID:number = account?.user_id || -1

        if(userID === -1){
            return Response.json({success: false})
        }

        // ลบรถยนตร์
        if(account?.Role === 'Admin'){
            await prisma.vehicle.delete({
                where:{vehicle_id:carID}
            })

        }
        
        return Response.json({ success: true })
    }
    catch(error){
        console.log(error)
        return Response.json({ success: false })
    }
}