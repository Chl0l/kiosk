import "reflect-metadata";
import { startStandaloneServer } from "@apollo/server/standalone";
import { HelloResolver } from "./resolvers/HelloResolver";
import { getDataSource } from "./database";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";

const PORT = 4000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: true,
  });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  await getDataSource();
  console.log(`🚀  Server ready at: ${url}`);
};

startApolloServer();
