import { PREFIX, SUFFIX } from "../util.mjs";
import { type Question } from "inquirer";

export const quitQuestion: Question = {
    type: "confirm",
    name: "quit",
    message: "Are you sure you want to quit?",
    prefix: PREFIX,
    suffix: SUFFIX
};

export default quitQuestion;
