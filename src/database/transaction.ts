import { SQLTransaction, SQLResultSet, SQLError } from "expo-sqlite";
import { Transaction } from "../types/transaction";
import { db } from "./connector";
import { TABLE_TRANSACTIONS } from "./types";

export const insertTransaction = (item: Transaction) => {
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
                CategoryGroup, CategoryType, Date, Amount, Note
            ) values (
                "${item.Category.Name}",
                "${item.Category.Icon}",
                "${item.Category.Color}",
                "${item.Category.Group}",
                "${item.Category.Type}",
                ${item.Date.getTime()},
                ${item.Amount},
                "${(item.Note) ? item.Note : ""}"
            )
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

export const getListTransactions = (): Promise<Array<any>> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, { rows }: any) => {
            console.log(rows._array);
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
            ORDER BY Date DESC;
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}