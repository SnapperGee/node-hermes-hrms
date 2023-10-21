/**
 * @module hermes
 */

import "dotenv/config";
import { getDepartments } from "./lib/db/get-departments.mjs";
// import { connectionPool } from "./lib/db/connection-pool.mjs";

// const employees = await connectionPool.query("SELECT * FROM employees_view");

console.log(await getDepartments());
