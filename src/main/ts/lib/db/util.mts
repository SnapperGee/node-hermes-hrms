/**
 * @module db-util
 */

import { connection } from "./connection.mjs";

const whiteSpaceRegex: RegExp = /\s+/g;

/**
 * Formats a `string` to be inserted into the database. All leading and trailing
 * and trailing whitespace is removed and all internal whitespace is replaced
 * with single spaces.
 *
 * @param dataToBeInserted The `string` to be formatted and returned.
 *
 * @returns the passed `string` argument with all leading and trailing and
 *          whitespace removed and all internal whitespace replaced with single
 *          space characters.
 */
export const formatInsertData = (dataToBeInserted: string): string => dataToBeInserted.trim().replaceAll(whiteSpaceRegex, "\u0020");

/**
 * Validates a name `string` to make sure it isn't empty (contains more than 0
 * characters).
 *
 * @param name The name `string` being validated.
 *
 * @returns Returns `true` if the name isn't blank, otherwise returns a `string`
 *          stating the name is blank.
 */
export const isValidName = (name: string): boolean | string =>
{
    if (name.length === 0)
    {
        return "Name cannot be blank";
    }

    return true;
};

/**
 * Checks if the provided `string ` exists in the database as a department name.
 *
 * @param name `string` to check if it exists in the database as a department name.
 *
 * @returns A `boolean` wrapped in `Promise` indicating whether the passed
 *          `string` exists in the database as a department name.
 */
export const departmentNameExists = async (name: string): Promise<boolean> =>
{
    return ((await connection.execute("SELECT EXISTS(SELECT NULL FROM department WHERE name = ?) AS doesExist;", [name]))[0] as [{doesExist: number}])[0].doesExist === 1;
};

/**
 * Validates that the passed department name `string` isn't empty
 *
 * @param name The department name `string` being validated.
 *
 * @returns Returns a promise wrapped around `true` if the department name isn't
 *          blank, otherwise returns a `string` stating why it isn't valid.
 */
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

/**
 * Makes sure that the passed `string` is a valid float number.
 *
 * @param salary The `string` being validated that it's a float number.
 *
 * @returns `true` if the passed `string` is a valid float number, otherwise
 *           returns a `string` explaining why it's invalid.
 */
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

/**
 * Validates a `string` to make sure it isn't empty (contains more than 0
 * characters).
 *
 * @param name The name `string` being validated.
 *
 * @returns Returns `true` if the name isn't blank, otherwise returns a `string`
 *          stating the name is blank.
 */
export const isValidRoleTitle = (title: string): boolean | string =>
{
    if (title.length === 0)
    {
        return "Role title cannot be blank";
    }

    return true;
}

/**
 *
 * @param title The title `string` of the role being checked if it exists.
 *
 * @param id The id `number` of the role being checked if it exists.
 *
 * @returns a `boolean` wrapped in a `Promise` indicating whether the passed
 *          role with the title `string` and id `number` exists in the database.
 */
export const roleTitleWithDepartmentIdExists = async (title: string, id: number): Promise<boolean> =>
    ((await connection.execute("SELECT EXISTS(SELECT NULL FROM role WHERE title = ? AND department_id = ?) AS doesExist;", [title, id]))[0] as [{doesExist: number}])[0].doesExist === 1;
