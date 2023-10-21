/**
 * @module connection-pool
 */

import "dotenv/config";
import { Pool, createPool } from "mysql2/promise";

/**
 * The async connection pool for the database.
 */
export const connectionPool: Readonly<Pool> = Object.freeze(createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: parseFloat(process.env.PORT ?? "3306"),
    connectionLimit: 4
}));

export default connectionPool;
