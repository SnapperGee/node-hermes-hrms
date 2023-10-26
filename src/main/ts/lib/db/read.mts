/**
 * @module db-read
 */

import { Role } from "../role.mjs";
import { Department } from "../department.mjs";
import { EmployeeWithManagerID, EmployeeWithManagerName } from "../employee.mjs";
import { connection } from "./connection.mjs";

export const readEmployeeTable = async (roles: Role[]): Promise<EmployeeWithManagerID[]> => Promise.all(((await connection.execute("SELECT * FROM employee;"))[0] as {id: number, first_name: string, last_name: string, role_id: number, manager_id: number}[])
    .map(async ({id, first_name, last_name, role_id, manager_id}) =>
    {
        const role = roles.find(role => role.id === role_id);

        if (role === undefined)
        {
            throw new Error(`${readEmployeeTable.name}: no role with id ${role_id}`);
        }

        return new EmployeeWithManagerID(id, first_name, last_name, role, manager_id)
    }
));

export const readEmployeesView = async (): Promise<EmployeeWithManagerName[]> => Promise.all(((await connection.execute("SELECT * FROM employees_view;"))[0] as {id: number, first_name: string, last_name: string, title: string, department: string, salary: number, manager: string}[])
    .map(async ({id, first_name, last_name, title, department, salary, manager}) => new EmployeeWithManagerName(id, first_name, last_name, title, salary, department, manager) ));

export const readRoles = async (departments: Department[]): Promise<Role[]> => ((await connection.execute("SELECT * FROM role;"))[0] as {id: number, title: string, salary: number, department_id: number}[])
    .map(({id, title, salary, department_id}) =>
    {
        const department = departments.find(department => department.id === department_id);

        if (department === undefined)
        {
            throw new Error(`${readRoles.name}: no department with id ${department_id}`);
        }

        return new Role(id, title, salary, department)
    }
);

export const readDepartments = async (): Promise<Department[]> => ((await connection.execute("SELECT * FROM department;"))[0] as {id: number, name: string}[]).map(({id, name}) => new Department(id, name));
