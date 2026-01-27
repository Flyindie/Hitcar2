import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  console.log("POST booking is runing!")

  try{
    //อ่านข้อมูลที่รับมา
    const {
      user_id, 
      vehicle_id, 
      airport_id, 
      pickup_time, 
      dropoff_time, 
      start_date, 
      stop_date,
      driverName,
      driverSurname,
      driverAge,
      driverEmail,
      driverPhone,
      driverFlight
    } = await req.json()

    //นำนาทีและชั่วโมงมาบันทึกไว้ใน Date
    const [pickupHours, pickupMinutes] = pickup_time.split(":").map(Number)
    const [dropoffHours, dropoffMinutes] = dropoff_time.split(":").map(Number)

    const pickup_date = new Date(start_date);          
    pickup_date.setHours(pickupHours, pickupMinutes, 0, 0);

    const dropoff_date = new Date(stop_date);
    dropoff_date.setHours(dropoffHours, dropoffMinutes, 0, 0);


    //หาจำนวนวัน
    const oneDay = 24 * 60 * 60 * 1000;
    const diffMs:number = Math.abs(pickup_date.getTime() -  dropoff_date.getTime());
    const totalDay:number = Math.ceil(diffMs / oneDay) || 1

    //หาราคารถ
    const car = await prisma.vehicle.findFirst({
      where:{
        vehicle_id: vehicle_id
      },
      select:{
        price_per_day: true
      }
    })

    const totalPrice = totalDay * (car?.price_per_day || 0)

    //บันทึกข้อมูลการจอง
    const bookingRes = await prisma.booking.create({
      data: {
        status: 'Awaiting',
        user_id: user_id,
        vehicle_id: vehicle_id,

        payment: {
          create: {
            total_price: totalPrice,
          }
        },

        pd: {
          create: {
            airport_id: airport_id,
            pickup_date: pickup_date,
            dropoff_date: dropoff_date,
            total_day: totalDay,
          }
        },

        driver: {
          create: {
            name: driverName,
            surname: driverSurname,
            age: driverAge,
            email: driverEmail,
            phone: driverPhone,
            flight_number: driverFlight
          }
        }
      }
    })
    
    return (
      Response.json({ message: "complete", bookingID:bookingRes.booking_id}, {status:201})
    )
  }
  catch(error){
    Response.json({ message: "There is an error in the booking system." }, {status:500})
    console.log(error)
  }
}