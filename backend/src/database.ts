import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Taxonomy } from "./entities/Taxonomy";

dotenv.config();

let dataSource: DataSource;

export const getDataSource = async () => {
  if (!dataSource) {
    dataSource = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [Taxonomy],
      synchronize: true,
    });
    try {
      await dataSource.initialize();
      console.log("DataSource initialized successfully");
    } catch (error) {
      console.error("Error initializing DataSource:", error);
      throw error;
    }
  }
  return dataSource;
};
