/**
 * @module insert
 */

import { connection } from "./connection.mjs";

export const insertEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number): Promise<void> =>
{
    await connection.execute("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [firstName, lastName, roleId, managerId]);
};

export const insertRole = async (title: string, salary: number, departmentId: number): Promise<void> =>
{
    await connection.execute("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [title, salary, departmentId]);
};

export const insertDepartment = async (name: string): Promise<void> =>
{
    await connection.execute("INSERT INTO department (name) VALUES (?);", [name]);
}
