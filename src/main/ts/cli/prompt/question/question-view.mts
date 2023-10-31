/**
 * @module question-view
 */

import { QueryChoice } from "../query-choice.mjs";
import { readManagersView } from "../../../lib/db/read.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Question, type Answers } from "inquirer";

export const viewEmployeesByManagerQuestion: Question = Object.freeze({
    type: "list",
    name: "managerToViewEmployeesOf",
    message: "Choose the manager you'd like to view employees of.",
    choices: async () => (await readManagersView()).map(({id, name}) => ({name: name, value: {id: id, name: name}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.VIEW_EMPLOYEES_BY_MANAGER),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const view = Object.freeze({
    employeesByManagerQuestion: viewEmployeesByManagerQuestion
});

export default view;
