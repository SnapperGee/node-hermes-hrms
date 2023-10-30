/**
 * @module connection
 */

import "dotenv/config";
import { Connection, createConnection } from "mysql2/promise";

/**
 * The async connection for the database.
 */
export const connection: Readonly<Connection> = Object.freeze( await createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: parseFloat(process.env.PORT ?? "3306"),
}));

export default connection;
