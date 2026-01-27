import prisma from "@/lib/prisma"

export async function GET() {
    console.log('GET admin list.')
    try{
        //หาข้อมูล admin
        const res = await prisma.user.findMany({
            where:{Role:'Admin'},
            select:{
                user_id:true,
                email:true,
                status:true,
                gender:true,
                region:true,
                img_path:true,
                phone:true,
                name:true,
                surname:true
            }
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