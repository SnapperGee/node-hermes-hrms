/**
 * @module get-employees
 */

import { type Role } from "../role.mjs";
import { Employee } from "../employee.mjs";
import { connectionPool } from "./connection-pool.mjs";

export const getEmployees = async (roles: Role[]): Promise<Employee[]> => Promise.all(((await connectionPool.execute("SELECT * FROM employee"))[0] as {id: number, first_name: string, last_name: string, role_id: number, manager_id: number}[])
    .map(async ({id, first_name, last_name, role_id, manager_id}, index, employees) =>
    {
        const role = roles.find(role => role.id === role_id);

        if (role === undefined)
        {
            throw new Error(`${getEmployees.name}: no role with id ${role_id}`);
        }

        return new Employee(id, first_name, last_name, role, manager_id)
    }
));

export default getEmployees;
