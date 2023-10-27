/**
 * @module question-add
 */

import { formatInsertData, isValidDepartmentName } from "../../../lib/db/util.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Answers, type Question } from "inquirer";

export const addDepartmentQuestion: Question = {
    type: "input",
    name: "departmentToAdd",
    message: "What is the name of the department you would like to add?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => isValidDepartmentName(input),
    when: (answers: Answers) => Promise.resolve(answers.initResponse === addDepartmentQuestion),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};
