/**
 * @module insert
 */

import { connection } from "./connection.mjs";

export const insertRole = async (title: string, salary: number, departmentId: number): Promise<void> =>
{
    await connection.execute("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [title, salary, departmentId]);
};

export const insertDepartment = async (name: string): Promise<void> =>
{
    await connection.execute("INSERT INTO department (name) VALUES (?);", [name]);
}
