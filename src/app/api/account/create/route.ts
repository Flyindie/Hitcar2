import prisma from "@/lib/prisma"
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  console.log("POST account is runing!")

  try{
    const {email, password, region, phone, name, surname, gender} = await req.json()

    //hash รหัสผ่าน
    const round = 10
    const hashPassword:string = await bcrypt.hash(password, round)

    //สร้าง user ใหม่
    await prisma.user.create({
      data:{
        email: email,
        password: hashPassword,
        status: 'INACTIVE',
        region:region,
        phone:phone,
        name:name,
        surname:surname,
        gender:gender,
        img_path:'/symbol/Member.svg'
      }
    })
    
    return (
      Response.json({ message: "complete" }, {status:201})
    )
  }
  catch(error){
    Response.json({ message: "There is an error in the registration system." }, {status:500})
  }
}