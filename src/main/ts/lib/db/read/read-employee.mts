/**
 * @module read-employee
 */

import { type Role } from "../../role.mjs";
import { EmployeeWithManagerID, EmployeeWithManagerName } from "../../employee.mjs";
import { connectionPool } from "../connection-pool.mjs";

export const readEmployeeTable = async (roles: Role[]): Promise<EmployeeWithManagerID[]> => Promise.all(((await connectionPool.execute("SELECT * FROM employee;"))[0] as {id: number, first_name: string, last_name: string, role_id: number, manager_id: number}[])
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

export const readEmployeesView = async (): Promise<EmployeeWithManagerName[]> => Promise.all(((await connectionPool.execute("SELECT * FROM employees_view;"))[0] as {id: number, first_name: string, last_name: string, title: string, department: string, salary: number, manager: string}[])
    .map(async ({id, first_name, last_name, title, department, salary, manager}) => new EmployeeWithManagerName(id, first_name, last_name, title, salary, department, manager) ));

export default readEmployeeTable;
