/**
 * @module create-role
 */

import { connection } from "../connection.mjs";

export const createRole = async (title: string, salary: number, departmentId: number): Promise<void> =>
{
    await connection.execute("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [title, salary, departmentId]);
};
