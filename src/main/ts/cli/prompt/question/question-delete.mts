/**
 * @module question-delete
 */

import { QueryChoice } from "../query-choice.mjs";
import { readDepartments, readRoles } from "../../../lib/db/read.mjs";
import { PREFIX, SUFFIX } from "../util.mjs";
import { type Question, type Answers } from "inquirer";

export const deleteDepartmentQuestion: Question = Object.freeze({
    type: "list",
    name: "departmentToDelete",
    message: "Choose the department you'd like to delete",
    choices: async () => (await readDepartments()).map(({id, name}) => ({name: name, value: {idOfDepartmentToDelete: id, nameOfDepartmentToDelete: name}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.DELETE_DEPARTMENT),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const deleteRoleQuestion: Question = Object.freeze({
    type: "list",
    name: "roleToDelete",
    message: "Choose the role you'd like to delete",
    choices: async () => (await readRoles()).map(({id, title}) => ({name: title, value: {idOfRoleToDelete: id, titleOfRoleToDelete: title}})),
    when: (answers: Answers) => Promise.resolve(answers.queryChoice === QueryChoice.DELETE_ROLE),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const deleteQuestion = Object.freeze({
    department: deleteDepartmentQuestion
});

export default deleteQuestion;
