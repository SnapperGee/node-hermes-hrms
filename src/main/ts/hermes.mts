/**
 * @module hermes
 */

import { queryQuestion, quitQuestion, viewEmployeesByManagerQuestion, viewEmployeesByDepartmentQuestion,
         addRoleTitleQuestion, addRoleSalaryQuestion, addRoleDepartmentQuestion, addDepartmentQuestion,
         addEmployeeFirstNameQuestion, addEmployeeLastNameQuestion, addEmployeeRoleQuestion,
         addEmployeeManagerQuestion } from "./cli/prompt/question/index.mjs";
import { QueryChoice } from "./cli/prompt/query-choice.mjs";
import { readDepartments, readEmployees, readEmployeesWithManagerId, readEmployeesWithDepartmentId, readRoles } from "./lib/db/read.mjs";
import { insertDepartment, insertEmployee, insertRole } from "./lib/db/insert.mjs";
import inquirer, { type Answers } from "inquirer";
import { roleTitleWithDepartmentIdExists } from "./lib/db/util.mjs";
import { connection } from "./lib/db/connection.mjs";

promptLoop: do
{
    // The initial prompts and their answers from the user of how they want to
    // query the database or quit the application.
    const answers: Answers = await inquirer.prompt([
        queryQuestion, viewEmployeesByManagerQuestion, viewEmployeesByDepartmentQuestion,
        addEmployeeFirstNameQuestion, addEmployeeLastNameQuestion, addEmployeeRoleQuestion,
        addEmployeeManagerQuestion, addRoleTitleQuestion, addRoleSalaryQuestion,
        addRoleDepartmentQuestion, addDepartmentQuestion, quitQuestion
    ]);

    switch (answers.queryChoice)
    {
        // If user chooses quit...
        case QueryChoice.QUIT:
            // If user confirms quit break prompt loop
            if (answers.quit === true)
            {
                break promptLoop;
            }
            // If user cancels quit continue prompt loop
            else
            {
                continue promptLoop;
            }
        case QueryChoice.VIEW_EMPLOYEES:
            const employees = await readEmployees();
            console.table(employees);
            break;
        case QueryChoice.VIEW_EMPLOYEES_BY_MANAGER:
            const managerIdOfEmployeesToView = answers.managerIdToViewEmployeesOf;
            const employeesSelectedByManager = await readEmployeesWithManagerId(managerIdOfEmployeesToView);
            console.table(employeesSelectedByManager);
            break;
        case QueryChoice.VIEW_EMPLOYEES_BY_DEPARTMENT:
            const departmentIdOfEmployeesToView = answers.departmentIdToViewEmployeesOf;
            const employeesSelectedByDepartment = await readEmployeesWithDepartmentId(departmentIdOfEmployeesToView);
            console.table(employeesSelectedByDepartment);
            break;
        // Validation for the inputted employee names is performed in the
        // Inquirer questions.
        case QueryChoice.ADD_EMPLOYEE:
            const newEmployeeFirstName = answers.firstNameOfEmployeeToAdd;
            const newEmployeeLastName = answers.lastNameOfEmployeeToAdd;
            const {roleId, roleTitle, roleDepartmentName} = answers.roleOfEmployeeToAdd;
            const {managerId, managerName} = answers.managerOfEmployeeToAdd;
            insertEmployee(newEmployeeFirstName, newEmployeeLastName, roleId, managerId);
            console.log(`\nAdded "${newEmployeeFirstName} ${newEmployeeLastName}" with "${roleTitle}" role of "${roleDepartmentName}" department and ${managerName ? `manager "${managerName}"` : "no manager"}.\n`);
            break;
        case QueryChoice.VIEW_ROLES:
            const roles = await readRoles();
            console.table(roles);
            break;
        // Validation for the inputted role title is performed in the Inquirer
        // questions in addition to the validation below to make sure a
        // duplicate role title isn't added to the same department.
        case QueryChoice.ADD_ROLE:
            const title = answers.titleOfRoleToAdd;
            const salary = answers.salaryOfRoleToAdd;
            const {departmentId, departmentName} = answers.departmentOfRoleToAdd;

            // Make sure that role title doesn't already exist for department
            if (await roleTitleWithDepartmentIdExists(title, departmentId))
            {
                console.log(`\n"${title}" role already exists for "${departmentName}" department.\n`);
                continue promptLoop;
            }

            await insertRole(title, salary, departmentId);
            console.log(`\nAdded "${title}" role of "${departmentName}" department with salary $${salary}.\n`);
            break;
        case QueryChoice.VIEW_DEPARTMENTS:
            const departments = await readDepartments();
            console.table(departments);
            break;
        // Validation for the inputted department names is performed in the
        // Inquirer question.
        case QueryChoice.ADD_DEPARTMENT:
            const departmentToAdd: string = answers.departmentToAdd;
            await insertDepartment(departmentToAdd);
            console.log(`\nAdded "${departmentToAdd}" department.\n`);
            break;
        default:
            throw new Error(`Unrecognized answer init string response: "${answers.queryChoice}"`);
    }
}
while (true)

console.log("Exiting hermes...");
connection.end();
