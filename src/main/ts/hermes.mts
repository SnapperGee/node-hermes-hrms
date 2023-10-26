/**
 * @module hermes
 */

import { initQuestion } from "./cli/prompt/question.mjs";
import { createDepartment } from "./lib/db/create/create-department.mjs";
import inquirer, { Question, Answers } from "inquirer";

let quit: boolean = false;

while (quit === false)
{
    const answers: Answers = await inquirer.prompt([initQuestion]);

    if (typeof answers.initResponse === "string")
    {
        console.log(answers.initResponse);
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
