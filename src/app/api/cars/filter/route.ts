import { Prisma, Energy } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    console.log("Get vehicles with filters!")

    const { searchParams } = new URL(req.url)

    const where: Prisma.vehicleWhereInput = {};

    //เงื่อนไข segment
    const segmentParam = searchParams.get("segment");
    if (segmentParam === "small") where.segment = "Small car";
    else if (segmentParam === "medium") where.segment = "Medium & Large";
    else if (segmentParam === "premium") where.segment = "Premium";
    else if (segmentParam === "suv") where.segment = "suv";

    //เงื่อนไข ราคา
    const priceParam = searchParams.get("price");
    if (priceParam === '<1200') where.price_per_day = {lt: 1200}
    else if (priceParam === '1200-1400') where.price_per_day = {gte: 1200, lte: 1400}
    else if (priceParam === '1401-1600') where.price_per_day = {gte: 1401, lte: 1600}
    else if (priceParam === '1601-1800') where.price_per_day = {gte: 1601, lte: 1800}
    else if (priceParam === '>1800') where.price_per_day = {gt: 1800}

    //เงื่อนไข ที่นั่ง
    const seatsParam = searchParams.get("seats");
    if (seatsParam === '4-5') where.seats = {gte: 4, lte: 5}
    else if (seatsParam === '6-7') where.seats = {gte: 6, lte: 7}
    else if (seatsParam === '8+') where.seats = {gte: 8}
    else if (seatsParam === 'Less') where.seats = {lt: 4}

    //เงื่อนไขเชื้อเพลิง
    const energyParam = searchParams.get('energy');
    if (energyParam && Object.values(Energy).includes(energyParam as any)) {
        where.energy = energyParam as Energy;
    }

    //ทำการค้นหา
    const vehicles = await prisma.vehicle.findMany({
        where,
    });

    return( Response.json(vehicles))
}