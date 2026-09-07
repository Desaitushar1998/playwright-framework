import * as fs from 'fs';
import * as path from 'path';

/**
 * Reads and parses any JSON file under the data folder.
 * Keeps spec files free of fs/path handling and file paths.
 */
export function readJsonData<T>(fileName: string): T {
  const filePath = path.resolve(__dirname, '..', 'data', fileName);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawContent) as T;
}
