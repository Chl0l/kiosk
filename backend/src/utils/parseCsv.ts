import fs from "fs";
import csv from "csv-parser";

export interface TaxonomyNode {
  id?: string;
  level: number;
  topic: string;
  subtopic: string;
  questionLabel: string;
  parent?: TaxonomyNode;
  children?: TaxonomyNode[];
}

export const parseCsv = async (filePath: string): Promise<TaxonomyNode[]> => {
  const data = await new Promise<TaxonomyNode[]>((resolve, reject) => {
    const rows: TaxonomyNode[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) =>
        rows.push({
          level: parseInt(data.level, 10),
          topic: data.topic,
          subtopic: data.subtopic,
          questionLabel: data["question label"],
        })
      )
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
  return data;
};
