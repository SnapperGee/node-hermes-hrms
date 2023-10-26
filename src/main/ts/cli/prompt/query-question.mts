/**
 * @module query-question
 */

import { queryChoice } from "./query-choice.mjs";
import { addDepartmentChoice } from "./choice/choice-add.mjs";
import { quitChoice } from "./choice/choice-quit.mjs";
import { PREFIX, SUFFIX } from "./util.mjs";
import { type Question } from "inquirer";

export const queryQuestion: Readonly<Question> = Object.freeze({
    name: "initResponse",
    type: "list",
    message: "How would you like to query the database?",
    choices: [queryChoice.viewEmployees, queryChoice.viewRoles, queryChoice.viewDepartments, addDepartmentChoice, quitChoice],
    prefix: PREFIX,
    suffix: SUFFIX,
});

export default queryQuestion;
