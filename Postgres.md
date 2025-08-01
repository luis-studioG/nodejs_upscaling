
# SQL vs NoSQL
SQL is a relational database management system (RDBMS) that stores data in a tabular format, while NoSQL is a non-relational database management system that stores data in a non-tabular format.

SQL is used for structured data, while NoSQL is used for unstructured data.

SQL is used for complex queries, while NoSQL is used for simple queries.

SQL is used for ACID transactions, while NoSQL is used for BASE transactions.

1. Select statement
```
SELECT column1, column2
FROM table_name
WHERE condition;
```

2. Insert statement
```
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

3. Update statement
```
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

4. Delete statement
```
DELETE FROM table_name
WHERE condition;
```

5. JOIN statement
```
SELECT table1.column1, table2.column2
FROM table1
JOIN table2
ON table1.column = table2.column;
```

[DATA TYPES]
- PRIMARY KEY: unique identifier for each record in a table
- FOREIGN KEY: unique identifier for each record in another table
- UNIQUE: unique value for each record
- NOT NULL: value cannot be null
- DEFAULT: value is set to a default value if no value is provided
- CHECK: value must meet a certain condition
- INDEX: value is indexed for faster retrieval
- VARCHAR: variable character
- INT: integer
- FLOAT: floating point number
- DATE: date
- TIME: time
- DATETIME: date and time

[AGREGATE FUNCTIONS]
- COUNT: count the number of records
- SUM: sum the values of a column
- AVG: average the values of a column
- MAX: maximum value of a column
- MIN: minimum value of a column
- GROUP BY: group the records by a column

6. ORDER BY
```
SELECT column_name, COUNT(column_name) AS count_alias
FROM table_name
GROUP BY column_name
ORDER BY count_alias DESC;
```

7. Subqueries
```
SELECT employee_name
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM departments
    WHERE department_name = 'Sales'
)
ORDER BY employee_name;
```

[ACID]
- Atomicity: all or nothing
- Consistency: data is valid according to business rules
- Isolation: concurrent transactions are isolated from each other
- Durability: once a transaction is committed, it persists even in case of system failure


# Postgres
Run psql -U postgres to connect to the database.

Run psql -U postgres -d database_name to connect to a specific database.

Run psql -U postgres -d database_name -f file.sql to run a script file.

Run \q to quit the database.

Run \l to list all databases.

Run \c database_name to connect to a specific database.

Run \dt to list all tables.

1. Create a database
```
CREATE DATABASE database_name;
```

2. Create a table
```
CREATE TABLE table_name (
    column1 data_type,  
    column2 data_type,
    ...
);
```

3. Insert a record
```
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

4. Update a record
```
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

5. Delete a record
```
DELETE FROM table_name
WHERE condition;
```

6. LIKE
```
SELECT * FROM table_name
WHERE column_name LIKE '%value%';
```

7. IN
```
SELECT * FROM table_name
WHERE column_name IN (value1, value2, ...);
```

8. BETWEEN
```
SELECT * FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

9. AND
```
SELECT * FROM table_name
WHERE column_name AND value1 AND value2;
```

10. OR
```
SELECT * FROM table_name
WHERE column_name OR value1 OR value2;
```

11. NOT
```
SELECT * FROM table_name
WHERE column_name NOT value1;
```

12. NOW
```
SELECT NOW()::DATE - INTERVAL '1 day';

SELECT NOW()::DATE - INTERVAL '1 day' AS yesterday;
```

13. EXTRACT
```
SELECT EXTRACT(YEAR FROM NOW()); // 2025

SELECT EXTRACT(MONTH FROM NOW()); // 7

SELECT EXTRACT(DAY FROM NOW()); // 23

SELECT EXTRACT(DOW FROM NOW()); // 1 (Wednesday)
```

14. UNIQUE Constraint
```
CREATE TABLE table_name (
    column1 data_type NOT NULL UNIQUE, // unique value for each row
    column2 data_type NOT NULL,
    ...
);
```

