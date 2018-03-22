\c stackreport

INSERT INTO USERS(username, password)
VALUES
('user1', '$2a$10$NV883tbS6LxDj3mLcRciQeRO8F4rZyWb.f27pKVx8G9dSMRKVLPzq'),
('user2', '$2a$10$NV883tbS6LxDj3mLcRciQeRO8F4rZyWb.f27pKVx8G9dSMRKVLPzq'),
('user3', '$2a$10$NV883tbS6LxDj3mLcRciQeRO8F4rZyWb.f27pKVx8G9dSMRKVLPzq'),
('user4', '$2a$10$NV883tbS6LxDj3mLcRciQeRO8F4rZyWb.f27pKVx8G9dSMRKVLPzq'),
('user5', '$2a$10$NV883tbS6LxDj3mLcRciQeRO8F4rZyWb.f27pKVx8G9dSMRKVLPzq'),
('user6', '$2a$10$NV883tbS6LxDj3mLcRciQeRO8F4rZyWb.f27pKVx8G9dSMRKVLPzq');

INSERT INTO FUND(fund_id, fund_name)
VALUES
('jensx', 'Jensen Quality Growth Fund Class J');

INSERT INTO HOLDING(fund_id, security_id, num_shares)
VALUES
('jensx', 'UTX', '2609000'),
('jensx', 'UPS', '1326000'),
('jensx', 'KO', '2344000'),
('jensx', 'PEP', '3163000'),
('jensx', 'ECL', '2080000'),
('jensx', 'PX', '2069000'),
('jensx', 'EMR', '2187000'),
('jensx', 'APH', '1892000'),
('jensx', 'BDX', '1834000'),
('jensx', 'SYK', '2004000'),
('jensx', 'UNH', '1403000'),
('jensx', 'PG', '2434000'),
('jensx', 'MMM', '1154600'),
('jensx', 'GOOGL', '191000'),
('jensx', 'ACN', '1638000'),
('jensx', 'BR', '872000'),
('jensx', 'CTSH', '2355000'),
('jensx', 'MA', '1287000'),
('jensx', 'WAT', '813987'),
('jensx', 'OMC', '3253000'),
('jensx', 'JNJ', '2078000'),
('jensx', 'INTU', '885000'),
('jensx', 'MSFT', '4453000'),
('jensx', 'ORCL', '6095000'),
('jensx', 'TJX', '2712000'),
('jensx', 'AAPL', '1087000'),
('jensx', 'NKE', '3135000');
