/**
 * @module update
 */

import { connection } from "./connection.mjs";

export const updateEmployeeManager = async (idOfEmployee: number, idOfNewManager: number): Promise<void> =>
    { await connection.execute("UPDATE employee SET manager_id = ? WHERE id = ?", [idOfNewManager, idOfEmployee]) };

export const update = Object.freeze({
    employeeManager: updateEmployeeManager
});

export default update;
