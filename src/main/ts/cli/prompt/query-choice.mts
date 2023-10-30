/**
 * @module query-choice
 */

/**
 * An enum containing the initial Inquirer choices presented that are used to
 * indicate how to query the database or quit the application.
 */
export enum QueryChoice
{
    /**
     * Inquirer question choice to view all employees.
     */
    VIEW_EMPLOYEES = "View Employees",

    /**
     * Inquirer question choice to add a new employee.
     */
    ADD_EMPLOYEE = "Add Employee",

    /**
     * Inquirer question choice to view all roles.
     */
    VIEW_ROLES = "View Roles",

    /**
     * Inquirer question choice to add a new role.
     */
    ADD_ROLE = "Add Role",

    /**
     * Inquirer question choice to view all departments.
     */
    VIEW_DEPARTMENTS = "View Departments",

    /**
     * Inquirer question choice to add a new department.
     */
    ADD_DEPARTMENT = "Add Department",
    QUIT = "Quit"
}

/**
 * The string values of the initial Inquirer choices presented that are used to
 * indicate how to query the database or quit the application.
 */
export const queryChoices = Object.freeze(Object.values(QueryChoice));

export default Object.freeze({
    QueryChoice,
    queryChoices
});
