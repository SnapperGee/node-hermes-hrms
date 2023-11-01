import { connection } from "./connection.mjs";

export const deleteDepartment = async (departmentId: number): Promise<void> =>
    { await connection.execute("DELETE FROM department WHERE id = ?;", [departmentId]); }

export const deleteRole = async (roleId: number): Promise<void> =>
    { await connection.execute("DELETE FROM role WHERE id = ?;", [roleId]); }

export const deleteEmployee = async (employeeId: number): Promise<void> =>
    { await connection.execute("DELETE FROM employee WHERE id = ?;", [employeeId]); }

export const deleteQuery = Object.freeze({
    department: deleteDepartment,
    role: deleteRole,
    employee: deleteEmployee
});

export default deleteQuery;
