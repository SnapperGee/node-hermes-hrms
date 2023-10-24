import { type Role } from "./role.mjs";
import { inspect } from "node:util";

export class Employee<ManagerType extends number | string>
{
    readonly #id: number;
    readonly #firstName: string;
    readonly #lastName: string;
    readonly #role: Role;
    readonly #manager: ManagerType | null;
    readonly #string: string;

    public constructor(id?: number, firstName?: string, lastName?: string, role?: Role, manager?: ManagerType | null);
    public constructor(other?: Employee<ManagerType>);
    constructor(idOrOther?: number | Employee<ManagerType>, firstName?: string, lastName?: string, role?: Role, manager?: ManagerType)
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
            this.#manager = manager ?? null;
            this.#string = `${new.target.name} {id: ${this.#id}, firstName: "${this.#firstName}", lastName: "${this.#lastName}", role: ${this.#role}, manager: ${typeof this.#manager === "string" ? `"${this.#manager}"` : `${this.#manager}`}`;
        }
        else
        {
            if (idOrOther === undefined || idOrOther === null)
            {
                throw new TypeError(`${new.target.name}: ${idOrOther} ID or ${new.target.name} object to copy`);
            }

            this.#id = idOrOther.#id;
            this.#firstName = idOrOther.#firstName;
            this.#lastName = idOrOther.#lastName;
            this.#role = idOrOther.#role;
            this.#manager = idOrOther.#manager;
            this.#string = idOrOther.#string;
        }
    }

    public get id(): number { return this.#id; }
    public get firstName(): string { return this.#firstName; }
    public get lastName(): string { return this.#lastName; }
    public get role(): Role { return this.#role; }
    public get manager(): ManagerType | null { return this.#manager; }

    public equals(obj: unknown): boolean
    {
        return obj instanceof Employee
            && obj.#id === this.#id
            && obj.#firstName === this.#firstName
            && obj.#lastName === this.#lastName
            && obj.#role.equals(this.#role)
            && (obj.#manager === this.#manager
                || obj.#manager !== null && this.#manager !== null
                    && obj.#id === this.#id
                    && obj.#firstName === this.#firstName
                    && obj.#lastName === this.#lastName
                    && obj.#role.equals(this.#role));
    }
    public toString(): string { return this.#string; }
    public [inspect.custom](): string { return this.#string; }
}

export class EmployeeWithManagerID extends Employee<number>
{
    public constructor(id: number, firstName: string, lastName: string, role: Role, managerId: number | null);
    public constructor(other: EmployeeWithManagerID);
    constructor(idOrOther: number | EmployeeWithManagerID, firstName?: string, lastName?: string, role?: Role, managerId?: number | null)
    {
        if (typeof idOrOther === "number")
        {
            super(idOrOther, firstName, lastName, role, managerId);
        }
        else
        {
            super(idOrOther);
        }
    }
}

export default EmployeeWithManagerID;
