/**
 * @module hermes
 */

import { queryQuestion, quitQuestion, addRoleTitleQuestion, addRoleSalaryQuestion,
         addRoleDepartmentQuestion, addDepartmentQuestion, addEmployeeFirstNameQuestion,
         addEmployeeLastNameQuestion, addEmployeeRoleQuestion, addEmployeeManagerQuestion } from "./cli/prompt/question/index.mjs";
import { QueryChoiceString } from "./cli/prompt/query-choice.mjs";
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
    const answers: Answers = await inquirer.prompt([
        queryQuestion, addEmployeeFirstNameQuestion, addEmployeeLastNameQuestion,
        addEmployeeRoleQuestion, addEmployeeManagerQuestion, addRoleTitleQuestion,
        addRoleSalaryQuestion, addRoleDepartmentQuestion, addDepartmentQuestion, quitQuestion
    ]);

    switch (answers.queryChoice)
    {
        case QueryChoiceString.QUIT:
            if (answers.quit === true)
            {
                break promptLoop;
            }
            else
            {
                continue promptLoop;
            }
        case QueryChoiceString.VIEW_EMPLOYEES:
            const employees: EmployeeWithManagerName[] = await readEmployeesView();
            const employeesStringGrid: string = employeesToStringGrid(employees);
            console.log(employeesStringGrid)
            break;
        case QueryChoiceString.ADD_EMPLOYEE:
            const newEmployeeFirstName = answers.firstNameOfEmployeeToAdd;
            const newEmployeeLastName = answers.lastNameOfEmployeeToAdd;
            const {roleId, roleTitle, roleDepartment} = answers.roleOfEmployeeToAdd;
            const {managerId, managerName} = answers.managerOfEmployeeToAdd;
            insertEmployee(newEmployeeFirstName, newEmployeeLastName, roleId, managerId);
            console.log(`\nAdded "${newEmployeeFirstName} ${newEmployeeLastName}" with "${roleTitle}" role of "${roleDepartment.name}" department and ${managerName ? `manager "${managerName}"` : "no manager"}.\n`);
            break;
        case QueryChoiceString.VIEW_ROLES:
            const departmentsForRoles: Department[] = await readDepartments();
            const roles: Role[] = await readRoles(departmentsForRoles);
            const rolesStringGrid: string = rolesToStringGrid(roles);
            console.log(rolesStringGrid)
            break;
        case QueryChoiceString.ADD_ROLE:
            const title = answers.titleOfRoleToAdd;
            const salary = answers.salaryOfRoleToAdd;
            const {departmentId, departmentName} = answers.departmentOfRoleToAdd;

            if (await roleTitleWithDepartmentIdExists(title, departmentId))
            {
                console.log(`\n"${title}" role already exists for "${departmentName}" department.\n`);
                continue promptLoop;
            }

            await insertRole(title, salary, departmentId);
            console.log(`\nAdded "${title}" role of "${departmentName}" department with salary $${salary}.\n`);
            break;
        case QueryChoiceString.VIEW_DEPARTMENTS:
            const departments: Department[] = await readDepartments();
            const departmentsStringGrid: string = departmentsToStringGrid(departments);
            console.log(departmentsStringGrid)
            break;
        case QueryChoiceString.ADD_DEPARTMENT:
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
process.exit();
