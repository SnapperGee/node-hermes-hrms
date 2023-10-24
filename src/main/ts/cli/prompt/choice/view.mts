/**
 * @module view
 */

import { getDepartments } from "../../../lib/db/get-departments.mjs";
import { getRoles } from "../../../lib/db/get-roles.mjs";
import { getEmployeesView } from "../../../lib/db/get-employee.mjs";
import { departmentsToStringGrid, rolesToStringGrid, employeesToStringGrid } from "../../table-grid-string.mjs";

export interface ViewChoice
{
    name: string;
    value: string
}

export const viewDepartment: Readonly<ViewChoice> = Object.freeze({
    name: "View All Departments",
    value: departmentsToStringGrid(await getDepartments())
});

export const viewRoles: Readonly<ViewChoice> = Object.freeze({
    name: "View All Roles",
    value: rolesToStringGrid(await getRoles(await getDepartments()))
});

export const viewEmployees: Readonly<ViewChoice> = Object.freeze({
    name: "View All Employees",
    value: employeesToStringGrid(await getEmployeesView())
});

export const view = Object.freeze({
    departments: viewDepartment,
    roles: viewRoles,
    employees: viewEmployees
});

export default view;
