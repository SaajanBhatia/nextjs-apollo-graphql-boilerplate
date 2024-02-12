import prisma from "@/lib/prisma/prisma";
import { Booking as GeneratedBooking, MutationResolvers, QueryResolvers, Role } from "../__generated__/types";

const createNewBooking: MutationResolvers['createNewBooking'] = async (_, args) => {
    const { userID, time, duration, roomID } = args;

    // Create the booking in the database
    const newBooking = await prisma.booking.create({
        data: {
            time,
            duration,
            userId: userID, // Ensure field names match those in your Prisma schema
            roomId: roomID,
        },
        include: {
            user: true,
            room: true, // Make sure to include the room to fetch required fields
        },
    });

    // Make sure the return matches the GraphQL `Booking` type structure
    return {
        id: newBooking.id,
        time: newBooking.time.toISOString(),
        duration: newBooking.duration.toNumber(),
        user: {
            email: newBooking.user.email,
            luxID: newBooking.user.luxID,
            firstName: newBooking.user.firstName,
            lastName: newBooking.user.lastName,
            id: newBooking.user.id,
            role: newBooking.user.role as Role
        },
        room: {
            name: newBooking.room.name,
            active: newBooking.room.active,
            timeStart: newBooking.room.timeStart.toNumber(),
            timeEnd: newBooking.room.timeEnd.toNumber(),
            id: newBooking.room.id,
        },
        userId: newBooking.userId,
        roomId: newBooking.roomId
    };
};

const updateBooking: MutationResolvers['updateBooking'] = async (_, { bookingID, duration, time }) => {
    // Convert duration to an appropriate format if needed
    // Assuming duration is expected to be a decimal or similar for Prisma
    const durationDecimal = duration ? duration : undefined;

    // Update the booking in the database
    const updatedBooking = await prisma.booking.update({
        where: {
            id: bookingID,
        },
        data: {
            ...(time && { time: new Date(time) }), // Update time if provided
            ...(duration && { duration: durationDecimal }), // Update duration if provided
        },
        include: {
            user: true, // Assuming you need user info for the Booking return type
            room: true, // Assuming you need room info for the Booking return type
        },
    });

    return {
        id: updatedBooking.id,
        userId: updatedBooking.userId,
        roomId: updatedBooking.roomId,
        time: updatedBooking.time.toISOString(),
        duration: updatedBooking.duration.toNumber(),
    } as GeneratedBooking;
};

const deleteBooking: MutationResolvers['deletebooking'] = async (_, { bookingID }) => {
    const deletedBooking = await prisma.booking.delete({
        where: {
            id: bookingID
        }
    })
    return {
        id: deletedBooking.id,
        userId: deletedBooking.userId,
        roomId: deletedBooking.roomId,
        time: deletedBooking.time.toISOString(),
        duration: deletedBooking.duration.toNumber(),
    } as GeneratedBooking;
}

const getDateBookings: QueryResolvers['getDateBookings'] = async (_, { date }) => {
    // Parse the provided date and create a Date object
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0); // Set to the beginning of the day

    // Calculate the end of the day by adding one day to the start date and subtracting 1 millisecond
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    endDate.setMilliseconds(-1);

    // Query the database for bookings within the specified date range
    const bookings = await prisma.booking.findMany({
        where: {
            AND: [
                {
                    time: {
                        gte: startDate, // Greater than or equal to the start of the day
                    },
                },
                {
                    time: {
                        lte: endDate, // Less than or equal to the end of the day
                    },
                },
            ],
        },
        include: {
            user: true, // Assuming you need user info
            room: true, // Assuming you need room info
        },
    });

    // Return the bookings. The array could be empty if there are no bookings for the given day.
    return bookings.map((booking) => ({
        id: booking.id,
        time: booking.time.toISOString(),
        duration: booking.duration.toNumber(),
        user: {
            email: booking.user.email,
            luxID: booking.user.luxID,
            firstName: booking.user.firstName,
            lastName: booking.user.lastName,
            id: booking.user.id,
            role: booking.user.role as Role
        },
        room: {
            name: booking.room.name,
            active: booking.room.active,
            timeStart: booking.room.timeStart.toNumber(),
            timeEnd: booking.room.timeEnd.toNumber(),
            id: booking.room.id,
        },
        userId: booking.userId,
        roomId: booking.roomId
    }));
};

const getSingleBooking: QueryResolvers['getSingleBooking'] = async (_, { bookingID }) => {
    // Query the database for a booking with the specified ID
    const booking = await prisma.booking.findUnique({
        where: {
            id: bookingID,
        },
        include: {
            user: true, // Assuming you need user info for the Booking type
            room: true, // Assuming you need room info for the Booking type
        },
    });

    // If a booking is found, return it, otherwise return null
    if (!booking) {
        return null;
    }

    // Map the Prisma booking object to match your GraphQL Booking type
    // This might involve converting data types or structuring nested objects
    return {
        id: booking.id,
        time: booking.time.toISOString(),
        duration: booking.duration.toNumber(),
        user: {
            email: booking.user.email,
            luxID: booking.user.luxID,
            firstName: booking.user.firstName,
            lastName: booking.user.lastName,
            id: booking.user.id,
            role: booking.user.role as Role
        },
        room: {
            name: booking.room.name,
            active: booking.room.active,
            timeStart: booking.room.timeStart.toNumber(),
            timeEnd: booking.room.timeEnd.toNumber(),
            id: booking.room.id,
        },
        userId: booking.userId,
        roomId: booking.roomId
    };
};


export { createNewBooking, updateBooking, deleteBooking, getDateBookings, getSingleBooking }