/**
 * @module query-choice
 */

import { quitQuestion } from "./question/question-quit.mjs";
import { readDepartments } from "../../lib/db/read/read-departments.mjs";
import { readRoles } from "../../lib/db/read/read-roles.mjs";
import { readEmployeesView } from "../../lib/db/read/read-employee.mjs";
import { addDepartmentQuestion } from "./question/question-add.mjs";

export interface StringChoice
{
    name: string;
    value: string
}

export const viewEmployees: Readonly<StringChoice> = Object.freeze({
    name: "View Employees",
    value: readEmployeesView.name
});

export const viewRoles: Readonly<StringChoice> = Object.freeze({
    name: "View Roles",
    value: readRoles.name
});

export const viewDepartments: Readonly<StringChoice> = Object.freeze({
    name: "View Departments",
    value: readDepartments.name
});

export const addDepartment = Object.freeze({
    name: "Add Department",
    value: addDepartmentQuestion
});

export const quit = Object.freeze({
    name: "Quit",
    value: quitQuestion
});

export const queryChoice = Object.freeze({
    viewEmployees,
    viewRoles,
    viewDepartments,
    addDepartment,
    quit
});
