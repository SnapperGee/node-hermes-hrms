import { inspect } from "node:util";

export class Department
{
    readonly #id: number;
    readonly #name: string;
    readonly #string: string;

    public constructor(id: number, name: string)
    public constructor(other: Department)
    constructor(idOrOther: number | Department, name?: string)
    {
        if (typeof idOrOther === "number")
        {
            if (name === undefined || name === null)
            {
                throw new TypeError(`${new.target.name}: ${name} name`);
            }

            this.#id = idOrOther;
            this.#name = name;
            this.#string = `${new.target.name} {id: ${this.#id}, name: "${this.#name}"}`;
        }
        else
        {
            this.#id = idOrOther.#id;
            this.#name = idOrOther.#name;
            this.#string = idOrOther.#string;
        }
    }

    public get id(): number { return this.#id; }
    public get name(): string { return this.#name; }

    public equals(obj: unknown | undefined | null): boolean
    {
        return obj instanceof Department && obj.#id === this.#id && obj.#name === this.#name;
    }

    public get [Symbol.toStringTag](): string { return this.#string; }
    public [inspect.custom](): string { return this.#string; }
}

export default Department;
