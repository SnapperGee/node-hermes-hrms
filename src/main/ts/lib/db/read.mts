/**
 * @module read
 */

import { type Role } from "../role.mjs";
import { type Department } from "../department.mjs";
import { type Employee } from "../employee.mjs";
import { connection } from "./connection.mjs";

/**
 * Returns an array of (@link EmployeeWithManagerName}s with properties
 * populated from the database.
 *
 * @returns An array of (@link EmployeeWithManagerName}s with properties populated
 *          from the database.
 */
export const readEmployeesView = async (): Promise<Employee[]> =>
    (await connection.execute("SELECT * FROM employees_view;"))[0] as Employee[];

/**
 * Returns an array of (@link Role}s with properties populated from the database.
 *
 * @param departments The database roles to populate the employee roles.
 *
 * @returns An array of (@link Role}s with properties populated from the database.
 */
export const readRoles = async (): Promise<Role[]> =>
    (await connection.execute("SELECT * FROM roles_view;"))[0] as Role[];

/**
 * Returns an array of (@link Department}s with properties populated from the database.
 * @returns An array of (@link Department}s with properties populated from the database.
 */
export const readDepartments = async (): Promise<Department[]> =>
    (await connection.execute("SELECT * FROM department;"))[0] as Department[];

export const readManagersView = async (): Promise<{id: number, name: string}[]> =>
    (await connection.execute("SELECT * FROM managers_view;"))[0] as {id: number, name: string}[];

export const readEmployeesWithManagerIdView = async (managerId: number): Promise<Employee[]> =>
    (await connection.execute("SELECT id, first_name, last_name, title, department, salary FROM employees_with_manager_id_view WHERE manager_id = ?;", [managerId]))[0] as Employee[];
