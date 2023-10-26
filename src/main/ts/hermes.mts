/**
 * @module hermes
 */

import { quitQuestion } from "./cli/prompt/question/question-quit.mjs";
import { readDepartments } from "./lib/db/read/read-departments.mjs";
import { Department } from "./lib/department.mjs";
import { departmentsToStringGrid } from "./cli/table-grid-string.mjs";
import { readRoles } from "./lib/db/read/read-roles.mjs";
import { Role } from "./lib/role.mjs";
import { rolesToStringGrid } from "./cli/table-grid-string.mjs";
import { readEmployeesView } from "./lib/db/read/read-employee.mjs";
import { employeesToStringGrid } from "./cli/table-grid-string.mjs";
import { EmployeeWithManagerName } from "./lib/employee.mjs";
import { queryQuestion } from "./cli/prompt/query-question.mjs";
import { addDepartmentQuestion } from "./cli/prompt/question/question-add.mjs";
import { createDepartment } from "./lib/db/create/create-department.mjs";
import inquirer, { type Answers } from "inquirer";


promptLoop: do
{
    const answers: Answers = await inquirer.prompt([queryQuestion, addDepartmentQuestion, quitQuestion]);

    switch (answers.initResponse)
    {
        case quitQuestion:
            if (answers.quit === true)
            {
                break promptLoop;
            }
            else
            {
                continue promptLoop;
            }
        case readDepartments:
            const departments: Department[] = await answers.initResponse();
            const departmentsStringGrid: string = departmentsToStringGrid(departments);
            console.log(departmentsStringGrid)
            break;
        case addDepartmentQuestion:
            const departmentToAdd: string = answers.departmentToAdd;
            await createDepartment(departmentToAdd);
            break;
        case readRoles:
            const departmentsForRoles: Department[] = await readDepartments();
            const roles: Role[] = await answers.initResponse(departmentsForRoles);
            const rolesStringGrid: string = rolesToStringGrid(roles);
            console.log(rolesStringGrid)
            break;
        case readEmployeesView:
            const employees: EmployeeWithManagerName[] = await answers.initResponse();
            const employeesStringGrid: string = employeesToStringGrid(employees);
            console.log(employeesStringGrid)
            break;
        default:
            throw new Error(`Unrecognized answer init string response: "${answers.initResponse}"`);
    }
}
while (true)

console.log("Exiting hermes...");
process.exit();
