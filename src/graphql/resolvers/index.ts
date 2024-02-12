// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
import { getUserById, getUsers, createUser, deleteUser, updateUser } from "./users";
import { createNewRoom, deleteRoom, getAllRooms, getSingleRoom, updateRoom, updateRoomStatus } from "./rooms";
import { createNewBooking, deleteBooking, getDateBookings, getSingleBooking, updateBooking } from "./bookings";
import { Resolvers } from "../__generated__/types";

export const resolvers: Resolvers = {
    Query: {
        user: getUserById,
        users: getUsers,
        getDateBookings: getDateBookings,
        getSingleBooking: getSingleBooking,
        getAllRooms: getAllRooms,
        getSingleRoom: getSingleRoom
    },
    Mutation: {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        updateRoomStatus: updateRoomStatus,
        createNewRoom: createNewRoom,
        updateRoom: updateRoom,
        deleteRoom: deleteRoom,
        createNewBooking: createNewBooking,
        updateBooking: updateBooking,
        deletebooking: deleteBooking
    }
};