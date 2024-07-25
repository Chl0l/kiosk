import { DataSource } from "typeorm";
import fs from "fs";
import csvParser from "csv-parser";
import { Taxonomy } from "../entities/Taxonomy";

interface CsvRow {
  id: string;
  parentId?: string;
  topic: string;
  subtopic: string;
  level: number;
  questionLabel: string;
  answer?: string;
}

function transformRow(row: any): CsvRow {
  return {
    id: row["id"],
    parentId: row["parentId"],
    topic: row["topic"],
    subtopic: row["subtopic"],
    level: parseInt(row["level"], 10),
    questionLabel: row["question label"],
    answer: row["answer"],
  };
}

export const importCsvData = async (
  filePath: string,
  dataSource: DataSource
) => {
  const repository = dataSource.getRepository(Taxonomy);

  const data: CsvRow[] = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row: any) => {
      const transformedRow = transformRow(row);
      data.push(transformedRow);
    })
    .on("end", async () => {
      const existingRecords = await repository.find();

      const existingMap = new Map<string, Taxonomy>();
      existingRecords.forEach((record) => {
        existingMap.set(`${record.topic}-${record.subtopic}`, record);
      });

      const newRecords: Taxonomy[] = [];
      const updatedRecords: Taxonomy[] = [];

      data.forEach((row) => {
        const key = `${row.topic}-${row.subtopic}`;
        const existing = existingMap.get(key);

        if (existing) {
          if (
            existing.level !== row.level ||
            existing.questionLabel !== row.questionLabel
          ) {
            existing.level = row.level;
            existing.questionLabel = row.questionLabel;
            updatedRecords.push(existing);
          }
        } else {
          const newRecord = repository.create({
            topic: row.topic,
            subtopic: row.subtopic,
            level: row.level,
            questionLabel: row.questionLabel,
          });
          newRecords.push(newRecord);
        }
      });

      if (newRecords.length > 0) {
        await repository.save(newRecords);
      }

      if (updatedRecords.length > 0) {
        await repository.save(updatedRecords);
      }
    });
};
