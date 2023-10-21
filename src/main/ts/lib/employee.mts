import { type Role } from "./role.mjs";
import { inspect } from "node:util";

const toString = (arg: unknown): string => typeof arg === "string" ? `"${arg}"` : `${arg}`;

export class Employee
{
    readonly #id: number;
    readonly #firstName: string;
    readonly #lastName: string;
    readonly #role: Role;
    readonly #manager: Employee | null;
    readonly #string: string;

    public constructor(idOrOther: number | Employee, firstName: string, lastName: string, role: Role, manager?: Employee | null)
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
            this.#string = `${new.target.name} {id: ${this.#id}, firstName: "${this.#firstName}", lastName: "${this.#lastName}", role: ${this.#role}, manager: ${toString(this.#manager)}`;

        }
        else
        {
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

    public equals(obj: unknown | undefined | null): boolean
    {
        return obj instanceof Employee
            && obj.#id === this.#id
            && obj.#firstName === this.#firstName
            && obj.#lastName === this.#lastName
            && obj.#role.equals(this.#role)
            && (obj.#manager === this.#manager ||    obj.#manager !== null && this.#manager !== null
                                                  && obj.#manager.id === this.#manager.#id
                                                  && obj.#manager.firstName === this.#manager.#firstName
                                                  && obj.#manager.lastName === this.#manager.#lastName
                                                  && obj.#manager.role.equals(this.#manager.#role));
    }

    public get [Symbol.toStringTag](): string { return this.#string; }
    public [inspect.custom](): string { return this.#string; }
}

export default Employee;
