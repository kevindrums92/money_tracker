import { SQLTransaction, SQLResultSet, SQLError } from "expo-sqlite";
import { Transaction } from "../types/transaction";
import { db } from "./connector";
import { TABLE_TRANSACTIONS } from "./types";

export const insertTransactionDB = (item: Transaction): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, resultSet: SQLResultSet) => {
            resolve(true);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }
        
        const sql = `
            INSERT INTO ${TABLE_TRANSACTIONS} 
            (
                CategoryName, CategoryIcon, CategoryColor, 
                CategoryGroup, CategoryType, Date, Amount, Note, Recurrency, Scheduled
            ) values (
                "${item.Category.Name}",
                "${item.Category.Icon}",
                "${item.Category.Color}",
                "${item.Category.Group}",
                "${item.Category.Type}",
                ${item.Date.getTime()},
                ${item.Amount},
                "${(item.Note) ? item.Note : ""}",
                "${item.Recurrency}",
                ${item.Scheduled ? 1 : 0}
            )
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

export const setScheduledFalseTransactionDB = (item: Transaction): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, resultSet: SQLResultSet) => {
            resolve(true);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }
        const sql = `
            UPDATE ${TABLE_TRANSACTIONS} 
                SET Scheduled = 0
                WHERE Id = ${item.Id}
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

export const getListTransactions = (startDate: Date, endDate: Date): Promise<Array<any>> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, { rows }: any) => {
            resolve(rows._array);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }
        const sql = `
            SELECT 
            Mov.*
            FROM ${TABLE_TRANSACTIONS} as Mov
            WHERE Date BETWEEN ${startDate.getTime()} AND ${endDate.getTime()}
            ORDER BY Date DESC;
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}