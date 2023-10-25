/**
 * @module hermes
 */

import { initQuestion } from "./cli/prompt/question.mjs";
import inquirer, { Answers } from "inquirer";

let quit: boolean = false;

while (quit === false)
{
    const answers: Answers = await inquirer.prompt([initQuestion]);

    if (typeof answers.initResponse === "string")
    {
        console.log(answers.initResponse);
    }

    if (answers.initResponse.name !== undefined)
    {
        switch (answers.initResponse.name)
        {
            case "quit":
                quit = (await inquirer.prompt([answers.initResponse])).quit;
                break;
            default:
                throw new Error(`Unrecognized answer init action name: "${answers.initResponse.name}"`);
        }
    }
}

console.log("Exiting hermes...");
process.exit();
