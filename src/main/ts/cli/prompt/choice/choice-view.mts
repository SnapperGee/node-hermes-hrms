/**
 * @module choice-view
 */

import { readDepartments } from "../../../lib/db/read/read-departments.mjs";
import { readRoles } from "../../../lib/db/read/read-roles.mjs";
import { readEmployeesView } from "../../../lib/db/read/read-employee.mjs";
import { departmentsToStringGrid, rolesToStringGrid, employeesToStringGrid } from "../../table-grid-string.mjs";

export interface StringChoice
{
    name: string;
    value: string
}

export const viewDepartment: Readonly<StringChoice> = Object.freeze({
    name: "View Departments",
    value: departmentsToStringGrid(await readDepartments())
});

export const viewRoles: Readonly<StringChoice> = Object.freeze({
    name: "View Roles",
    value: rolesToStringGrid(await readRoles(await readDepartments()))
});

export const viewEmployees: Readonly<StringChoice> = Object.freeze({
    name: "View Employees",
    value: employeesToStringGrid(await readEmployeesView())
});

export const view = Object.freeze({
    departments: viewDepartment,
    roles: viewRoles,
    employees: viewEmployees
});

export default view;
