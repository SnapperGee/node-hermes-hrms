/**
 * @module hermes
 */

import { initQuestion } from "./cli/prompt/question.mjs";
import inquirer from "inquirer";

let quit: boolean = false;

while (quit === false)
{
    const answers = await inquirer.prompt([initQuestion]);

    if (answers.initAction.name === "quit")
    {
        quit = (await inquirer.prompt([answers.initAction])).quit;
    }

    if (typeof answers.initAction === "string")
    {
        console.log(answers.initAction);
    }
}

process.exit();
