import { type Department } from "../lib/department.mjs";

const DELINEATOR: string = " | ";

enum DepartmentKeys
{
    ID = "id",
    NAME = "name"
}

export const departmentsToStringGrid = (departments: Department[]): string =>
{
    const columnWidth: number[] = Object.keys(DepartmentKeys).map(roleEnumKey => roleEnumKey.length);

    departments.forEach(role =>
    {
        columnWidth[0] = Math.max(columnWidth[0], Math.floor(Math.log10(role.id)));
        columnWidth[1] = Math.max(columnWidth[1], role.name.length);
    });

    const firstRow: string = Object.keys(DepartmentKeys).map((employeeEnumKey, index) => employeeEnumKey.toLowerCase().padEnd(columnWidth[index])).join(DELINEATOR);

    const horizontalDelineator: string = columnWidth.map(width => "-".repeat(width)).join("---");

    const restOfRows: string[] = departments.map(department => Object.values(DepartmentKeys).map((depKey, index) => `${department[depKey]}`.padEnd(columnWidth[index])).join(DELINEATOR));

    const rowStringGrid: string = [horizontalDelineator, firstRow, horizontalDelineator, ...restOfRows, horizontalDelineator].join("\n");

    return rowStringGrid;
}
