## Aggregation
### Group by
Can use common aggregate functions in PostgreSQL :
- AVG
- COUNT
- SUM
- MAX
- MIN
- Having (filter based on an aggregated value)
- Distinct (selecting multiple rows but ONLY want unique result)
- Unions (join columns from multiple columns using JOIN)
- With Clause (join columns from multiple columns based on some condition)

```PostgreSQL
gordon=# SELECT * FROM students;
 id | name  | level | date_of_birth | teacher_id |          created_at           |          updated_at           
----+-------+-------+---------------+------------+-------------------------------+-------------------------------
  4 | Peter |    25 | 1995-05-15    |          2 | 2018-12-09 18:10:40.768561+08 | 2018-12-09 18:10:40.768561+08
  5 | John  |    20 | 1985-06-16    |          2 | 2018-12-09 18:10:40.768561+08 | 2018-12-09 18:10:40.768561+08
  6 | Simon |    15 | 1987-07-17    |            | 2018-12-09 18:10:40.768561+08 | 2018-12-09 18:10:40.768561+08
  7 | Andy  |     5 | 2005-05-15    |          2 | 2018-12-09 18:10:40.768561+08 | 2018-12-09 18:10:40.768561+08
  8 | Cesar |    10 | 1999-06-16    |          3 | 2018-12-09 18:10:40.768561+08 | 2018-12-09 18:10:40.768561+08
  9 | Danny |    30 | 1997-07-01    |          3 | 2018-12-09 18:10:40.768561+08 | 2018-12-09 18:10:40.768561+08
(6 rows)


gordon=# SELECT * FROM teachers;
 id |  name  | date_of_birth |          created_at           |          updated_at           
----+--------+---------------+-------------------------------+-------------------------------
  2 | Bob    | 1970-01-01    | 2018-12-09 18:10:40.762417+08 | 2018-12-09 18:10:40.762417+08
  3 | Herman | 1971-05-05    | 2018-12-09 18:10:40.762417+08 | 2018-12-09 18:10:40.762417+08
(2 rows)
```

###Count - count the number of students in the specified teacher

```
gordon=#
SELECT
  teachers.name,
  COUNT(students.id)
FROM
  teachers INNER JOIN students
ON
  teachers.id = students.teacher_id
GROUP BY teachers.name;

  name  | count 
--------+-------
 Herman |     2
 Bob    |     3
(2 rows)
```

###SUM
```
gordon=#
SELECT
  teachers.name, 
  SUM(students.level) 
FROM
  teachers INNER JOIN students
ON
  teachers.id = students.teacher_id
GROUP BY teachers.name;

  name  | sum 
--------+-----
 Herman |  40
 Bob    |  50
(2 rows)
```

###AVG
```
gordon=#
SELECT
  teachers.name,
  AVG(students.level)
FROM
  teachers INNER JOIN students
ON
  teachers.id = students.teacher_id
GROUP BY teachers.name;

  name  |         avg         
--------+---------------------
 Herman | 20.0000000000000000
 Bob    | 16.6666666666666667
(2 rows)
```
###MAX and MIN
```
gordon=#
SELECT
  teachers.name,
  MAX(students.level),
  MIN(students.level)
FROM
  teachers INNER JOIN students
ON
  teachers.id = students.teacher_id
GROUP BY teachers.name;
  name  | max | min 
--------+-----+-----
 Herman |  30 |  10
 Bob    |  25 |   5
(2 rows)
```

###Having (filter based on an aggregated value)
```
gordon=#
SELECT
  teachers.name,
  MAX(students.level)
FROM
  teachers INNER JOIN students
ON
  teachers.id = students.teacher_id
GROUP BY
  teachers.name
HAVING
  SUM(students.level) > 45;

 name | max 
------+-----
 Bob  |  25
(1 row)
```
###Distinct
```
gordon=# 
SELECT
  DISTINCT "teachers"."name" 
FROM
  "teachers" INNER JOIN "students" 
ON
  "teachers"."id" = "students"."teacher_id" ;

  name  
--------
 Herman
 Bob
(2 rows)
```

###Unions
```
gordon=# 
SELECT name, date_of_birth FROM students
UNION
SELECT name, date_of_birth FROM teachers;

  name  | date_of_birth 
--------+---------------
 Andy   | 2005-05-15
 Peter  | 1995-05-15
 Herman | 1971-05-05
 Cesar  | 1999-06-16
 Simon  | 1987-07-17
 Bob    | 1970-01-01
 Danny  | 1997-07-01
 John   | 1985-06-16
(8 rows)

```

###With Clause
```
WITH older_students as (
    SELECT id, date_of_birth 
        from students 
        where date_of_birth < '2000-01-01'
),
older_teachers as (
    SELECT id , date_of_birth 
        from teachers 
        where date_of_birth < '1980-01-01'
)
SELECT * FROM older_students 
    full outer join older_teachers on 
            older_students.date_of_birth = older_teachers.date_of_birth;
```


## Transaction
Rollback the current transaction if failed because  of a conflict.

```
const txn = await knex.transaction();
try{
    await txn('students').del();
    await txn('teachers').del();

    const teachers = await txn.insert([{
        name:"Bob"   ,date_of_birth:"1970-01-01"
    },{
        name:"Herman",date_of_birth:"1971-05-05"
    }]).into('teachers').returning('id');

    const [bob,herman] = teachers;
    await txn.insert([
       {name:"Peter",level:25,date_of_birth:"1995-05-15",teacher_id:bob.id},
       {name:"John" ,level:20,date_of_birth:"1985-06-16",teacher_id:bob.id},
       {name:"Simon",level:15,date_of_birth:"1987-07-17",teacher_id:null},
       {name:"Andy" ,level:5 ,date_of_birth:"2005-05-15",teacher_id:bob.id},
       {name:"Cesar",level:10,date_of_birth:"1999-06-16",teacher_id:herman.id},
       {name:"Danny",level:30,date_of_birth:"1997-07-01",teacher_id:herman.id},
    ]).into('students');
    await txn.commit();
    return;
}catch(e){
    await txn.rollback();
    return;
}
```

##Index, Constraints & Sequences
- Index: A tree data structure to enhance search performance while the search query is using the indexed columns as filters.
- Constraints: A constraint is a condition that is going to be checked by the DB to ensure the data is consistent.
- Sequences: A database object that is specified to generate sequence of values. The most common usage is for generation of id.


Constraints unique
```
 CREATE TABLE students(
    id SERIAL primary key,
    level integer NOT NULL UNIQUE,
    ...
);
```
