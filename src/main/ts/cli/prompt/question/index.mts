import { viewEmployeesByManagerQuestion } from "./question-view.mjs";
import { addDepartmentQuestion, addEmployeeFirstNameQuestion, addEmployeeLastNameQuestion,
         addEmployeeManagerQuestion, addEmployeeRoleQuestion, addRoleDepartmentQuestion,
         addRoleSalaryQuestion, addRoleTitleQuestion } from "./question-add.mjs";
import { queryQuestion } from "./question-query.mjs";
import { quitQuestion } from "./question-quit.mjs";

export const question = Object.freeze({
    viewEmployeesByManager: viewEmployeesByManagerQuestion,
    addEmployeeFirstName: addEmployeeFirstNameQuestion,
    addEmployeeLastName: addEmployeeLastNameQuestion,
    addEmployeeManager: addEmployeeManagerQuestion,
    addEmployeeRole: addEmployeeRoleQuestion,
    addDepartment: addDepartmentQuestion,
    query: queryQuestion,
    quit: quitQuestion,
    roleDepartment: addRoleDepartmentQuestion,
    roleSalary: addRoleSalaryQuestion,
    roleTitle: addRoleTitleQuestion
});

export * from "./question-view.mjs";
export * from "./question-add.mjs";
export * from "./question-query.mjs";
export * from "./question-quit.mjs";

export default question;
