import { viewEmployeesByManagerQuestion, viewEmployeesByDepartmentQuestion } from "./question-view.mjs";
import { addDepartmentQuestion, addEmployeeFirstNameQuestion, addEmployeeLastNameQuestion,
         addEmployeeManagerQuestion, addEmployeeRoleQuestion, addRoleDepartmentQuestion,
         addRoleSalaryQuestion, addRoleTitleQuestion } from "./question-add.mjs";
import { queryQuestion } from "./question-query.mjs";
import { quitQuestion } from "./question-quit.mjs";
import { deleteDepartmentQuestion, deleteRoleQuestion, deleteEmployeeQuestion } from "./question-delete.mjs";
import { employeeToUpdateManagerOfQuestion, managerToUpdateEmployeeManagerWithQuestion } from "./question-update.mjs";

export const question = Object.freeze({
    query: queryQuestion,
    viewEmployeesByManager: viewEmployeesByManagerQuestion,
    viewEmployeesByDepartment: viewEmployeesByDepartmentQuestion,
    addEmployeeFirstName: addEmployeeFirstNameQuestion,
    addEmployeeLastName: addEmployeeLastNameQuestion,
    addEmployeeRole: addEmployeeRoleQuestion,
    addEmployeeManager: addEmployeeManagerQuestion,
    employeeToUpdateManagerOf: employeeToUpdateManagerOfQuestion,
    managerToUpdateEmployeeManager: managerToUpdateEmployeeManagerWithQuestion,
    deleteEmployee: deleteEmployeeQuestion,
    roleTitle: addRoleTitleQuestion,
    roleSalary: addRoleSalaryQuestion,
    roleDepartment: addRoleDepartmentQuestion,
    deleteRole: deleteRoleQuestion,
    addDepartment: addDepartmentQuestion,
    deleteDepartment: deleteDepartmentQuestion,
    quit: quitQuestion
});

export const questions = Object.freeze(Object.values(question));

export * from "./question-view.mjs";
export * from "./question-add.mjs";
export * from "./question-query.mjs";
export * from "./question-quit.mjs";
export * from "./question-delete.mjs";
export * from "./question-update.mjs";

export default questions;
