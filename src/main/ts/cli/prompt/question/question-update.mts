/**
 * @module question-update
 */

import { QueryChoice } from "../query-choice.mjs";
import { readEmployees, readManagers } from "../../../lib/db/read.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Answers, type Question } from "inquirer";

export const employeeToUpdateManagerOfQuestion: Question = Object.freeze({
    type: "list",
    name: "employeeToUpdateManagerOf",
    message: "Which employee do you want to update the manager for?",
    choices: async () => (await readEmployees()).map(({id, name, title, department, manager}) => ({name: `employee: "${name}" | role: "${title}" | department: "${department}" | manager: "${manager}"`, value: {idOfEmployeeToUpdateManager: id, nameOfEmployeeToUpdateManager: name, roleOfEmployeeToUpdateManager: title, departmentOfEmployeeToUpdateManager: department, managerOfEmployeeToUpdateManager: manager}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.UPDATE_EMPLOYEE_MANAGER),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const managerToUpdateEmployeeManagerWithQuestion: Question = Object.freeze({
    type: "list",
    name: "managerToUpdateEmployeeManager",
    message: "Which manager do you want to update as the employee's new manager?",
    choices: async () => (await readManagers()).map(({id, name}) => ({name: name, value: {idOfManagerToUpdateEmployeeManager: id, nameOfManagerToUpdateEmployeeManager: name}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.UPDATE_EMPLOYEE_MANAGER),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const update = Object.freeze({
    employeeManager: employeeToUpdateManagerOfQuestion,
    managerEmployee: managerToUpdateEmployeeManagerWithQuestion
});

export default update;
