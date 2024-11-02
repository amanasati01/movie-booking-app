"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seatData;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const Prisma_1 = __importDefault(require("../utils/Prisma"));
function seatData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const theater = req.body;
            console.log(" theater id ", theater.id);
            console.log(" theater  ", theater);
            if (!theater.id || theater.id == 0 || !theater.movieName || !theater.showTime) {
                throw new ApiError_1.default(400, " please send all details related to ");
            }
            const movie = yield Prisma_1.default.movie.findUnique({
                where: {
                    title: theater.movieName
                }
            });
            console.log("Searching for show");
            const show = yield Prisma_1.default.showtime.findFirst({
                where: {
                    movieId: movie === null || movie === void 0 ? void 0 : movie.id,
                    time: theater.showTime
                }
            });
            console.log("Now searching for seat");
            const seat = yield Prisma_1.default.seat.findMany({
                where: {
                    theaterId: theater.id,
                    showtimeId: show === null || show === void 0 ? void 0 : show.id
                }
            });
            if (!seat || seat.length == 0) {
                throw new ApiError_1.default(400, 'Seats not exists.');
            }
            console.log("Now sending seat response");
            res.status(200).json({
                message: "Sucessfully retrieve seat data",
                status: 200,
                data: seat
            });
        }
        catch (error) {
            if (error instanceof ApiError_1.default) {
                res.status(error.statusCode).json({
                    message: error.message,
                    statusCode: error.statusCode
                });
            }
            else if (error instanceof Error) {
                res.status(500).json({
                    message: error.message,
                    statusCode: 500
                });
            }
            else {
                res.status(500).json({
                    message: "Unknown error occured",
                    statusCode: 500
                });
            }
        }
    });
}
