/**
 * @module insert
 */

import { connection } from "./connection.mjs";

/**
 * Inserts a new employee into the database.
 *
 * @param firstName `string` first name of the employee to insert into the database.
 * @param lastName `string` last name of the employee to insert into the database.
 * @param roleId ID `number` of the role of the employee to insert into the database.
 * @param managerId ID `number` or `null` of the manager of the employee to
 *                  insert into the database. If the employee has no manager
 *                  then `null` can be used.
 */
export const insertEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null): Promise<void> =>
{
    await connection.execute("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [firstName, lastName, roleId, managerId]);
};

/**
 * Inserts a new role into the database.
 *
 * @param title `string` title of the role to insert into the database.
 * @param salary `number` salary of the role to insert into the database.
 * @param departmentId ID `number` of the department of the role to insert into
 *                     the database.
 */
export const insertRole = async (title: string, salary: number, departmentId: number): Promise<void> =>
{
    await connection.execute("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [title, salary, departmentId]);
};

/**
 * Inserts a new department into the database.
 * @param name `string` name of the department to insert into the database.
 */
export const insertDepartment = async (name: string): Promise<void> =>
{
    await connection.execute("INSERT INTO department (name) VALUES (?);", [name]);
}
