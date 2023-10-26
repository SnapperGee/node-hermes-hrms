/**
 * @module read-departments
 */

import { Department } from "../../department.mjs";
import { connection } from "../connection.mjs";

export const readDepartments = async (): Promise<Department[]> => ((await connection.execute("SELECT * FROM department;"))[0] as {id: number, name: string}[]).map(({id, name}) => new Department(id, name));

export default readDepartments;
