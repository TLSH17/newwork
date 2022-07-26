-- SELECT *
-- FROM user_photo;
SELECT *
FROM user_photo;
-- SELECT *
-- FROM user_hobby;
-- SELECT *
-- FROM chatroom;
-- DELETE FROM users;
-- drop table message;
-- insert into chatroom (name, user_id_left, user_id_right)
-- VALUES ('chat001', 240, 238);
-- delete from users;
-- select * from users WHERE id != 210 AND id != 211 AND id != 212;
-- Select user_id_received from friendship_level where friendship_level != 0 and user_id_given = 210;
-- select * from users JOIN friendship_level ON friendship_level.user_id_received = users.id
-- WHERE
-- select * from users WHERE id 
-- DELETE FROM friendship_level;
-- SELECT file_name FROM user_photo WHERE user_id IN (SELECT id FROM users WHERE id = 209);
-- select users.id as id, users.username as username, user_photo.file_name as file_name 
-- FROM users, user_photo 
-- WHERE users.id = user_photo.user_id AND users.id = 210;
-- select file_name from user_photo where user_id = 210;
-- SELECT *
-- FROM user_photo;
-- SELECT username, file_name FROM users CROSS JOIN user_photo ON users.id = user_photo.user_id;
-- SELECT username from users
-- WHERE id IN (SELECT user_id_received FROM friendship_level
-- WHERE user_id_given = 201
-- SELECT user_id_given,
--     user_id_received
-- FROM friendship_level
-- where user_id_given =201;
-- DELETE FROM users;
--  CREATE DATABASE wspproject;
--  \ c wspproject;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar(255) NOT NUll UNIQUE,
    password varchar(255) NOT NUll,
    nick_name varchar(255),
    email varchar(255),
    gender varchar(255) NOT NUll,
    interested_in_gender varchar(255) NOT NUll,
    interested_in_type varchar(255),
    height INTEGER,
    date_of_birth DATE NOT NUll,
    description TEXT,
    created_at DATE,
    updated_at DATE,
    is_logged_in BOOLEAN,
    number_of_like INTEGER,
    nationality VARCHAR(255),
    zodiac_signs VARCHAR(255)
);
--  CREATE TABLE user_photo (
--      id SERIAL PRIMARY KEY,
--      user_id integer,
--      FOREIGN KEY (user_id) REFERENCES users (id),
--      created_at DATE,
--      updated_at DATE,
--      active BOOLEAN
--  );
--  CREATE TABLE hobby(
--      id SERIAL PRIMARY KEY,
--      content varchar(255) not NULL
--  );
--  CREATE TABLE user_hobby(
--      id SERIAL PRIMARY KEY,
--      user_id integer,
--      hobby_id integer,
--      FOREIGN KEY (user_id) REFERENCES users(id),
--      FOREIGN KEY (hobby_id) REFERENCES hobby(id)
--  );
--  CREATE TABLE friendship_level(
--      id SERIAL PRIMARY KEY,
--      user_id_given integer,
--      user_id_received integer,
--      FOREIGN KEY (user_id_given) REFERENCES users(id),
--      FOREIGN KEY (user_id_received) REFERENCES users(id),
--      friendship_level INTEGER
--  );
--  CREATE TABLE vip_level(
--      id SERIAL PRIMARY KEY,
--      user_id integer,
--      FOREIGN KEY (user_id) REFERENCES users(id),
--      is_vip BOOLEAN
--  );
--  CREATE TABLE chatroom(
--      id SERIAL PRIMARY KEY,
--      user_id_left integer,
--      user_id_right integer,
--      FOREIGN KEY (user_id_left) REFERENCES users(id),
--      FOREIGN KEY (user_id_right) REFERENCES users(id),
--      time_started TIMESTAMP,
--      time_closed TIMESTAMP
--  );
--  CREATE TABLE message(
--      id SERIAL PRIMARY KEY,
--      chatroom_id integer,
--      sender integer,
--      receiver integer,
--      FOREIGN KEY (chatroom_id) REFERENCES chatroom(id),
--      FOREIGN KEY (sender) REFERENCES users(id),
--      FOREIGN KEY (receiver) REFERENCES users(id),
--      content text not NULL,
--      time_started TIMESTAMP,
--      time_closed TIMESTAMP
--  );
--  CREATE TABLE find_nearby(
--      id SERIAL PRIMARY KEY,
--      user_id_left integer,
--      user_id_right integer,
--      FOREIGN KEY (user_id_left) REFERENCES users(id),
--      FOREIGN KEY (user_id_right) REFERENCES users(id),
--      distance INTEGER
--  );
-- SELECT *
-- FROM user_photo;
-- SELECT *
-- FROM users;
-- SELECT *
-- FROM user_hobby;
-- SELECT *
-- FROM friendship_level;
-- CREATE DATABASE wspproject;
-- \ c wspproject;
-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     username varchar(255) NOT NUll UNIQUE,
--     password varchar(255) NOT NUll,
--     nick_name varchar(255),
--     email varchar(255),
--     gender varchar(255) NOT NUll,
--     interested_in_gender varchar(255) NOT NUll,
--     interested_in_type varchar(255),
--     height INTEGER,
--     date_of_birth DATE NOT NUll,
--     description TEXT,
--     created_at DATE,
--     updated_at DATE,
--     is_logged_in BOOLEAN,
--     number_of_like INTEGER,
--     nationality VARCHAR(255),
--     zodiac_signs VARCHAR(255)
-- );
-- CREATE TABLE user_photo (
--     id SERIAL PRIMARY KEY,
--     user_id integer,
--     FOREIGN KEY (user_id) REFERENCES users (id),
--     created_at DATE,
--     updated_at DATE,
--     active BOOLEAN,
--     file_name VARCHAR(255) NOT NULL
-- );
-- CREATE TABLE hobby(
--     id SERIAL PRIMARY KEY,
--     content varchar(255) not NULL
-- );
-- CREATE TABLE user_hobby(
--     id SERIAL PRIMARY KEY,
--     user_id integer,
--     hobby_id integer,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     FOREIGN KEY (hobby_id) REFERENCES hobby(id)
-- );
-- CREATE TABLE friendship_level(
--     id SERIAL PRIMARY KEY,
--     user_id_given integer,
--     user_id_received integer,
--     FOREIGN KEY (user_id_given) REFERENCES users(id),
--     FOREIGN KEY (user_id_received) REFERENCES users(id),
--     friendship_level INTEGER
-- );
-- CREATE TABLE vip_level(
--     id SERIAL PRIMARY KEY,
--     user_id integer,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     is_vip BOOLEAN
-- );
-- DROP TABLE IF EXISTS chatroom;
-- CREATE TABLE chatroom(
--     id SERIAL PRIMARY KEY,
--     name VARCHAR,
--     user_id_left integer,
--     user_id_right integer,
--     FOREIGN KEY (user_id_left) REFERENCES users(id),
--     FOREIGN KEY (user_id_right) REFERENCES users(id),
--     time_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
--     time_closed TIMESTAMP
-- );
-- DROP TABLE IF EXISTS messages;
-- CREATE TABLE message(
--     id SERIAL PRIMARY KEY,
--     chatroom_id integer,
--     sender integer,
--     receiver integer,
--     FOREIGN KEY (chatroom_id) REFERENCES chatroom(id),
--     FOREIGN KEY (sender) REFERENCES users(id),
--     FOREIGN KEY (receiver) REFERENCES users(id),
--     content text not NULL,
--     time_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
--     time_closed TIMESTAMP
-- );
-- CREATE TABLE find_nearby(
--     id SERIAL PRIMARY KEY,
--     user_id_left integer,
--     user_id_right integer,
--     FOREIGN KEY (user_id_left) REFERENCES users(id),
--     FOREIGN KEY (user_id_right) REFERENCES users(id),
--     distance INTEGER
-- );
--create user demo_admin with encrypted password 'demo_admin';
-- Testing 1 by Tommy:
-- INSERT INTO users (username,password,gender,interested_in_gender,date_of_birth,description) Values ('Tommy',1234,'M','F','2002-12-08','haha');
-- INSERT INTO user_photo (user_id, file_name) Values ('1','testing');
-- DELETE FROM user_photo;
-- DELETE FROM users;
-- Truncate table user_hobby;
-- Truncate table user_photo;
-- Truncate table users;
-- ALTER TABLE users AUTO_INCREMENT = 1;
-- drop table user_photo;