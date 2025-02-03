import path from "path";
// import jsonfile from "jsonfile"
import { IBook } from "../models/IBook";
const jsonfile = require("jsonfile");

export class USerUtil {
  private static usersJsonPath = path.join(__dirname, "..", "db", "books.json");

  public static getAllUsersFromDB(): Promise<IBook[]> {
    return new Promise((resolve, reject) => {
      jsonfile.readFile(this.usersJsonPath, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    }
}
