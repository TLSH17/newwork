# SQL

SQL is a database that 儲存資料，數據庫。比.json 更有效率

terminal 指令：

> psql

進入 postgres SQL，之後都是使用 sql 指令：

```sql
-- 創建新用家，及密碼
CREATE USER your-username-here WITH PASSWORD 'your-password-here' SUPERUSER;

-- 創建新database
CREATE DATABASE tecky;
```

\password: Change password
\q: Quit psql shell
\c database: Connect to Database
\l: Show all databases
\d+: Show all tables in the current connected database
\d+ table: Show table schema detail for the current database
\s filename: Save current SQL history to file

---

## SQLTOOLS

如果使用 vscode 內的 extension - SQLTOOLS

需要先在 terminal 創建 database 後，在 sqltool setting 中連結 database，輸入返相應 database information 就可以自動連結相關 database，在相應的.sql 文件中輸入 sql 指令，然後點擊上方的 run query 將會對 database 執行相應指令。

## SQL 指令

### Create Table 創建 table

```sql
-- E.g. :

CREATE TABLE students (
    id SERIAL primary key,
    name VARCHAR(255) not null,
    level INTEGER not null,
    date_of_birth DATE
);
```

<!-- Remarks serial 是順序排列，即使資料deleted，都會延續數字，直到用reset式drop table -->
<!-- primary key 是用以連接其他table的一個關連，如a table設id primary key -->
<!-- 然後b table 可以以user_id 去連結a table syntax寫法： -->

```sql
CREATE TABLE a (
    id SERIAL primary key,
    name VARCHAR(255) not null
)

CREATE TABLE b (
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES a(id),
    -- user_id 源自於 a table 的 id 意思
    score INTEGER
)
```

### 修改 ALTER

```sql
-- 更改table名
ALTER TABLE students RENAME TO learners;
-- 修改column type
ALTER TABLE students ALTER COLUMN date_of_birth TYPE timestamp;
-- 修改column名
ALTER TABLE students RENAME COLUMN date_of_birth TO birthday;
-- remove column （不只清空數據，整個刪除）
ALTER TABLE students DROP COLUMN data_of_birth;
-- 新增column
ALTER TABLE students ADD COLUMN date_of_birth;

```

### 放入資料 INSERT INTO...VALUE

```sql
INSERT INTO student (name,level,data_of_birth) VALUES ('alex',2,'1994-10-08');
-- based on the table (column) which you want to / must to add VALUES (data)
-- if the table setting have some data type set 'NOT NULL', thats you must to add the data everytime you can't miss it.
-- it there have some column data no need to insert, just skip it.
```

### 更新資料 UPDATE...SET

```sql
UPDATE students SET level = level + 5;
UPDATE students SET level = level + 5 WHERE name = 'Alex';
```

### 清空／刪除/倒 TRUNCATE/DELETE/DROP

```sql
-- TRUNCATE TABLE
TRUNCATE TABLE students;
-- This will keep the table setting, but all the data will removed

-- DELETE
DELETE TABLE students;
-- This will keep that table setting, but all the data will removed, same as TRUNCATE

DELETE TABLE students where level < 5;
-- This will remove the data row which match the level < 5

-- DROP TABLE
DROP TABLE students;
-- This will remove the table will all data and table setting, nothing anymore.
DROP DATABASE tecky;
-- Remove the DATABASE.
```

### 顯示／搜索 SELECT...FROM...WHERE

```sql
SELECT * FROM students;

SELECT * FROM students WHERE name = 'Alex';

SELECT id FROM students WHERE name = 'Alex';

-- case sensitive - LIKE | case insensitive - ILIKE
SELECT id,name,level FROM students WHERE name like '%A#';
```

### 排序 ORDER BY／ORDER BY ... DESC

```sql
-- 由小到大排
SELECT * FROM students ORDER BY level;
-- 由level小到大排，相同時再按bd小到大排
SELECT * FROM students ORDER BY level,date_of_birth;
-- 由大到小排
SELECT * FROM students ORDER BY level DESC;
```

### 限制／抵銷 LIMIT / OFFSET

LIMIT 是限制顯示結果多少，如果搜索結果有 2000 個，如果設 LIMIT 10 則只是顯示首 10 個

OFFSET 是抵銷，基於 limit 出的結果，可以抵銷數量；例如搜索結果有 100； limit 10 offset 10
將會顯示第 11－20 個

```sql
SELECT * FROM students ORDER BY level,date_of_birth LIMIT 2;
-- if result have 3, limit 2 will return 1,2 data

SELECT * FROM students ORDER BY level,date_of_birth LIMIT 2 OFFSET 1;
-- if resulte have 3, limit 2 offset 1 will return 2,3 data

```

## Data types

### NUMERIC TYPE

#### Integer
