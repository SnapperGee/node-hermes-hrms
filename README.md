# Hermes

This package provides an HRMS (Human Resources Management Software, or Hermes for short) for organizing and recording
information for employees, roles, and departments.

## Usage

After initializing this application via the npm start command, the options to view or add employees, roles, or
departments will be available:

```text
>>> How would you like to query the database?: (Use arrow keys)
❯ View Employees
  Add Employee
  View Roles
  Add Role
  View Departments
  Add Department
  Quit
```

## View query

If a view query option is selected, then a table grid is used to present the information.

### View Employee

Employee id, first and last names, role title, department name, salary, and manager name are presented:

```text
------------------------------------------------------------------------------------------------------------------------
id | first_name | last_name      | title                         | department           | salary | manager
------------------------------------------------------------------------------------------------------------------------
1  | Roger      | Smith          | CEO                           | CSuite               | 250000 | null
2  | Jordan     | Edelstein      | CTO                           | CSuite               | 225000 | Roger Smith
3  | Mary       | Moore          | COO                           | CSuite               | 200000 | Roger Smith
4  | Lestat     | Lioncourt      | CFO                           | CSuite               | 175000 | Roger Smith
5  | Krispy     | McDonald       | Custodian                     | Maintenance          | 75000  | Mary Moore
6  | Laura      | Vanderbooben   | VIP Manager                   | Customer Service     | 75000  | Mary Moore
7  | Charles    | Bronson        | Point of Sale Agent           | Sales                | 30000  | Sholanda Dykes
------------------------------------------------------------------------------------------------------------------------
```

### View Role

Role id, title, salary, and department name are presented:

```text
------------------------------------------------------------------
id | title                         | salary | department
------------------------------------------------------------------
1  | CEO                           | 250000 | CSuite
2  | CTO                           | 225000 | CSuite
3  | COO                           | 200000 | CSuite
4  | CFO                           | 175000 | CSuite
5  | Network Admin                 | 150000 | IT
6  | Database Admin                | 125000 | IT
7  | UX Lead Designer              | 125000 | Software Development
------------------------------------------------------------------
```

### View Department

Department id and name are presented:

```text
-------------------------
id | name
-------------------------
8  | Accounting
1  | CSuite
4  | Customer Service
2  | IT
3  | Maintenance
28 | Marketing
6  | Sales
7  | Software Development
5  | Warehouse
-------------------------
```

## Add query

If an add query option to insert data is selected, then follow up questions are asked to gather the necessary
information to insert the data.

All inserted data has its leading and trailing whitespace trimmed and all internal
whitespaces are converted to single white space characters before being inserted.

All inserted data is also attempted to be validated and confirmed that it isn't blank and doesn't violate a database
constraint before being inserted.

### Add Employee

When an employee is added, the new employee's first and last name, role, and manager information is collected:

```text
>>> What is the employee's first name?: Bill
>>> What is the employee's last name?: Slowsky
>>> What is the employee's role?: (Use arrow keys)
  CEO
  CTO
  COO
  CFO
> Network Admin
  Database Admin
  UX Lead Designer
(Move up and down to reveal more choices)
>>> Who is the employee's manager?: (Use arrow keys)
❯ None
  Roger Smith
  Jordan Edelstein
  Mary Moore
  Lestat Lioncourt
  Krispy McDonald
> Bob Ross
(Move up and down to reveal more choices)

Added "Bill Slowsky" with "Server Administrator" role of "Maintenance" and manager "Bob Ross".
```

### Add Role

When a role is added, the new role's title, salary, and department information is collected:

```text
>>> What is the title of the role you would like to add?: New Role
>>> What is the salary of the role you would like to add?: 50000
>>> What department does the role belong to?: (Use arrow keys)
❯ Accounting
  CSuite
  Customer Service
  IT
  Maintenance
  Marketing
  Sales
(Move up and down to reveal more choices)

Added "New Role" role of "Accounting" department with salary $50000.
```

### Add Department

When a department is added, the new department's name is collected:

```text
>>> What is the name of the department you would like to add?: New Department

Added "New Department" department.
```
