/**
 * @module create-department
 */

import { connection } from "../connection.mjs";

export const createDepartment = async (name: string): Promise<void> =>
{
    await connection.execute("INSERT INTO department (name) VALUES (?);", [name]);
}

export default createDepartment;
