import { SQLTransaction, SQLError } from "expo-sqlite";
import { Budget, Settings } from "../types/Settings";
import { db } from "./connector";
import { TABLE_BUDGET, TABLE_SETTINGS } from "./utilsDB";

export const getSettingsDB = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, { rows }: any) => {
            resolve(rows._array.length > 0 ? rows._array[0] : null);

        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }

        const sql = `
            SELECT A.*, B.Name, B.Icon, B.Periodicity, B.Startday

            FROM ${TABLE_SETTINGS} A
            LEFT JOIN ${TABLE_BUDGET} B ON A.SelectedBudget = B.Id
            
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

export const getBudgetsDB = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, { rows }: any) => {
            resolve(rows._array);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }

        const sql = `
            SELECT *
            FROM ${TABLE_BUDGET}
            
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

export const insertBudgetDB = (item: Budget): Promise<number> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, { insertId }: any) => {
            resolve(insertId);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }

        const sql = `
            INSERT INTO ${TABLE_BUDGET}
            (Name, Periodicity, Startday) VALUES (
                "${item.Name}",
                "${item.Periodicity}",
                ${item.Startday}
            )
            
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

export const insertSettingsDB = (item: Settings): Promise<number> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, { insertId }: any) => {
            resolve(insertId);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }

        const sql = `
            INSERT INTO ${TABLE_SETTINGS}
            (DailyNotifications, ScheduledTransactionsNotifications, SelectedBudget, WelcomeComplete) VALUES (
                ${item.DailyNotifications === true ? 1 : 0},
                ${item.ScheduledTransactionsNotifications === true ? 1 : 0},
                ${item.SelectedBudget},
                1
            )
            
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

export const updateSettingsDB = (DailyNotifications: boolean, ScheduledTransactionsNotifications: boolean, Id:number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, result: any) => {
            resolve(true);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }

        const sql = `
            UPDATE ${TABLE_SETTINGS}
            SET DailyNotifications = ${DailyNotifications === true ? 1 : 0},
            ScheduledTransactionsNotifications = ${ScheduledTransactionsNotifications === true ? 1 : 0}
            WHERE Id = ${Id}
        `;
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}

export const updateBudgetDB = (item: Budget): Promise<number> => {
    return new Promise((resolve, reject) => {
        const successCallback = (transaction: SQLTransaction, { insertId }: any) => {
            resolve(insertId);
        };
        const errorCallback = (transaction: SQLTransaction, error: SQLError) => {
            reject(error);
            return true;
        }
        
        const sql = `
            UPDATE ${TABLE_BUDGET}
            SET Name = "${item.Name}", 
            Periodicity = "${item.Periodicity}",
            Startday = ${item.Startday}
            WHERE Id = ${item.Id}
            
        `;
        
        db.transaction((tx) => {
            tx.executeSql(
                sql, undefined, successCallback, errorCallback
            );
        });
    });
}