/**
 * @module db-util
 */

import { connection } from "./connection.mjs";

const whiteSpaceRegex: RegExp = /\s+/g;

export const formatInsertData = (dataToBeInserted: string): string => dataToBeInserted.trim().replaceAll(whiteSpaceRegex, "\u0020");

export const departmentNameExists = async (name: string): Promise<boolean> =>
{
    return ((await connection.execute("SELECT EXISTS(SELECT NULL FROM department WHERE name = ?) AS doesExist;", [name]))[0] as [{doesExist: number}])[0].doesExist === 1;
};

export const roleTitleDepartmentPairExists = async (title: string, departmentName: string): Promise<boolean> =>
{
    return ((await connection.execute("SELECT EXISTS(SELECT NULL FROM roles_view WHERE title = ? AND department_name = ?) AS doesExist;", [title, departmentName]))[0] as [{doesExist: number}])[0].doesExist === 1;
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

export const isValidSalary = (salary: string): boolean | string =>
{
    if (salary.length === 0)
    {
        return "A salary value is required";
    }

    const validFloatChars = ".0123456789";
    const invalidChars = [];
    let decimalCharCount = 0;

    for (const char of salary)
    {
        if (char === "." && ++decimalCharCount > 1)
        {
            return "Salary cannot contain more than one decimal point";
        }

        if ( ! validFloatChars.includes(char))
        {
            invalidChars.push(char);
        }
    }

    if (invalidChars.length !== 0)
    {
        return `Salary cannot contain the following character${invalidChars.length === 1 ? "" : "s"}: '${invalidChars.join("', '")}'`
    }

    return true;
}

export const isValidRoleTitle = (title: string): boolean | string =>
{
    if (title.length === 0)
    {
        return "Role name cannot be blank";
    }

    return true;
}

export const isValidRoleTitleDepartmentPair = async (title: string, departmentName: string): Promise<boolean | string> =>
{
    const roleTitleValidity = isValidRoleTitle(title);

    if (typeof roleTitleValidity === "string")
    {
        return roleTitleValidity;
    }

    if (departmentName.length === 0)
    {
        return "An existing department name is required";
    }

    if ( ! await departmentNameExists(departmentName))
    {
        return `Department "${departmentName}" does not exist`;
    }

    if (await roleTitleDepartmentPairExists(title, departmentName))
    {
        return `Role "${title}" in department "${departmentName}" already exists`;
    }

    return true;
}
