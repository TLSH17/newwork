import jsonfile from "jsonfile";

// export async function readJsonfile(filepath: string) {
//   const data = await jsonfile.readFile(filepath);
//   return data;
// }

export function readJsonfile<T>(filepath: string) {
  return jsonfile.readFile(filepath) as Promise<Array<T>>;
}

export function writeJsonFile(filepath: string, data: any) {
  return jsonfile.writeFile(filepath, data, { spaces: 2 });
}
