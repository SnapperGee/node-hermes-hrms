/**
 * @module read-roles
 */

import { type Department } from "../../department.mjs";
import { Role } from "../../role.mjs";
import { connectionPool } from "../connection-pool.mjs";

export const readRoles = async (departments: Department[]): Promise<Role[]> => ((await connectionPool.execute("SELECT * FROM role"))[0] as {id: number, title: string, salary: number, department_id: number}[])
    .map(({id, title, salary, department_id}) =>
    {
        const department = departments.find(department => department.id === department_id);

        if (department === undefined)
        {
            throw new TypeError(`${readRoles.name}: no department with id ${department_id}`);
        }

        return new Role(id, title, salary, department)
    }
);

export default readRoles;
