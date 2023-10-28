/**
 * @module question-add
 */

import { QueryChoiceString } from "../query-choice.mjs";
import { formatInsertData, isValidDepartmentName, isValidRoleTitle, isValidSalary } from "../../../lib/db/util.mjs";
import { readDepartments } from "../../../lib/db/read.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Answers, type Question } from "inquirer";

export const addDepartmentQuestion: Question = {
    type: "input",
    name: "departmentToAdd",
    message: "What is the name of the department you would like to add?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => isValidDepartmentName(input),
    when: (answers: Answers) => Promise.resolve(answers.initResponse === QueryChoiceString.ADD_DEPARTMENT),
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
    when: (answers: Answers) => Promise.resolve(answers.initResponse === QueryChoiceString.ADD_ROLE),
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
    when: (answers: Answers) => Promise.resolve(answers.initResponse === QueryChoiceString.ADD_ROLE),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
});

export const roleDepartmentQuestion: Question = Object.freeze({
    type: "list",
    name: "departmentOfRoleToAdd",
    message: "What department does the role belong to?",
    choices: async () => (await readDepartments()).map(({name, id}) => ({name: name, value: {departmentId: id, departmentName: name}})),
    when: (answers: Answers) => Promise.resolve(answers.initResponse === QueryChoiceString.ADD_ROLE),
    prefix: PREFIX,
    suffix: SUFFIX
});
