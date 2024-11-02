import prisma from "./Prisma";
enum SeatStatus {
    AVAILABLE = 'AVAILABLE',
    BLOCKED = 'BLOCKED',
    BOOKED = 'BOOKED',
    SELECTED = 'SELECTED'
}
async function updateSeatStatus(seatId: number, newStatus: SeatStatus) {
    return await prisma.$transaction(async (prisma) => {
        const seat = await prisma.seat.findUnique({
            where: { id: seatId },
        });
        if (!seat) {
            throw new Error(`Seat with id ${seatId} not found.`);
        }

        if (seat.status === newStatus) {
            throw new Error(`Seat is already ${newStatus}.`);
        }
        const updatedSeat = await prisma.seat.update({
            where: { id: seatId },
            data: { status: newStatus },
        });

        return updatedSeat;
    });
}
export async function seatBook(seatId: number) {
    return updateSeatStatus(seatId, SeatStatus.BOOKED);
}
export async function seatBlock(seatId: number) {
    return updateSeatStatus(seatId, SeatStatus.BLOCKED);
}
export async function seatAvailable(seatId: number) {
    const newStatus ='AVAILABLE'
    return await prisma.$transaction(async (prisma) => {
        const seat = await prisma.seat.findUnique({
            where: { id: seatId },
        });
        if (!seat) {
            throw new Error(`Seat with id ${seatId} not found.`);
        }
        if(seat.status === 'BOOKED')throw new Error(`Seat is already BOOKED.`);
        if (seat.status === newStatus) {
            throw new Error(`Seat is already ${newStatus}.`);
        }
        const updatedSeat = await prisma.seat.update({
            where: { id: seatId },
            data: { status: newStatus },
        });

        return updatedSeat;
    });
}
export async function seatSelected(seatId: number) {
    return updateSeatStatus(seatId, SeatStatus.SELECTED);
}
