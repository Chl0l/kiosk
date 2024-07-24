import "reflect-metadata";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getDataSource } from "./database";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { TaxonomyResolver } from "./resolvers/TaxonomyResolver";
import { importCsvData } from "./utils/importCsvData";

const PORT = 5000;
const startApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [TaxonomyResolver],
    validate: true,
  });
  const server = new ApolloServer({ schema });

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
    });

    const dataSource = await getDataSource();
    await importCsvData("./data/taxonomy.csv", dataSource);

    console.log(`🚀 Server ready at: ${url}`);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("EADDRINUSE")) {
        console.error(
          `Port ${PORT} is already in use. Please use a different port.`
        );
      } else {
        console.error("Failed to start server:", err);
      }
    } else {
      console.error("An unknown error occurred:", err);
    }
  }
};

startApolloServer();
