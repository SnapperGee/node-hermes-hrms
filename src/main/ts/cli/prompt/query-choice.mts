/**
 * @module query-choice
 */

export enum QueryChoice
{
    VIEW_EMPLOYEES = "View Employees",
    ADD_EMPLOYEE = "Add Employee",
    VIEW_ROLES = "View Roles",
    ADD_ROLE = "Add Role",
    VIEW_DEPARTMENTS = "View Departments",
    ADD_DEPARTMENT = "Add Department",
    QUIT = "Quit"
}

export const queryChoices = Object.freeze(Object.values(QueryChoice));
