/**
 * @module hermes
 */

import { QueryChoiceString } from "./cli/prompt/query-choice.mjs";
import { quitQuestion } from "./cli/prompt/question/question-quit.mjs";
import { Department } from "./lib/department.mjs";
import { departmentsToStringGrid } from "./cli/table-grid-string.mjs";
import { Role } from "./lib/role.mjs";
import { rolesToStringGrid } from "./cli/table-grid-string.mjs";
import { readDepartments, readEmployeesView, readRoles } from "./lib/db/read.mjs";
import { employeesToStringGrid } from "./cli/table-grid-string.mjs";
import { EmployeeWithManagerName } from "./lib/employee.mjs";
import { queryQuestion } from "./cli/prompt/question/question-query.mjs";
import { roleTitleQuestion, roleSalaryQuestion, roleDepartmentQuestion, addDepartmentQuestion } from "./cli/prompt/question/question-add.mjs";
import { createDepartment } from "./lib/db/create/create-department.mjs";
import inquirer, { type Answers } from "inquirer";
import { createRole } from "./lib/db/create/create-role.mjs";

promptLoop: do
{
    const answers: Answers = await inquirer.prompt([queryQuestion, roleTitleQuestion, roleSalaryQuestion, roleDepartmentQuestion, addDepartmentQuestion, quitQuestion]);

    switch (answers.initResponse)
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
        // TODO: Implement Add Employee
        // Prompt employees first name input
        // Prompt employees last name input
        // Prompt employees role list
        // Prompt employees manage list
        case QueryChoiceString.ADD_EMPLOYEE:
            break;
        case QueryChoiceString.VIEW_ROLES:
            const departmentsForRoles: Department[] = await readDepartments();
            const roles: Role[] = await readRoles(departmentsForRoles);
            const rolesStringGrid: string = rolesToStringGrid(roles);
            console.log(rolesStringGrid)
            break;
        case QueryChoiceString.ADD_ROLE:
            // const {title, salary, departmentId} = await rolePrompt();
            const title = answers.titleOfRoleToAdd;
            const salary = answers.salaryOfRoleToAdd;
            const {departmentId, departmentName} = answers.departmentOfRoleToAdd;
            await createRole(title, salary, departmentId);
            console.log(`Added "${title}" role of "${departmentName}" department with salary $${salary}`);
            break;
        case QueryChoiceString.VIEW_DEPARTMENTS:
            const departments: Department[] = await readDepartments();
            const departmentsStringGrid: string = departmentsToStringGrid(departments);
            console.log(departmentsStringGrid)
            break;
        case QueryChoiceString.ADD_DEPARTMENT:
            const departmentToAdd: string = answers.departmentToAdd;
            await createDepartment(departmentToAdd);
            console.log(`Added "${departmentToAdd}" department`);
            break;
        default:
            throw new Error(`Unrecognized answer init string response: "${answers.initResponse}"`);
    }
}
while (true)

console.log("Exiting hermes...");
process.exit();
