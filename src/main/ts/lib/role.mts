import { type Department } from "./department.mjs";
import { inspect } from "node:util";

export class Role
{
    readonly #id: number;
    readonly #title: string;
    readonly #salary: number;
    readonly #department: Department;
    readonly #string: string;

    public constructor(id: number, title: string, salary: number, department: Department)
    public constructor(other: Role)
    constructor(idOrOther: number | Role, title?: string, salary?: number, department?: Department)
    {
        if (typeof idOrOther === "number")
        {
            if (title === undefined || title === null)
            {
                throw new TypeError(`${new.target.name}: ${title} title`);
            }

            if (salary === undefined || salary === null)
            {
                throw new TypeError(`${new.target.name}: ${salary} salary`);
            }

            if (department === undefined || department === null)
            {
                throw new TypeError(`${new.target.name}: ${department} department`);
            }

            this.#id = idOrOther;
            this.#title = title;
            this.#salary = salary;
            this.#department = department;
            this.#string = `${new.target.name} {id: ${this.#id}, title: "${this.#title}", salary: ${this.#salary}, department: ${this.#department}}`;

        }
        else
        {
            this.#id = idOrOther.#id;
            this.#title = idOrOther.#title;
            this.#salary = idOrOther.#salary;
            this.#department = idOrOther.#department;
            this.#string = idOrOther.#string;
        }
    }

    public get id(): number { return this.#id; }
    public get title(): string { return this.#title; }
    public get salary(): number { return this.#salary; }
    public get department(): Department { return this.#department; }

    public equals(obj: unknown | undefined | null): boolean
    {
        return obj instanceof Role
            && obj.#id === this.#id
            && obj.#title === this.#title
            && obj.#salary === this.#salary
            && obj.#department.equals(this.#department);
    }

    public get [Symbol.toStringTag](): string { return this.#string; }
    public [inspect.custom](): string { return this.#string; }
}

export default Role;
