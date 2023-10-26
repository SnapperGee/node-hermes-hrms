import { connection } from "./connection.mjs";

const whiteSpaceRegex: RegExp = /\s+/g;

export const formatInsertData = (dataToBeInserted: string): string => dataToBeInserted.trim().replaceAll(whiteSpaceRegex, "\u0020");

export const departmentNameExists = async (name: string): Promise<boolean> =>
{
    return ((await connection.execute("SELECT EXISTS(SELECT 999 FROM department WHERE name = ?) AS doesExist;", [name]))[0] as [{doesExist: number}])[0].doesExist === 1;
};

export const isValidDepartmentName = async (name: string): Promise<boolean | string> =>
{
    if (name.length === 0)
    {
        return "Department name cannot be blank";
    }

    if (await departmentNameExists(name))
    {
        return `Department "${name}" already exists`;
    }

    return true;
}
