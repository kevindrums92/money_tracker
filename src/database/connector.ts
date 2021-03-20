import * as SQLite from 'expo-sqlite';
import { SQLError, SQLResultSet, SQLTransaction } from 'expo-sqlite';
import { DB_NAME, sqlCreateTableTransactions, TABLE_TRANSACTIONS } from './utilsDB';
const version = "1.0"

const callbackConnection = (db: SQLite.WebSQLDatabase) => {
};

export const db = SQLite.openDatabase(DB_NAME, version, undefined, undefined, callbackConnection);

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
            ${sqlCreateTableTransactions}

        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

