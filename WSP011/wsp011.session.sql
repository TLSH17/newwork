-- DROP DATABASE demo;
-- CREATE DATABASE demo;
-- CREATE USER demo_admin with encrypted password 'demo_admin';
-- GRANT ALL PRIVILEGES ON DATABASE demo TO demo_admin;
-- \ c demon 
-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );
-- INSERT INTO users  (username,password) VALUES ('tommy', 'tecky');
SELECT *
FROM users