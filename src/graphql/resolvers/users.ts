import prisma from "@/lib/prisma/prisma";
import { QueryResolvers, Role, User as GeneratedUser, MutationResolvers } from "../__generated__/types";

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
    })) as GeneratedUser[];
};

const createUser: MutationResolvers['createUser'] = async (_, { firstName, lastName, email, luxID, password }) => {
    // Create the user in the database
    const newUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            luxID,
            password: password, // Store the hashed password from client side
        },
    });
    return {
        id: newUser.id,
        email: newUser.email,
        luxID: newUser.luxID,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role as Role, // This casting assumes that your GraphQL `ROLE` enum matches the Prisma `ROLE` enum values
    } as GeneratedUser;
}

const deleteUser: MutationResolvers['deleteUser'] = async (_, { userID }) => {
    const deletedUser = await prisma.user.delete({
        where: { id: userID }
    })
    return {
        id: deletedUser.id,
        email: deletedUser.email,
        luxID: deletedUser.luxID,
        firstName: deletedUser.firstName,
        lastName: deletedUser.lastName,
        role: deletedUser.role as Role,
    } as GeneratedUser;
}

const updateUser: MutationResolvers['updateUser'] = async (_, args) => {
    const { userID, firstName, lastName, password } = args;

    // Create an object to hold the fields to update, initially empty
    const updateData: Record<string, any> = {};

    // Conditionally add fields to updateData if they are provided
    if (firstName !== undefined) {
        updateData.firstName = firstName;
    }
    if (lastName !== undefined) {
        updateData.lastName = lastName;
    }
    if (password !== undefined) {
        // Assume hashPassword is an async function that hashes the password
        updateData.password = password;
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
        where: {
            id: userID,
        },
        data: updateData,
    });

    // Return the updated user, ensuring not to include the hashed password
    return {
        id: updatedUser.id,
        email: updatedUser.email,
        luxID: updatedUser.luxID,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role as Role,
        // Ensure any sensitive fields like passwords are not returned
    } as GeneratedUser;
};



// Function to get all users
export { getUserById, getUsers, createUser, deleteUser, updateUser }