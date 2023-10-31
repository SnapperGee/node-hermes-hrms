/**
 * @module model
 */

export interface Department
{
    id: number;
    name: string;
}

export interface Role
{
    id: number;
    title: string;
    salary: number;
    department_name: string;
}

export interface Employee
{
    id: number;
    name: string;
    title: string;
    department: string;
    salary: number;
    manager: string | null;
}
