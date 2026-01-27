import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  console.log("POST account is runing!")

  try{
    //รับ email
    const { searchParams } = new URL(req.url)
    const email:string = searchParams.get('email') || ''
    if (!email) Response.json({message: "Please enter your email"}, {status:400})

    //หาข้อมูลผู้ใช้
    const account = await prisma.user.findFirst({
      where:{
          email: email
      }
    })
    
    //emailตรงกันหรือไม่
    return (
      Response.json({duplicateValues: (account?.email === email)}, {status:201})
    )
  }
  catch(error){
    Response.json({ message: "There is an error in the registration system." }, {status:500})
  }
}