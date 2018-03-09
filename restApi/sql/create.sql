DROP DATABASE IF EXISTS stackreport;
CREATE DATABASE stackreport;

\c stackreport;


CREATE TABLE USERS(
	user_id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(24) UNIQUE NOT NULL,
	password VARCHAR(70) NOT NULL,
	role VARCHAR(16) DEFAULT 'USER',
	tier VARCHAR(16) DEFAULT 'FREE'
);

CREATE TABLE FUND(
	fund_id VARCHAR(16) UNIQUE NOT NULL PRIMARY KEY,
	fund_name VARCHAR(64)
);

CREATE TABLE FOLLOW(
	fund_id VARCHAR(16) REFERENCES FUND(fund_id),
	user_id SERIAL REFERENCES USERS(user_id),
	createdAt timestamp DEFAULT current_timestamp,
	PRIMARY KEY(fund_id, user_id)
);

CREATE TABLE PREDICTION_META(
	prediction_meta_id SERIAL PRIMARY KEY,
	date_predicted DATE DEFAULT CURRENT_DATE,
	fund_id VARCHAR(16) REFERENCES FUND(fund_id) NOT NULL
);

CREATE TABLE PREDICTION(
	prediction_meta_id SERIAL REFERENCES PREDICTION_META(prediction_meta_id) NOT NULL,
  security_id VARCHAR(16) NOT NULL
);
CREATE INDEX ON PREDICTION USING HASH (prediction_meta_id);

ALTER TABLE USERS ADD CONSTRAINT allowed_roles
  CHECK (role IN (
    'ADMIN',
    'USER'
));

ALTER TABLE USERS ADD CONSTRAINT allowed_tier
  CHECK (tier IN (
    'FREE'
));

-- Create a view that doesn't expose any sensitive information about user.
CREATE VIEW PUBLIC_USERS AS
	SELECT username, user_id, role
	FROM USERS;
