import { type Department } from "../lib/department.mjs";
import { type Role } from "../lib/role.mjs";
import { type EmployeeWithManagerName } from "../lib/employee.mjs";

const DELINEATOR: string = " | ";

enum RoleKeys
{
    ID = "id",
    TITLE = "title",
    SALARY = "salary",
    DEPARTMENT = "department"
}

export const rolesToStringGrid = (roles: Role[]): string =>
{
    const columnWidth: number[] = Object.keys(RoleKeys).map(roleEnumKey => roleEnumKey.length);

    roles.forEach(role =>
    {
        columnWidth[0] = Math.max(columnWidth[0], Math.floor(Math.log10(role.id)));
        columnWidth[1] = Math.max(columnWidth[1], role.title.length);
        columnWidth[2] = Math.max(columnWidth[2], Math.floor(Math.log10(role.salary)));
        columnWidth[3] = Math.max(columnWidth[3], role.department.name.length);
    });

    const firstRow: string = Object.keys(RoleKeys).map((employeeEnumKey, index) => employeeEnumKey.toLowerCase().padEnd(columnWidth[index])).join(DELINEATOR);

    const horizontalDelineator: string = columnWidth.map(width => "-".repeat(width)).join("---");

    const restOfRows: string[] = roles.map(employee => Object.values(RoleKeys)
    .map((roleKey, index) => {
        if (roleKey === RoleKeys.DEPARTMENT)
        {
            return `${employee[roleKey].name}`.padEnd(columnWidth[index]);
        }

        return `${employee[roleKey]}`.padEnd(columnWidth[index]);
    })
    .join(DELINEATOR));

    const rowStringGrid: string = [horizontalDelineator, firstRow, horizontalDelineator, ...restOfRows, horizontalDelineator].join("\n");

    return rowStringGrid;
}

enum EmployeeKeys
{
    ID = "id",
    FIRST_NAME = "firstName",
    LAST_NAME = "lastName",
    TITLE = "title",
    DEPARTMENT = "department",
    SALARY = "salary",
    MANAGER = "manager"
}

export const employeesToStringGrid = (employees: EmployeeWithManagerName[]): string =>
{
    const columnWidth: number[] = Object.keys(EmployeeKeys).map(employeeEnumKey => employeeEnumKey.length);

    employees.forEach(employee =>
    {
        columnWidth[0] = Math.max(columnWidth[0], Math.floor(Math.log10(employee.id)));
        columnWidth[1] = Math.max(columnWidth[1], employee.firstName.length);
        columnWidth[2] = Math.max(columnWidth[2], employee.lastName.length);
        columnWidth[3] = Math.max(columnWidth[3], employee.title.length);
        columnWidth[4] = Math.max(columnWidth[4], employee.department.length);
        columnWidth[5] = Math.max(columnWidth[5], Math.floor(Math.log10(employee.salary)));
        columnWidth[6] = Math.max(columnWidth[6], employee.manager?.length ?? 4);
    });

    const firstRow: string = Object.keys(EmployeeKeys).map((employeeEnumKey, index) => employeeEnumKey.toLowerCase().padEnd(columnWidth[index])).join(DELINEATOR);

    const horizontalDelineator: string = columnWidth.map(width => "-".repeat(width)).join("---");

    const restOfRows: string[] = employees.map(employee => Object.values(EmployeeKeys).map((empKey, index) => `${employee[empKey]}`.padEnd(columnWidth[index])).join(DELINEATOR));

    const rowStringGrid: string = [horizontalDelineator, firstRow, horizontalDelineator, ...restOfRows, horizontalDelineator].join("\n");

    return rowStringGrid;
}
