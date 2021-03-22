export const DB_NAME = 'money_maker_v14';
export const TABLE_TRANSACTIONS = 'SelfTransactions';
export const TABLE_BUDGET = 'SelfBudget';
export const TABLE_SETTINGS = 'SelfSettings';

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
)
`;

export const sqlBudget = `CREATE TABLE IF NOT EXISTS ${TABLE_BUDGET} (
    Id INTEGER NOT NULL PRIMARY KEY,
    Name VARCHAR,
    Icon VARCHAR,
    Periodicity VARCHAR,
    Startday INT
)
`;

export const sqlSettings = `CREATE TABLE IF NOT EXISTS ${TABLE_SETTINGS} (
    Id INTEGER NOT NULL PRIMARY KEY,
    Currency VARCHAR,
    DailyNotifications INT,
    ScheduledTransactionsNotifications INT,
    SelectedBudget INT,
    WelcomeComplete INT
)
`;