/**
 * @module role-prompt
 */

import { formatInsertData, isValidRoleTitle, isValidRoleTitleDepartmentPair, isValidSalary } from "../../lib/db/util.mjs";
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

export const roleDepartmentQuestion: Question = Object.freeze({
    type: "input",
    name: "department",
    message: "What is the department of the role you would like to add?",
    filter: (input: string) => formatInsertData(input),
    validate: (input: string, answers: Answers) => isValidRoleTitleDepartmentPair(answers.title, input),
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

export const rolePrompt = async (): Promise<Answers> => inquirer.prompt([roleTitleQuestion, roleDepartmentQuestion, roleSalaryQuestion]);

export default rolePrompt;
