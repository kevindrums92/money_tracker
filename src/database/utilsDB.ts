export const DB_NAME = 'money_maker_v5';
export const TABLE_TRANSACTIONS = 'Self_________Transactions';
export const TABLE_BUDGET = 'Budget';

export const sqlCreateTableTransactions = `CREATE TABLE IF NOT EXISTS ${TABLE_TRANSACTIONS} (
    Id INTEGER NOT NULL PRIMARY KEY,
    CategoryName VARCHAR,
    CategoryIcon VARCHAR,
    CategoryColor VARCHAR,
    CategoryGroup VARCHAR,
    CategoryType VARCHAR,
    Date INTEGER, Amount INTEGER,
    Note VARCHAR,
    Recurrency VARCHAR,
    Scheduled INT,
    ShouldNotify INT
)`;

export const sqlBudget = `CREATE TABLE IF NOT EXISTS ${TABLE_BUDGET} (
    Id INTEGER NOT NULL PRIMARY KEY,
    Name VARCHAR,
    Icon VARCHAR,
    Periodicity VARCHAR,
    Startdat INT,
)`;