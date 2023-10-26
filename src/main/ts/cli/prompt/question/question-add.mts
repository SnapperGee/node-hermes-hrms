/**
 * @module question-add
 */

import { formatInsertData, isValidDepartmentName, isValidRoleTitle } from "../../../lib/db/util.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Answers, type Question } from "inquirer";

export const addDepartmentQuestion: Question = {
    type: "input",
    name: "departmentToAdd",
    message: "What is the name of the department you would like to add?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => isValidDepartmentName(input),
    when(answers: Answers) { return Promise.resolve(answers.initResponse === addDepartmentQuestion); },
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

export const addRoleTitleQuestion: Question = {
    type: "input",
    name: "addRole",
    message: "What is the title of the role you would like to add?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => isValidRoleTitle(input),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

export default addDepartmentQuestion;
