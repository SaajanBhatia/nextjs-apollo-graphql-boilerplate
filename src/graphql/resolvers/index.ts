// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
import { getUserById, getUsers } from "./users";
import { Resolvers } from "../__generated__/types";

export const resolvers: Resolvers = {
    Query: {
        user: getUserById,
        users: getUsers
    }
};