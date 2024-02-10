import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { resolvers } from "@/graphql/resolvers";
import { translateSchema } from "@/lib/apollo/translateSchema";

const schema = translateSchema();

const server = new ApolloServer({
    resolvers: resolvers,
    typeDefs: schema
})

const handler = startServerAndCreateNextHandler(server)

export const POST = async (req: NextRequest) => {
    return handler(req as NextRequest);
};

export const GET = async (req: NextRequest) => {
    return handler(req as NextRequest);
};