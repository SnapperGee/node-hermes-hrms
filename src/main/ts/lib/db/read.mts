/**
 * @module read
 */

import type { Employee, Role, Department } from "../db/model.mjs";
import { connection } from "./connection.mjs";

/**
 * Returns an array of (@link EmployeeWithManagerName}s with properties
 * populated from the database.
 *
 * @returns An array of (@link EmployeeWithManagerName}s with properties populated
 *          from the database.
 */
export const readEmployees = async (): Promise<Employee[]> =>
    (await connection.execute("SELECT id, name, title, department, salary, manager FROM employees_view;"))[0] as Employee[];

export const readEmployeesWithManagerId = async (managerId: number): Promise<Employee[]> =>
    (await connection.execute("SELECT id, name, title, department, salary FROM employees_view WHERE manager_id = ?;", [managerId]))[0] as Employee[];

export const readEmployeesWithDepartmentId = async (departmentId: number): Promise<Employee[]> =>
    (await connection.execute("SELECT id, name, title, salary, manager FROM employees_view WHERE department_id = ?;", [departmentId]))[0] as Employee[];

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

export const readManagers = async (): Promise<{id: number, name: string}[]> =>
    (await connection.execute("SELECT * FROM managers_view;"))[0] as {id: number, name: string}[];

export const readTotalRoleSalaries = async (): Promise<{role: string, total: number}[]> =>
    (await connection.execute("SELECT * FROM total_role_salary;"))[0] as {role: string, total: number}[];

export const read = Object.freeze({
    employees: readEmployees,
    employeesWithManagerId: readEmployeesWithManagerId,
    employeesWithDepartmentId: readEmployeesWithDepartmentId,
    roles: readRoles,
    departments: readDepartments,
    managers: readManagers,
    totalRoleSalaries: readTotalRoleSalaries
});

export default read;
