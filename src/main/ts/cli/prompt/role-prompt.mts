/**
 * @module role-prompt
 */

import { formatInsertData, isValidRoleTitle, isValidSalary } from "../../lib/db/util.mjs";
import { readDepartments } from "../../lib/db/read.mjs";
import { PREFIX, SUFFIX } from "./util.mjs";
import inquirer, { type Question, type Answers } from "inquirer";

export const roleTitleQuestion: Question = Object.freeze({
    type: "input",
    name: "title",
    message: "What is the title of the role you would like to add?",
    filter: (input: string) => formatInsertData(input),
    validate: (input: string) => Promise.resolve(isValidRoleTitle(input)),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
});

export const roleSalaryQuestion: Question = Object.freeze({
    type: "input",
    name: "salary",
    message: "What is the salary of the role you would like to add?",
    filter: (input: string) => formatInsertData(input),
    validate: (input: string) => Promise.resolve(isValidSalary(input)),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
});

export const roleDepartmentQuestion: Question = Object.freeze({
    type: "list",
    name: "departmentId",
    message: "What department does the role belong to?",
    choices: async () => (await readDepartments()).map(({name, id}) => ({name: name, value: id})),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const rolePrompt = async (): Promise<Answers> => inquirer.prompt([roleTitleQuestion, roleSalaryQuestion, roleDepartmentQuestion]);

export default rolePrompt;
