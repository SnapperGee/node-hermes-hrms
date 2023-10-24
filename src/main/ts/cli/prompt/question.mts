/**
 * @module question
 */

import { view } from "./choice/view.mjs";
import { quitChoice } from "./choice/quit.mjs";
import { PREFIX, SUFFIX } from "./util.mjs";
import { type Question } from "inquirer";

export const initQuestion: Readonly<Question> = Object.freeze({
    name: "initAction",
    type: "list",
    message: "How would you like to query the database?",
    choices: [...Object.values(view), quitChoice],
    prefix: PREFIX,
    suffix: SUFFIX
});
