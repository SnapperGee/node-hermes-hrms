/**
 * @module query-choice
 */

export const enum QueryChoiceString
{
    VIEW_EMPLOYEES = "View Employees",
    ADD_EMPLOYEE = "Add Employee",
    VIEW_ROLES = "View Roles",
    ADD_ROLE = "Add Role",
    VIEW_DEPARTMENTS = "View Departments",
    ADD_DEPARTMENT = "Add Department",
    QUIT = "Quit"
}

export const viewEmployees = Object.freeze({
    name: QueryChoiceString.VIEW_EMPLOYEES,
    value: QueryChoiceString.VIEW_EMPLOYEES
});

export const addEmployee = Object.freeze({
    name: QueryChoiceString.ADD_EMPLOYEE,
    value: QueryChoiceString.ADD_EMPLOYEE
});

export const viewRoles = Object.freeze({
    name: QueryChoiceString.VIEW_ROLES,
    value: QueryChoiceString.VIEW_ROLES
});

export const addRole = Object.freeze({
    name: QueryChoiceString.ADD_ROLE,
    value: QueryChoiceString.ADD_ROLE
});

export const viewDepartments = Object.freeze({
    name: QueryChoiceString.VIEW_DEPARTMENTS,
    value: QueryChoiceString.VIEW_DEPARTMENTS
});

export const addDepartment = Object.freeze({
    name: QueryChoiceString.ADD_DEPARTMENT,
    value: QueryChoiceString.ADD_DEPARTMENT
});

export const quit = Object.freeze({
    name: QueryChoiceString.QUIT,
    value: QueryChoiceString.QUIT
});

export const queryChoice = Object.freeze({
    viewEmployees,
    addEmployee,
    viewRoles,
    addRole,
    viewDepartments,
    addDepartment,
    quit
});

export default queryChoice;
