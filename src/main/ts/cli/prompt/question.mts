/**
 * @module question
 */

import { view } from "./choice/choice-view.mjs";
import { addDepartmentChoice } from "./choice/choice-add.mjs";
import { quitChoice } from "./choice/choice-quit.mjs";
import { PREFIX, SUFFIX } from "./util.mjs";
import { type Question } from "inquirer";

export const initQuestion: Readonly<Question> = Object.freeze({
    name: "initResponse",
    type: "list",
    message: "How would you like to query the database?",
    choices: [view.employees, view.roles, view.departments, addDepartmentChoice, quitChoice],
    prefix: PREFIX,
    suffix: SUFFIX
});

export default initQuestion;
