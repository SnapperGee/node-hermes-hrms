import { addDepartmentQuestion, roleTitleQuestion, roleSalaryQuestion, roleDepartmentQuestion } from "./question-add.mjs";
import { queryQuestion } from "./question-query.mjs";
import { quitQuestion } from "./question-quit.mjs";

export const question = Object.freeze({
    addDepartment: addDepartmentQuestion,
    query: queryQuestion,
    quit: quitQuestion,
    roleDepartment: roleDepartmentQuestion,
    roleSalary: roleSalaryQuestion,
    roleTitle: roleTitleQuestion
});

export * from "./question-add.mjs";
export * from "./question-query.mjs";
export * from "./question-quit.mjs";

export default question;
