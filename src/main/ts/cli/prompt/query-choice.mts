/**
 * @module query-choice
 */

import { addDepartmentQuestion } from "./question/question-add.mjs";
import { readDepartments, readEmployeesView, readRoles } from "../../lib/db/read.mjs";
import { rolePrompt } from "./role-prompt.mjs";
import { quitQuestion } from "./question/question-quit.mjs";

export const viewEmployees = Object.freeze({
    name: "View Employees",
    value: readEmployeesView
});

export const viewRoles = Object.freeze({
    name: "View Roles",
    value: readRoles
});

export const addRole = Object.freeze({
    name: "Add Role",
    value: rolePrompt
});

export const viewDepartments = Object.freeze({
    name: "View Departments",
    value: readDepartments
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
    addRole,
    viewDepartments,
    addDepartment,
    quit
});
