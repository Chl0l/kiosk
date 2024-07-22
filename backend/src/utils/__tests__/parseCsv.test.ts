import path from "path";
import { parseCsv, TaxonomyNode } from "../parseCsv";

describe("parseCsv", () => {
  it("should parse the CSV file correctly", async () => {
    const filePath = path.resolve(__dirname, "../../../data/taxonomy.csv");
    const data = await parseCsv(filePath);

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(0);

    const firstItem: TaxonomyNode = {
      level: 1,
      topic: "ESRS S1",
      subtopic: "S1.SBM-3",
      questionLabel:
        "Disclosure of material impacts, risks and opportunities and how they interact with strategy and business model",
    };

    expect(data[0]).toEqual(firstItem);
  });
});
