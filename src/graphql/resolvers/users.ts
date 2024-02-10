import prisma from "@/lib/prisma/prisma";
import { QueryResolvers, Role, User as GeneratedUser } from "../__generated__/types";

// Function to get a user by ID along with their bookings and the rooms for those bookings
const getUserById: QueryResolvers['user'] = async (_, { id }) => {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            bookingsMade: {
                include: {
                    room: true,
                },
            },
        },
    });

    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        luxID: user.luxID,
        role: user.role as Role,
        bookingsMade: user.bookingsMade.map(booking => ({
            id: booking.id,
            roomId: booking.roomId,
            user: { id: user.id, firstName: user.firstName }, // Simplify as needed
            userId: user.id,
            room: {
                name: booking.room.name,
                id: booking.room.id,
            },
            time: booking.time.toISOString(),
            duration: booking.duration.toNumber(),
        })),
    } as GeneratedUser
};

const getUsers: QueryResolvers['users'] = async () => {
    // Fetch users from database
    const users = await prisma.user.findMany();

    return users.map(user => ({
        id: user.id,
        email: user.email,
        luxID: user.luxID,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role as Role
    }));
};


// Function to get all users
export { getUserById, getUsers }