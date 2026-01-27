import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "@/lib/prisma"
import path from 'path'
import fs from 'fs'

export async function POST(req: NextRequest) {
    console.log('POST image profile.')
    try{
        const data = await req.formData()

        const file:File | null = data.get('file') as unknown as File

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

        // รวมรูป
        const byte = await file.arrayBuffer()
        const buffer = Buffer.from(byte)

        // สร้าง path
        const fileExt = path.extname(file.name)
        const fileName = `${Date.now()}${fileExt}`

        const uploadDir = path.join(process.cwd(), 'public/profileImage')
        const filePath = path.join(uploadDir, fileName)

        // อัปโหลดรูป
        fs.writeFileSync(filePath, buffer)

        // อัปเดทที่อยู่ไฟล์
        await prisma.user.update({
            where:{user_id:userID},
            data:{
                img_path:`/profileImage/${fileName}`
            }
        })


        return NextResponse.json({ success: true })
    }
    catch(error){
        console.error
        return NextResponse.json({success: false})
    }
}