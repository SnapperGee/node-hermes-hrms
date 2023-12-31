/**
 * @module question-query
 */

import { queryChoices } from "../query-choice.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Question } from "inquirer";

/**
 * The initial Inquirer {@link Question} for querying the database or quitting.
 */
export const queryQuestion: Readonly<Question> = Object.freeze({
    name: "queryChoice",
    type: "list",
    message: "How would you like to query the database?",
    choices: queryChoices,
    prefix: PREFIX,
    suffix: SUFFIX,
});

export default queryQuestion;
