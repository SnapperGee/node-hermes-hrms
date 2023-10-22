/**
 * @module get-employee
 */

import { type Role } from "../role.mjs";
import { Employee } from "../employee.mjs";
import { connectionPool } from "./connection-pool.mjs";

export const getEmployeeTable = async (roles: Role[]): Promise<Employee[]> => Promise.all(((await connectionPool.execute("SELECT * FROM employee"))[0] as {id: number, first_name: string, last_name: string, role_id: number, manager_id: number}[])
    .map(async ({id, first_name, last_name, role_id, manager_id}) =>
    {
        const role = roles.find(role => role.id === role_id);

        if (role === undefined)
        {
            throw new Error(`${getEmployeeTable.name}: no role with id ${role_id}`);
        }

        return new Employee(id, first_name, last_name, role, manager_id)
    }
));

type T = {id: number, first_name: string, last_name: string, title: string, department: string, salary: number,manager: string | null};

export const getEmployeesView = async (): Promise<T[]> => Promise.all(((await connectionPool.execute("SELECT * FROM employees_view"))[0] as T[])
    .map(async ({id, first_name, last_name, title, department, salary, manager}) => ({id, first_name, last_name, title, department, salary, manager}) ));

export default getEmployeeTable;
