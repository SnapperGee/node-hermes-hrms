/**
 * @module question-add
 */

import { formatInsertData, isValidDepartmentName } from "../../../lib/db/util.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Question } from "inquirer";

export const addDepartmentQuestion: Question = {
    type: "input",
    name: "addDepartment",
    message: "What is the name of the department you would like to add?",
    filter: (input: string) => Promise.resolve(formatInsertData(input)),
    validate: (input: string) => isValidDepartmentName(input),
    default: "",
    prefix: PREFIX,
    suffix: SUFFIX
};

export default addDepartmentQuestion;
