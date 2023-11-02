# Hermes

This package provides an HRMS (Human Resources Management Software, or Hermes for short) for organizing and recording
information for employees, roles, and departments.

## Usage

A demo video showing the application in action can be found -> [HERE](https://drive.google.com/file/d/1KO3tfGM4iwMAYeCR8bAmiTNO4VSLDN2O/view?usp=drive_link) <- and down below examples of its features are shown.

The application can be built running the `npm run build-dist` command and then run via the `npm start` command. Once the
application is started, the options to view or add employees, roles, or departments or to quit will be available:

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

### View Employees

Employee id, first and last names, role title, department name, salary, and manager name are presented:

```text
>>> How would you like to query the database?: View Employees
┌─────────┬────┬──────────────────────────┬─────────────────────────────────┬────────────────────────┬──────────┬─────────────────────────┐
│ (index) │ id │           name           │              title              │       department       │  salary  │         manager         │
├─────────┼────┼──────────────────────────┼─────────────────────────────────┼────────────────────────┼──────────┼─────────────────────────┤
│    0    │ 1  │      'Roger Smith'       │              'CEO'              │        'CSuite'        │ '250000' │          null           │
│    1    │ 2  │    'Jordan Edelstein'    │              'CTO'              │        'CSuite'        │ '225000' │      'Roger Smith'      │
│    2    │ 3  │       'Mary Moore'       │              'COO'              │        'CSuite'        │ '200000' │      'Roger Smith'      │
│    3    │ 4  │    'Lestat Lioncourt'    │              'CFO'              │        'CSuite'        │ '175000' │      'Roger Smith'      │
│    4    │ 30 │    'Jenny Frondabloc'    │   'Merchandising Specialist'    │      'Warehouse'       │ '30000'  │ "Israel Kamakamiwo'ole" │
│    5    │ 31 │   'Abigail Lemonparty'   │      'Point of Sale Agent'      │        'Sales'         │ '30000'  │    'Sholanda Dykes'     │
│    6    │ 32 │      'Dan Handsome'      │      'Point of Sale Agent'      │        'Sales'         │ '30000'  │    'Sholanda Dykes'     │
│    7    │ 33 │      'Bing Cooper'       │      'Point of Sale Agent'      │        'Sales'         │ '30000'  │    'Sholanda Dykes'     │
│    8    │ 34 │ 'Demitri Krotchliknioff' │          'Accountant'           │      'Accounting'      │ '100000' │   'Lestat Lioncourt'    │
│    9    │ 35 │     'Sholanda Dykes'     │          'Sales Lead'           │        'Sales'         │ '75000'  │      'Mary Moore'       │
│   10    │ 36 │        'Bob Ross'        │       'UX Lead Designer'        │ 'Software Development' │ '125000' │      'Roger Smith'      │
└─────────┴────┴──────────────────────────┴─────────────────────────────────┴────────────────────────┴──────────┴─────────────────────────┘
```

### View Employees By Manager

Employee info is shown for employees with the specified manager:

```text
>>> How would you like to query the database?: View Employees by Manager
>>> Choose the manager you'd like to view employees of: (Use arrow keys)
❯ Roger Smith
  Jordan Edelstein
  Mary Moore
  Lestat Lioncourt
  Braf Zachlin
  Chex LeMeneux
  Ace Chapman
(Move up and down to reveal more choices)

>>> Choose the manager you'd like to view employees of: Roger Smith
┌─────────┬────┬────────────────────┬────────────────────┬────────────────────────┬──────────┐
│ (index) │ id │        name        │       title        │       department       │  salary  │
├─────────┼────┼────────────────────┼────────────────────┼────────────────────────┼──────────┤
│    0    │ 2  │ 'Jordan Edelstein' │       'CTO'        │        'CSuite'        │ '225000' │
│    1    │ 3  │    'Mary Moore'    │       'COO'        │        'CSuite'        │ '200000' │
│    2    │ 4  │ 'Lestat Lioncourt' │       'CFO'        │        'CSuite'        │ '175000' │
│    3    │ 36 │     'Bob Ross'     │ 'UX Lead Designer' │ 'Software Development' │ '125000' │
└─────────┴────┴────────────────────┴────────────────────┴────────────────────────┴──────────┘
```

### View Employees By Department

Employee info is shown for employees with the specified department:

```text
>>> How would you like to query the database?: View Employees by Department
>>> Choose the department you'd like to view employees of:
  Accounting
❯ CSuite
  Customer Service
  IT
  Maintenance
  Sales
  Software Development
(Move up and down to reveal more choices)

>>> Choose the department you'd like to view employees of: CSuite
┌─────────┬────┬────────────────────┬───────┬──────────┬───────────────┐
│ (index) │ id │        name        │ title │  salary  │    manager    │
├─────────┼────┼────────────────────┼───────┼──────────┼───────────────┤
│    0    │ 1  │   'Roger Smith'    │ 'CEO' │ '250000' │     null      │
│    1    │ 2  │ 'Jordan Edelstein' │ 'CTO' │ '225000' │ 'Roger Smith' │
│    2    │ 3  │    'Mary Moore'    │ 'COO' │ '200000' │ 'Roger Smith' │
│    3    │ 4  │ 'Lestat Lioncourt' │ 'CFO' │ '175000' │ 'Roger Smith' │
└─────────┴────┴────────────────────┴───────┴──────────┴───────────────┘
```

### View Roles

Role id, title, salary, and department name are presented:

```text
>>> How would you like to query the database?: View Roles
┌─────────┬────┬─────────────────────────────────┬──────────┬────────────────────────┐
│ (index) │ id │              title              │  salary  │    department_name     │
├─────────┼────┼─────────────────────────────────┼──────────┼────────────────────────┤
│    0    │ 1  │              'CEO'              │ '250000' │        'CSuite'        │
│    1    │ 2  │              'CTO'              │ '225000' │        'CSuite'        │
│    2    │ 3  │              'COO'              │ '200000' │        'CSuite'        │
│    3    │ 4  │              'CFO'              │ '175000' │        'CSuite'        │
│    4    │ 21 │          'Accountant'           │ '100000' │      'Accounting'      │
│    5    │ 22 │          'Sales Lead'           │ '75000'  │        'Sales'         │
└─────────┴────┴─────────────────────────────────┴──────────┴────────────────────────┘
```

### View Department

Department id and name are presented:

```text
>>> How would you like to query the database?: View Departments
┌─────────┬────┬────────────────────────┐
│ (index) │ id │          name          │
├─────────┼────┼────────────────────────┤
│    0    │ 8  │      'Accounting'      │
│    1    │ 1  │        'CSuite'        │
│    2    │ 4  │   'Customer Service'   │
│    3    │ 2  │          'IT'          │
│    4    │ 3  │     'Maintenance'      │
│    5    │ 6  │        'Sales'         │
│    6    │ 7  │ 'Software Development' │
│    7    │ 5  │      'Warehouse'       │
└─────────┴────┴────────────────────────┘
```

### View Total Role Salaries

Displays the total salaries for each role:

```text
>>> How would you like to query the database?: View Total Roles Salaries
┌─────────┬─────────────────────────────────┬──────────┐
│ (index) │              role               │  total   │
├─────────┼─────────────────────────────────┼──────────┤
│    0    │          'Accountant'           │ '100000' │
│    1    │  'Backend  Infrastructure Dev'  │ '250000' │
│    2    │              'CEO'              │ '250000' │
│    3    │              'CFO'              │ '175000' │
│    4    │              'COO'              │ '200000' │
│    5    │              'CTO'              │ '225000' │
│    6    │           'Custodian'           │ '150000' │
│    7    │        'Database Admin'         │ '250000' │
│    8    │ 'Frontend Interface Developer'  │ '125000' │
│    9    │        'Inventory Lead'         │ '45000'  │
│   10    │     'Inventory Specialist'      │ '60000'  │
│   11    │      'Merchandising Lead'       │ '45000'  │
│   12    │   'Merchandising Specialist'    │ '60000'  │
│   13    │         'Network Admin'         │ '300000' │
│   14    │      'Point of Sale Agent'      │ '150000' │
│   15    │     'Remote Support Agent'      │ '90000'  │
│   16    │      'Remote Support Lead'      │ '50000'  │
│   17    │          'Sales Lead'           │ '75000'  │
│   18    │     'Server Administrator'      │ '100000' │
│   19    │ 'Shipping/Receiving Specialist' │ '60000'  │
│   20    │       'UX Lead Designer'        │ '250000' │
│   21    │          'VIP Manager'          │ '75000'  │
└─────────┴─────────────────────────────────┴──────────┘
```

## Add query

If an add query option to insert data is selected, then follow up questions are asked to gather the necessary
information to insert the data.

All inserted data has its leading and trailing whitespace trimmed and all internal
white spaces are converted to single white space characters before being inserted.

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

## Delete Query

If a delete query option is selected, then a list of pre-existing resources to choose form to delete is presented.

### Delete Employee

A list of employees to delete is presented to choose from:

```text
>>> How would you like to query the database?: Delete Employee
>>> Choose the employee you'd like to delete:
❯ employee: "New Employee" | role: "New Role" | department: "New Department"
  employee: "Roger Smith" | role: "CEO" | department: "CSuite"
  employee: "Jordan Edelstein" | role: "CTO" | department: "CSuite"
  employee: "Mary Moore" | role: "COO" | department: "CSuite"
  employee: "Lestat Lioncourt" | role: "CFO" | department: "CSuite"
  employee: "Krispy McDonald" | role: "Custodian" | department: "Maintenance"
  employee: "Laura Vanderbooben" | role: "VIP Manager" | department: "Customer Service"
(Move up and down to reveal more choices)

>>> Choose the employee you'd like to delete: employee: "New Employee" | role: "New Role" | department: "New Department"

Deleted employee "New Employee" with "New Role" role of "New Department" department and manager "Bob Ross".
```

### Delete Role

A list of roles to delete is presented to choose from:

```text
>>> How would you like to query the database?: Delete Role
>>> Choose the role you'd like to delete:
  Sales Lead
❯ New Role
  CEO
  CTO
  COO
  CFO
  Network Admin
(Move up and down to reveal more choices)

>>> Choose the role you'd like to delete: New Role

Deleted "New Role" role.
```

### Delete Department

A list of departments to delete is presented to choose from:

```text
>>> How would you like to query the database?: Delete Department
>>> Choose the department you'd like to delete:
❯ New Department
  Sales
  Software Development
  Warehouse
  Accounting
  CSuite
  Customer Service
(Move up and down to reveal more choices)

>>> Choose the department you'd like to delete: New Department

Deleted "New Department" department.
```

## Update Query

Employee managers can be updated to different employees. When this option is
selected the employee of the manger you want to update can be selected then
you can choose which employee to update to their new manager as:

```text
>>> How would you like to query the database?: Update Employee Manager
>>> Which employee do you want to update the manager for?:
❯ employee: "New Employee" | role: "UX Lead Designer" | department: "Software Development" | manager: "Mary Moore"
  employee: "Roger Smith" | role: "CEO" | department: "CSuite" | manager: "null"
  employee: "Jordan Edelstein" | role: "CTO" | department: "CSuite" | manager: "Roger Smith"
  employee: "Mary Moore" | role: "COO" | department: "CSuite" | manager: "Roger Smith"
  employee: "Lestat Lioncourt" | role: "CFO" | department: "CSuite" | manager: "Roger Smith"
  employee: "Krispy McDonald" | role: "Custodian" | department: "Maintenance" | manager: "Mary Moore"
  employee: "Laura Vanderbooben" | role: "VIP Manager" | department: "Customer Service" | manager: "Mary Moore"
(Move up and down to reveal more choices)

>>> Which employee do you want to update the manager for?: employee: "New Employee" | role: "UX Lead Designer" | department: "Software Development" | manager:
"Mary Moore"
>>> Which manager do you want to update as the employee's new manager?:
  Jordan Edelstein
  Braf Zachlin
  Chex LeMeneux
❯ Ace Chapman
  Juanito Pequeño
  Israel Kamakamiwo'ole
  Lestat Lioncourt
(Move up and down to reveal more choices)

>>> Which manager do you want to update as the employee's new manager?: Ace Chapman

Updated manager of "New Employee" with "UX Lead Designer" role of "Software Development" department from "Mary Moore" to "Ace Chapman".
```
