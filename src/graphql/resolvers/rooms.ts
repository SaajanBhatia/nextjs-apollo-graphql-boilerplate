import prisma from "@/lib/prisma/prisma";
import { Role, MutationResolvers, Room as GeneratedRoom, QueryResolvers } from "../__generated__/types";

const updateRoomStatus: MutationResolvers['updateRoomStatus'] = async (_, { roomID, status }) => {
    const room = await prisma.room.update({
        where: { id: roomID },
        data: { active: status }
    })
    return {
        active: room.active,
        id: room.id,
        name: room.name,
        timeStart: room.timeStart.toNumber(),
        timeEnd: room.timeEnd.toNumber()
    } as GeneratedRoom
}

const createNewRoom: MutationResolvers['createNewRoom'] = async (_, { name, active, timeStart, timeEnd }) => {
    const newRoom = await prisma.room.create({
        data: {
            name: name,
            active: active,
            timeStart: timeStart,
            timeEnd: timeEnd
        }
    })
    return {
        active: newRoom.active,
        id: newRoom.id,
        name: newRoom.name,
        timeStart: newRoom.timeStart.toNumber(),
        timeEnd: newRoom.timeEnd.toNumber()
    } as GeneratedRoom
}

const updateRoom: MutationResolvers['updateRoom'] = async (_, args) => {
    const { roomID, name, timeStart, timeEnd } = args;

    // Construct an update object, only including provided fields
    const updateData: { name?: string; timeStart?: number; timeEnd?: number } = {};

    if (name !== (undefined || null)) {
        updateData.name = name;
    }
    if (timeStart !== (undefined || null)) {
        updateData.timeStart = timeStart;
    }
    if (timeEnd !== (undefined || null)) {
        updateData.timeEnd = timeEnd;
    }

    // Perform the update operation
    const updatedRoom = await prisma.room.update({
        where: { id: roomID },
        data: updateData,
    });

    // Return the updated room
    return {
        active: updatedRoom.active,
        id: updatedRoom.id,
        name: updatedRoom.name,
        timeStart: updatedRoom.timeStart.toNumber(),
        timeEnd: updatedRoom.timeEnd.toNumber()
    } as GeneratedRoom
};

const deleteRoom: MutationResolvers['deleteRoom'] = async (_, { roomID }) => {
    const deletedRoom = await prisma.room.delete({
        where: { id: roomID }
    })
    // Return the updated room
    return {
        active: deletedRoom.active,
        id: deletedRoom.id,
        name: deletedRoom.name,
        timeStart: deletedRoom.timeStart.toNumber(),
        timeEnd: deletedRoom.timeEnd.toNumber()
    } as GeneratedRoom
}

const getAllRooms: QueryResolvers['getAllRooms'] = async () => {
    // Query the database for all rooms
    const rooms = await prisma.room.findMany({
        include: {
            bookings: {
                include: {
                    user: true, // Include user data for each booking
                },
            },
        },
    });

    // Map the Prisma rooms to match the GraphQL Room type
    return rooms.map(room => ({
        active: room.active,
        id: room.id,
        name: room.name,
        timeStart: room.timeStart.toNumber(),
        timeEnd: room.timeEnd.toNumber()
    })) as GeneratedRoom[];
};

const getSingleRoom: QueryResolvers['getSingleRoom'] = async (_, { roomID, dateFrom, dateTo }) => {
    // Convert dateFrom and dateTo to Date objects
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);

    // Query the database for the room with the specified ID
    const room = await prisma.room.findUnique({
        where: {
            id: roomID,
        },
        include: {
            bookings: {
                include: {
                    user: true, // Assuming you want to include user data in the bookings
                },
                where: {
                    AND: [
                        {
                            time: {
                                gte: startDate,
                            },
                        },
                        {
                            time: {
                                lte: endDate,
                            },
                        },
                    ],
                },
            },
        },
    });

    // Check if the room exists
    if (!room) {
        throw new Error(`Room with ID ${roomID} not found.`);
    }

    // Map the Prisma room object to match your GraphQL Room type, including filtered bookings
    return {
        id: room.id,
        name: room.name,
        active: room.active,
        bookings: room.bookings.map(booking => ({
            id: booking.id,
            time: booking.time.toISOString(), // Convert DateTime to ISO String format
            duration: parseFloat(booking.duration.toString()), // Convert Decimal to Float
            user: {
                id: booking.user.id,
                firstName: booking.user.firstName,
                lastName: booking.user.lastName,
                email: booking.user.email,
                luxID: booking.user.luxID,
                role: booking.user.role as Role,
                // Omit bookingsMade to avoid deep nesting or circular references
            },
            room: {
                // Provide basic room info or consider omitting to avoid redundancy
                id: room.id,
                name: room.name,
                active: room.active,
                timeStart: parseFloat(room.timeStart.toString()),
                timeEnd: parseFloat(room.timeEnd.toString()),
            },
            userId: booking.userId,
            roomId: booking.roomId,
        })),
        timeStart: parseFloat(room.timeStart.toString()),
        timeEnd: parseFloat(room.timeEnd.toString()),
    };
};

export { updateRoomStatus, createNewRoom, updateRoom, deleteRoom, getAllRooms, getSingleRoom }