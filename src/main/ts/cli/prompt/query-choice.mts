/**
 * @module query-choice
 */

import { readDepartments } from "../../lib/db/read/read-departments.mjs";
import { readRoles } from "../../lib/db/read/read-roles.mjs";
import { readEmployeesView } from "../../lib/db/read/read-employee.mjs";

export interface StringChoice
{
    name: string;
    value: string
}

export const viewDepartments: Readonly<StringChoice> = Object.freeze({
    name: "View Departments",
    value: readDepartments.name
});

export const viewRoles: Readonly<StringChoice> = Object.freeze({
    name: "View Roles",
    value: readRoles.name
});

export const viewEmployees: Readonly<StringChoice> = Object.freeze({
    name: "View Employees",
    value: readEmployeesView.name
});

export const queryChoice = Object.freeze({
    viewDepartments,
    viewRoles,
    viewEmployees
});
