/**
 * @module hermes
 */

import { readDepartments } from "./lib/db/read/read-departments.mjs";
import { Department } from "./lib/department.mjs";
import { departmentsToStringGrid } from "./cli/table-grid-string.mjs";
import { readRoles } from "./lib/db/read/read-roles.mjs";
import { Role } from "./lib/role.mjs";
import { rolesToStringGrid } from "./cli/table-grid-string.mjs";
import { readEmployeesView } from "./lib/db/read/read-employee.mjs";
import { employeesToStringGrid } from "./cli/table-grid-string.mjs";
import { EmployeeWithManagerName } from "./lib/employee.mjs";
import { initQuestion } from "./cli/prompt/question.mjs";
import { createDepartment } from "./lib/db/create/create-department.mjs";
import inquirer, { Question, Answers } from "inquirer";

let quit: boolean = false;

while (quit === false)
{
    const answers: Answers = await inquirer.prompt([initQuestion]);

    if (typeof answers.initResponse === "string")
    {
        switch (answers.initResponse) {
            case readDepartments.name:
                const departments: Department[] = await readDepartments();
                const departmentsStringGrid: string = departmentsToStringGrid(departments);
                console.log(departmentsStringGrid)
                break;
            case readRoles.name:
                const departmentsForRoles: Department[] = await readDepartments();
                const roles: Role[] = await readRoles(departmentsForRoles);
                const rolesStringGrid: string = rolesToStringGrid(roles);
                console.log(rolesStringGrid)
                break;
            case readEmployeesView.name:
                const employees: EmployeeWithManagerName[] = await readEmployeesView();
                const employeesStringGrid: string = employeesToStringGrid(employees);
                console.log(employeesStringGrid)
                break;
            default:
                throw new Error(`Unrecognized answer init string response: "${answers.initResponse}"`);
        }
    }

    if (typeof answers.initResponse.name === "string")
    {
        switch (answers.initResponse.name)
        {
            case "quit":
                const quitQuestion: Question = answers.initResponse;
                const quitAnswer: Answers = await inquirer.prompt([quitQuestion]);
                quit = quitAnswer.quit;
                break;
            case "addDepartment":
                const addDepartmentQuestion: Question = answers.initResponse;
                const addDepartmentAnswer: Answers = await inquirer.prompt([addDepartmentQuestion]);
                const departmentToAdd: string = addDepartmentAnswer.addDepartment;
                await createDepartment(departmentToAdd);
                break;
            default:
                throw new Error(`Unrecognized answer init action name: "${answers.initResponse.name}"`);
        }
    }
}

console.log("Exiting hermes...");
process.exit();
