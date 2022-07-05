-- CREATE TABLE students (
--     id SERIAL primary key,
-- name VARCHAR(255) not null,
--     level INTEGER not null,
--     date_of_birth DATE
-- );
-- ALTER TABLE students
--     RENAME TO learners;
-- ALTER TABLE students
-- ADD COLUMN date_of_birth date;
-- INSERT INTO students (name, level, date_of_birth)
-- VALUES ('Peter', 25, '1995-05-15');
-- INSERT INTO students (name, level, date_of_birth)
-- VALUES ('John', 10, '1985-06-16');
-- INSERT INTO students (name, level, sport)
-- VALUES ('Alex', 80, 'j');
-- ALTER TABLE students
-- ALTER COLUMN sport TYPE VARCHAR(255);
-- -- ALTER TABLE students ADD COLUMN goodjob date;
-- -- ALTER TABLE students DROP ROW id #4;
-- ALTER TABLE students DROP COLUMN goodjob;
-- INSERT INTO students (name,level,date_of_birth,sport) VALUES ('Tommy',99,'1001-01-01', 'play'),('Jon Snow',102,'1922-02-02','coding'),('Siri',1,'1810-01-12','love');
SELECT *
FROM students - -
WHERE level > 60