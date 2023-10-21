/**
 * @module hermes
 */

import "dotenv/config";
import { Pool, createPool } from "mysql2/promise";

export const hermesDbConnectionPool: Pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: parseFloat(process.env.PORT ?? "3306"),
    connectionLimit: 4
});

export const tableNames = async (connectionPool = hermesDbConnectionPool): Promise<string[]> => Object.values((
    await connectionPool.execute("SHOW TABLES;").catch(err => { throw err; }))[0])
    .map(tableEntry => tableEntry[`Tables_in_${process.env.DATABASE}`]);

export const tables = async (connectionPool = hermesDbConnectionPool, tables?: string[]) => Object.fromEntries(await Promise.all(
    (tables ?? await tableNames()).map(async tableName =>
        [
            tableName,
            ((await connectionPool.execute(
                'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?',
                [tableName, process.env.DATABASE])
            )[0] as unknown[])
                .map((row: any) => row.COLUMN_NAME)
        ])));
