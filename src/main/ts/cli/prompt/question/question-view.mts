/**
 * @module question-view
 */

import { QueryChoice } from "../query-choice.mjs";
import { readManagers, readDepartments } from "../../../lib/db/read.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Question, type Answers } from "inquirer";

export const viewEmployeesByManagerQuestion: Question = Object.freeze({
    type: "list",
    name: "managerIdToViewEmployeesOf",
    message: "Choose the manager you'd like to view employees of.",
    choices: async () => (await readManagers()).map(({id, name}) => ({name: name, value: id})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.VIEW_EMPLOYEES_BY_MANAGER),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const viewEmployeesByDepartmentQuestion: Question = Object.freeze({
    type: "list",
    name: "departmentIdToViewEmployeesOf",
    message: "Choose the department you'd like to view employees of.",
    choices: async () => (await readDepartments()).map(({id, name}) => ({name: name, value: id})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.VIEW_EMPLOYEES_BY_DEPARTMENT),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const view = Object.freeze({
    employeesByManagerQuestion: viewEmployeesByManagerQuestion,
    employeesByDepartmentQuestion: viewEmployeesByDepartmentQuestion
});

export default view;
