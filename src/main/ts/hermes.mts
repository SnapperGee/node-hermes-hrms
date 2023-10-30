/**
 * @module hermes
 */

import { queryQuestion, quitQuestion, addRoleTitleQuestion, addRoleSalaryQuestion,
         addRoleDepartmentQuestion, addDepartmentQuestion, addEmployeeFirstNameQuestion,
         addEmployeeLastNameQuestion, addEmployeeRoleQuestion, addEmployeeManagerQuestion } from "./cli/prompt/question/index.mjs";
import { QueryChoice } from "./cli/prompt/query-choice.mjs";
import { Department } from "./lib/department.mjs";
import { departmentsToStringGrid } from "./cli/table-grid-string.mjs";
import { Role } from "./lib/role.mjs";
import { rolesToStringGrid } from "./cli/table-grid-string.mjs";
import { readDepartments, readEmployeesView, readRoles } from "./lib/db/read.mjs";
import { employeesToStringGrid } from "./cli/table-grid-string.mjs";
import { EmployeeWithManagerName } from "./lib/employee.mjs";
import { insertDepartment, insertEmployee, insertRole } from "./lib/db/insert.mjs";
import inquirer, { type Answers } from "inquirer";
import { roleTitleWithDepartmentIdExists } from "./lib/db/util.mjs";

promptLoop: do
{
    // The initial prompts and their answers from the user of how they want to
    // query the database or quit the application.
    const answers: Answers = await inquirer.prompt([
        queryQuestion, addEmployeeFirstNameQuestion, addEmployeeLastNameQuestion,
        addEmployeeRoleQuestion, addEmployeeManagerQuestion, addRoleTitleQuestion,
        addRoleSalaryQuestion, addRoleDepartmentQuestion, addDepartmentQuestion, quitQuestion
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
            const employees: EmployeeWithManagerName[] = await readEmployeesView();
            const employeesStringGrid: string = employeesToStringGrid(employees);
            console.log(employeesStringGrid)
            break;
        // Validation for the inputted employee names is performed in the
        // Inquirer questions.
        case QueryChoice.ADD_EMPLOYEE:
            const newEmployeeFirstName = answers.firstNameOfEmployeeToAdd;
            const newEmployeeLastName = answers.lastNameOfEmployeeToAdd;
            const {roleId, roleTitle, roleDepartment} = answers.roleOfEmployeeToAdd;
            const {managerId, managerName} = answers.managerOfEmployeeToAdd;
            insertEmployee(newEmployeeFirstName, newEmployeeLastName, roleId, managerId);
            console.log(`\nAdded "${newEmployeeFirstName} ${newEmployeeLastName}" with "${roleTitle}" role of "${roleDepartment.name}" department and ${managerName ? `manager "${managerName}"` : "no manager"}.\n`);
            break;
        case QueryChoice.VIEW_ROLES:
            const departmentsForRoles: Department[] = await readDepartments();
            const roles: Role[] = await readRoles(departmentsForRoles);
            const rolesStringGrid: string = rolesToStringGrid(roles);
            console.log(rolesStringGrid)
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
            const departments: Department[] = await readDepartments();
            const departmentsStringGrid: string = departmentsToStringGrid(departments);
            console.log(departmentsStringGrid)
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
