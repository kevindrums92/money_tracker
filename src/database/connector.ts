import * as SQLite from 'expo-sqlite';
import { SQLError, SQLResultSet, SQLTransaction } from 'expo-sqlite';
import { TABLE_TRANSACTIONS } from './types';
const version = "1.0"

const callbackConnection = (db: SQLite.WebSQLDatabase) => {
};

export const db = SQLite.openDatabase('money_maker_v5', version, undefined, undefined, callbackConnection);

export const initDB = () => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, resultSet: SQLResultSet) => {
            resolve(true);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }
        const sql = `
            CREATE TABLE IF NOT EXISTS ${TABLE_TRANSACTIONS} (
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
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

