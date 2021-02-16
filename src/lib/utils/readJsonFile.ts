import * as fs from "fs";

export default function (filePath: string) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    throw error;
  }
}
