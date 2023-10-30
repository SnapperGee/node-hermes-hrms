/**
 * @module question-quit
 */

import { QueryChoice } from "../query-choice.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Answers, type Question } from "inquirer";

export const quitQuestion: Question = {
    type: "confirm",
    name: "quit",
    message: "Are you sure you want to quit?",
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.QUIT),
    prefix: PREFIX,
    suffix: SUFFIX
};

export default quitQuestion;
