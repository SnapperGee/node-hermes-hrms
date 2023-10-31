import { connection } from "./connection.mjs";

export const deleteDepartment = async (departmentId: number): Promise<void> =>
    { await connection.execute("DELETE FROM department WHERE id = ?;", [departmentId]); }

export const deleteRole = async (roleId: number): Promise<void> =>
    { await connection.execute("DELETE FROM role WHERE id = ?;", [roleId]); }
