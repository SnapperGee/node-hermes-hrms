/**
 * @module create-department
 */

import { connection } from "../connection.mjs";

const whiteSpaceRegex: RegExp = /\s+/g;

export const createDepartment = async (name: string): Promise<void> =>
{
    await connection.execute("INSERT INTO department (name) VALUES (?);", [name]);
}
