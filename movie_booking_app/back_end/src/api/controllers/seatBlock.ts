import { Request, Response } from "express";
import {seatBlock} from '../utils/Seats'

export default async function blockTheSeat(req:Request,res : Response) {
        try {
            const seatId = req.body
            const updatedSeat =await seatBlock(seatId.id)
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