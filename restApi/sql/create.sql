DROP DATABASE IF EXISTS stackreport;
CREATE DATABASE stackreport;

\c stackreport;

CREATE SEQUENCE user_id_seq START 1;

CREATE TABLE USERS(
	user_id INTEGER PRIMARY KEY DEFAULT nextval('user_id_seq') NOT NULL,
	username VARCHAR(24) UNIQUE NOT NULL,
	password VARCHAR(70) NOT NULL,
	role VARCHAR(16) DEFAULT 'USER'
);
