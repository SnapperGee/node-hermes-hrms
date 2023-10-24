/**
 * @module hermes
 */

import { getDepartments } from "./lib/db/get-departments.mjs";
import { getRoles } from "./lib/db/get-roles.mjs";
import { getEmployeesView } from "./lib/db/get-employee.mjs";
import { departmentsToStringGrid, rolesToStringGrid, employeesToStringGrid } from "./cli/table-grid-string.mjs";

const departments = await getDepartments();
const roles = await getRoles(departments);
const employeesView = await getEmployeesView();

console.log(departmentsToStringGrid(departments));
// console.log(rolesToStringGrid(roles));
// console.log(employeesToStringGrid(employeesView));
