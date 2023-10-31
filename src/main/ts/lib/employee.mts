export interface Employee
{
    id: number;
    first_name: string;
    last_name: string;
    title: string;
    department: string;
    salary: number;
    manager: string | null;
}

export default Employee;
