/**
 * @module question-add
 */

import { QueryChoice } from "../query-choice.mjs";
import { formatInsertData, isValidDepartmentName, isValidName, isValidRoleTitle, isValidSalary } from "../../../lib/db/util.mjs";
import { readDepartments, readEmployees, readRoles } from "../../../lib/db/read.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Answers, type Question } from "inquirer";

/**
 * Inquirer {@link Question} for adding an employee's first name. Validation is
 * performed to make sure the name is not blank. All leading and trailing
 * whitespace is removed and all internal whitespace is replaced with single
 * spaces.
 *
 * @see {@link isValidName}
 */
export const addEmployeeFirstNameQuestion: Question = {
    type: "input",
    name: "firstNameOfEmployeeToAdd",
    message: "What is the employee's first name?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => Promise.resolve(isValidName(input)),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.ADD_EMPLOYEE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

/**
 * Inquirer {@link Question} for adding an employee's last name. Validation is
 * performed to make sure the name is not blank. All leading and trailing
 * whitespace is removed and all internal white spaces are replaced with single
 * spaces.
 *
 * @see {@link isValidName}
 */
export const addEmployeeLastNameQuestion: Question = {
    type: "input",
    name: "lastNameOfEmployeeToAdd",
    message: "What is the employee's last name?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => Promise.resolve(isValidName(input)),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.ADD_EMPLOYEE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

/**
 * Inquirer {@link Question} for adding an employee's role. The choices are
 * obtained from the pre-existing roles in the database.
 */
export const addEmployeeRoleQuestion: Question = Object.freeze({
    type: "list",
    name: "roleOfEmployeeToAdd",
    message: "What is the employee's role?",
    choices: async () => (await readRoles()).map(({id, title, department_name}) => ({name: title, value: {roleId: id, roleTitle: title, roleDepartmentName: department_name}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.ADD_EMPLOYEE),
    prefix: PREFIX,
    suffix: SUFFIX
});

/**
 * Inquirer {@link Question} for adding an employee's manager. The choices are
 * obtained from the pre-existing employees in the database.
 */
export const addEmployeeManagerQuestion: Question = Object.freeze({
    type: "list",
    name: "managerOfEmployeeToAdd",
    message: "Who is the employee's manager?",
    choices: async () => [{name: "None", value: {managerId: null, managerName: null}}, ...(await readEmployees()).map(({id, name}) => ({name: `${name}`, value: {managerId: id, managerName: `${name}`}}))],
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.ADD_EMPLOYEE),
    prefix: PREFIX,
    suffix: SUFFIX
});

/**
 * Inquirer {@link Question} for adding a department. Validation is performed
 * to make sure the department name is not blank. All leading and trailing
 * white spaces are removed and all internal white spaces are replaced with
 * single spaces.
 */
export const addDepartmentQuestion: Question = {
    type: "input",
    name: "departmentToAdd",
    message: "What is the name of the department you would like to add?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => isValidDepartmentName(input),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.ADD_DEPARTMENT),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

/**
 * Inquirer {@link Question} for adding a role title. Validation is performed
 * to make sure the role title is not blank. All leading and trailing
 * white spaces are removed and all internal white spaces are replaced with
 * single spaces.
 */
export const addRoleTitleQuestion: Question = Object.freeze({
    type: "input",
    name: "titleOfRoleToAdd",
    message: "What is the title of the role you would like to add?",
    filter: (input: string) => formatInsertData(input),
    validate: (input: string) => Promise.resolve(isValidRoleTitle(input)),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.ADD_ROLE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
});

/**
 * Inquirer {@link Question} for adding a salary. Validation is performed
 * to make sure the salary is a floating point number.
 */
export const addRoleSalaryQuestion: Question = Object.freeze({
    type: "input",
    name: "salaryOfRoleToAdd",
    message: "What is the salary of the role you would like to add?",
    filter: (input: string) => formatInsertData(input),
    validate: (input: string) => Promise.resolve(isValidSalary(input)),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.ADD_ROLE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
});

/**
 * Inquirer {@link Question} for adding a role department. The choices are
 * obtained from the pre-existing departments in the database.
 */
export const addRoleDepartmentQuestion: Question = Object.freeze({
    type: "list",
    name: "departmentOfRoleToAdd",
    message: "What department does the role belong to?",
    choices: async () => (await readDepartments()).map(({name, id}) => ({name: name, value: {departmentId: id, departmentName: name}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.ADD_ROLE),
    prefix: PREFIX,
    suffix: SUFFIX
});

/**
 * Object containing all the add questions.
 */
export const add = Object.freeze({
    departmentQuestion: addDepartmentQuestion,
    employeeFirstNameQuestion: addEmployeeFirstNameQuestion,
    employeeLastNameQuestion: addEmployeeLastNameQuestion,
    employeeManagerQuestion: addEmployeeManagerQuestion,
    employeeRoleQuestion: addEmployeeRoleQuestion,
    roleDepartmentQuestion: addRoleDepartmentQuestion,
    roleSalaryQuestion: addRoleSalaryQuestion,
    roleTitleQuestion: addRoleTitleQuestion
});

export default add;
