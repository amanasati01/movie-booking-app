import { Request, Response } from "express";
import ApiError from "../utils/ApiError";
import prisma from "../utils/Prisma";
import { log } from "console";

interface TheaterDetail {
  id: number;
  movieName: string;
  showTime: string;
}

export default async function seatData(req: Request, res: Response) {
   try {
    const theater : TheaterDetail = req.body
    console.log(" theater id " , theater.id);
    console.log(" theater  " , theater);
    if(!theater.id || theater.id == 0 || !theater.movieName || !theater.showTime){
        throw new ApiError(400," please send all details related to ")
    }
    const movie = await prisma.movie.findUnique({
        where :{
            title : theater.movieName
        }
    })
    console.log("Searching for show");
    const show = await prisma.showtime.findFirst({
        where :{
            movieId: movie?.id,
            time : theater.showTime
        }
    })
    console.log("Now searching for seat");
    const seat = await prisma.seat.findMany({
     where :{
       theaterId : theater.id,
       showtimeId :  show?.id
     }
    })
    if(!seat || seat.length == 0){
     throw new ApiError(400,'Seats not exists.')
    }
    console.log("Now sending seat response");
    res.status(200).json({
     message : "Sucessfully retrieve seat data",
     status : 200,
     data : seat
    })
   } catch (error) {
     if(error instanceof ApiError){
        res.status(error.statusCode).json({
            message : error.message,
            statusCode : error.statusCode
        })
     }
     else if(error instanceof Error){
        res.status(500).json({
            message : error.message,
            statusCode : 500
        })
     }
     else{
        res.status(500).json({
            message : "Unknown error occured",
            statusCode : 500
        })
     }
   }

}

