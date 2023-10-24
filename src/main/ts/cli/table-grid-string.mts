import { type Department } from "../lib/department.mjs";
import { EmployeeWithManagerName } from "../lib/employee.mjs";


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

const DELINEATOR: string = " | ";

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

    const secondRow: string = columnWidth.map(width => "-".repeat(width)).join(DELINEATOR);

    const restOfRows: string[] = employees.map(employee => Object.values(EmployeeKeys).map((empKey, index) => `${employee[empKey]}`.padEnd(columnWidth[index])).join(DELINEATOR));

    const rowStringGrid: string = [firstRow, secondRow, ...restOfRows].join("\n");

    return rowStringGrid;
}
