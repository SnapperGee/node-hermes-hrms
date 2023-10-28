/**
 * @module question-query
 */

import { queryChoice } from "../query-choice.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Question } from "inquirer";

export const queryQuestion: Readonly<Question> = Object.freeze({
    name: "queryChoice",
    type: "list",
    message: "How would you like to query the database?",
    choices: [
        queryChoice.viewEmployees,
        queryChoice.addEmployee,
        queryChoice.viewRoles,
        queryChoice.addRole,
        queryChoice.viewDepartments,
        queryChoice.addDepartment,
        queryChoice.quit
    ],
    prefix: PREFIX,
    suffix: SUFFIX,
});

export default queryQuestion;
