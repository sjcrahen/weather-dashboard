CREATE TABLE users
(
    ID       serial primary key,
    USERNAME varchar(50) unique not null,
    PASSWORD varchar(100)       not null,
    ROLE     varchar(20)        not null
);
INSERT INTO users (username, password, role)
VALUES ('admin', '$2a$12$zls8fZZud5SfJon4ajLIC.jp8yPqhCE1b45w9zcT2asgiiv7ZHo56', 'ROLE_ADMIN'),
       ('user', '$2a$12$zls8fZZud5SfJon4ajLIC.jp8yPqhCE1b45w9zcT2asgiiv7ZHo56', 'ROLE_USER');