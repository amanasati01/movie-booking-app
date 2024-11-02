// import { Request, Response } from "express";
// import ApiError from "../utils/ApiError";
// import prisma from "../utils/Prisma";
// import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
// interface resType{
//     movie : string,
//     startAt : Date,
//     endAt : Date,
//     theater : string,
//     seatNo : string,
//     seatType : string,
//     amount : number,
// } 
// export async function bookTicket(req : Request , res : Response):Promise<void>{
//     try {
//         const id  = req.params.id
//         const ticketDetails : resType = req.body
//         if(!ticketDetails.movie || !ticketDetails.amount || !ticketDetails.endAt || !ticketDetails.seatType || !ticketDetails.seatNo || !ticketDetails.startAt || !ticketDetails.theater ){
//           throw new ApiError(400,'Send complete info of tickets');
//         }
//         const ticket = await prisma.ticket.create({
//             data: {
//               movie: ticketDetails.movie,
//               theater: ticketDetails.theater,
//               seatType: ticketDetails.seatType,
//               seatNo: ticketDetails.seatNo,
//               startAt: new Date(ticketDetails.startAt),
//               endAt: new Date(ticketDetails.endAt),
//               amount: ticketDetails.amount,
//               buyerId: Number(id) 
//             }
//           });
               
//         if(!ticket){
//             throw new ApiError(500, 'Failed to create ticket, please try again.');
//         }
//         res.status(201).json({
//             message: 'Ticket created successfully',
//             ticket
//           });
//     }catch (error) {
//         if(error instanceof ApiError){
//             res.status(error.statusCode).json({
//                 message : error.message,
//                 statuCode : error.statusCode
//                 })
//         }
//         else if(error instanceof PrismaClientInitializationError){
//             res.status(500).json({
//                 message: 'Database connection error. Please try again later.',
//                 statusCode: 500,
//             });
//         }
//         else if(error instanceof Error){
//             res.status(500).json({
//                 message: error.message,
//                 statusCode: 500,
//             }); 
//         }
//         else{
//             res.status(500).json({
//                 messsage : 'An unexpected error occured',
//                 statusCode : 500,
//             })
//         }
//     }    

// } 
import { Request, Response } from "express";
import {seatBook} from '../utils/Seats'

export default async function bookTicket(req:Request,res : Response) {
        try {
            const seatId = req.body
            const updatedSeat =await seatBook(seatId.id)
            res.status(201).json({
                statusCode : 201,
                message : "successfull",
                updatedSeat,
            })
        } catch (error) {
            if(error instanceof Error){
                res.status(500).json({
                    satusCoce : 500,
                    messsage : error.message
                })
            }else{
                res.status(500).json({
                    satusCode : 500,
                    messsage : "Unexpected error occured"
                })
            }
        }
}