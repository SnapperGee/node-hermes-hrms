import { type Role } from "./role.mjs";
import { inspect } from "node:util";

export class Employee
{
    readonly #id: number;
    readonly #firstName: string;
    readonly #lastName: string;
    readonly #role: Role;
    readonly #managerId: number | null;
    readonly #string: string;

    public constructor(id: number, firstName: string, lastName: string, role: Role, managerId: number | null);
    public constructor(other: Employee);
    constructor(idOrOther: number | Employee, firstName?: string, lastName?: string, role?: Role, managerId?: number | null)
    {
        if (typeof idOrOther === "number")
        {
            if (firstName === undefined || firstName === null)
            {
                throw new TypeError(`${new.target.name}: ${firstName} first name`);
            }

            if (lastName === undefined || lastName === null)
            {
                throw new TypeError(`${new.target.name}: ${lastName} last name`);
            }

            if (role === undefined || role === null)
            {
                throw new TypeError(`${new.target.name}: ${role} role`);
            }

            this.#id = idOrOther;
            this.#firstName = firstName;
            this.#lastName = lastName;
            this.#role = role;
            this.#managerId = managerId ?? null;
            this.#string = `${new.target.name} {id: ${this.#id}, firstName: "${this.#firstName}", lastName: "${this.#lastName}", role: ${this.#role}, managerId: ${this.#managerId}`;
        }
        else
        {
            this.#id = idOrOther.#id;
            this.#firstName = idOrOther.#firstName;
            this.#lastName = idOrOther.#lastName;
            this.#role = idOrOther.#role;
            this.#managerId = idOrOther.#managerId;
            this.#string = idOrOther.#string;
        }
    }

    public get id(): number { return this.#id; }
    public get firstName(): string { return this.#firstName; }
    public get lastName(): string { return this.#lastName; }
    public get role(): Role { return this.#role; }
    public get managerId(): number | null { return this.#managerId; }

    public equals(obj: unknown): boolean
    {
        return obj instanceof Employee
            && obj.#id === this.#id
            && obj.#firstName === this.#firstName
            && obj.#lastName === this.#lastName
            && obj.#role.equals(this.#role)
            && (obj.#managerId === this.#managerId
                || obj.#managerId !== null && this.#managerId !== null
                    && obj.#id === this.#id
                    && obj.#firstName === this.#firstName
                    && obj.#lastName === this.#lastName
                    && obj.#role.equals(this.#role));
    }

    public get [Symbol.toStringTag](): string { return this.#string; }
    public [inspect.custom](): string { return this.#string; }
}

export default Employee;
