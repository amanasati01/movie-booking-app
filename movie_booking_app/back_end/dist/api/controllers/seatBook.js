"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bookTicket;
const Seats_1 = require("../utils/Seats");
function bookTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const seatId = req.body;
            const updatedSeat = yield (0, Seats_1.seatBook)(seatId.id);
            res.status(201).json({
                statusCode: 201,
                message: "successfull",
                updatedSeat,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    satusCoce: 500,
                    messsage: error.message
                });
            }
            else {
                res.status(500).json({
                    satusCode: 500,
                    messsage: "Unexpected error occured"
                });
            }
        }
    });
}
