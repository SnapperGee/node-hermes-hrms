/**
 * @module view
 */

import { readDepartments } from "../../../lib/db/read-departments.mjs";
import { readRoles } from "../../../lib/db/read-roles.mjs";
import { readEmployeesView } from "../../../lib/db/read-employee.mjs";
import { departmentsToStringGrid, rolesToStringGrid, employeesToStringGrid } from "../../table-grid-string.mjs";

export interface ViewChoice
{
    name: string;
    value: string
}

export const viewDepartment: Readonly<ViewChoice> = Object.freeze({
    name: "View All Departments",
    value: departmentsToStringGrid(await readDepartments())
});

export const viewRoles: Readonly<ViewChoice> = Object.freeze({
    name: "View All Roles",
    value: rolesToStringGrid(await readRoles(await readDepartments()))
});

export const viewEmployees: Readonly<ViewChoice> = Object.freeze({
    name: "View All Employees",
    value: employeesToStringGrid(await readEmployeesView())
});

export const view = Object.freeze({
    departments: viewDepartment,
    roles: viewRoles,
    employees: viewEmployees
});

export default view;
