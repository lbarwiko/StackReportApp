DROP DATABASE IF EXISTS predictions;
CREATE DATABASE predictions;

\connect predictions;

CREATE TABLE company(
    c_symbol VARCHAR(10) NOT NULL,
    c_name VARCHAR(500) NOT NULL,
    PRIMARY KEY(c_symbol)
);

CREATE TABLE mutual_fund(
    m_symbol VARCHAR(10) NOT NULL,
    m_name VARCHAR(500) NOT NULL,
    PRIMARY KEY(m_symbol)
);

CREATE TABLE holdings(
    c_symbol VARCHAR(10) NOT NULL,
    m_symbol VARCHAR(10) NOT NULL,
    shares INT NOT NULL,
    h_date DATE NOT NULL,
    PRIMARY KEY(c_symbol, m_symbol, h_date),
    FOREIGN KEY(c_symbol) REFERENCES company(c_symbol) ON DELETE CASCADE,
    FOREIGN KEY(m_symbol) REFERENCES mutual_fund(m_symbol) ON DELETE CASCADE
);

CREATE TABLE stock_history(
    c_symbol VARCHAR(10) NOT NULL,
    price REAL NOT NULL,
    s_date DATE NOT NULL,
    PRIMARY KEY(c_symbol, s_date),
    FOREIGN KEY(c_symbol) REFERENCES company(c_symbol)
);

CREATE TABLE mutual_fund_history(
    m_symbol VARCHAR(10) NOT NULL,
    m_date DATE NOT NULL,
    price REAL NOT NULL,
    PRIMARY KEY(m_symbol, m_date),
    FOREIGN KEY(m_symbol) REFERENCES mutual_fund(m_symbol)
);

CREATE TABLE mutual_fund_other(
    m_symbol VARCHAR(10) NOT NULL,
    m_date DATE NOT NULL,
    total_investment BIGINT,
    total_net_assets BIGINT,
    shares INT,
    PRIMARY KEY(m_symbol, m_date),
    FOREIGN KEY(m_symbol) REFERENCES mutual_fund(m_symbol)
);
