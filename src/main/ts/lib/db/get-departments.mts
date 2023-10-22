/**
 * @module get-departments
 */

import { Department } from "../department.mjs";
import { connectionPool } from "./connection-pool.mjs";

export const getDepartments = async (): Promise<Department[]> => ((await connectionPool.execute("SELECT * FROM department"))[0] as {id: number, name: string}[]).map(({id, name}) => new Department(id, name));

export default getDepartments;
