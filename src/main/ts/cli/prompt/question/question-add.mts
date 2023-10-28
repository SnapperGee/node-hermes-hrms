/**
 * @module question-add
 */

import { QueryChoiceString } from "../query-choice.mjs";
import { formatInsertData, isValidDepartmentName, isValidName, isValidRoleTitle, isValidSalary } from "../../../lib/db/util.mjs";
import { readDepartments, readEmployeesView, readRoles } from "../../../lib/db/read.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Answers, type Question } from "inquirer";

export const addEmployeeFirstNameQuestion: Question = {
    type: "input",
    name: "firstNameOfEmployeeToAdd",
    message: "What is the employee's first name?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => Promise.resolve(isValidName(input)),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoiceString.ADD_EMPLOYEE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

export const addEmployeeLastNameQuestion: Question = {
    type: "input",
    name: "lastNameOfEmployeeToAdd",
    message: "What is the employee's last name?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => Promise.resolve(isValidName(input)),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoiceString.ADD_EMPLOYEE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

export const addEmployeeRoleQuestion: Question = Object.freeze({
    type: "list",
    name: "roleOfEmployeeToAdd",
    message: "What is the employee's role?",
    choices: async () => (await readRoles(await readDepartments())).map(({id, title, department}) => ({name: title, value: {roleId: id, roleTitle: title, roleDepartment: department}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoiceString.ADD_EMPLOYEE),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const addEmployeeManagerQuestion: Question = Object.freeze({
    type: "list",
    name: "managerOfEmployeeToAdd",
    message: "Who is the employee's manager?",
    choices: async () => (await readEmployeesView()).map(({id, firstName, lastName}) => ({name: `${firstName} ${lastName}`, value: {managerId: id, managerName: `${firstName} ${lastName}`}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoiceString.ADD_EMPLOYEE),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const addDepartmentQuestion: Question = {
    type: "input",
    name: "departmentToAdd",
    message: "What is the name of the department you would like to add?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => isValidDepartmentName(input),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoiceString.ADD_DEPARTMENT),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

export const roleTitleQuestion: Question = Object.freeze({
    type: "input",
    name: "titleOfRoleToAdd",
    message: "What is the title of the role you would like to add?",
    filter: (input: string) => formatInsertData(input),
    validate: (input: string) => Promise.resolve(isValidRoleTitle(input)),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoiceString.ADD_ROLE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
});

export const roleSalaryQuestion: Question = Object.freeze({
    type: "input",
    name: "salaryOfRoleToAdd",
    message: "What is the salary of the role you would like to add?",
    filter: (input: string) => formatInsertData(input),
    validate: (input: string) => Promise.resolve(isValidSalary(input)),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoiceString.ADD_ROLE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
});

export const roleDepartmentQuestion: Question = Object.freeze({
    type: "list",
    name: "departmentOfRoleToAdd",
    message: "What department does the role belong to?",
    choices: async () => (await readDepartments()).map(({name, id}) => ({name: name, value: {departmentId: id, departmentName: name}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoiceString.ADD_ROLE),
    prefix: PREFIX,
    suffix: SUFFIX
});
