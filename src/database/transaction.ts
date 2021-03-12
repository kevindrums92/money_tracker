// import { SQLTransaction, SQLResultSet } from "expo-sqlite";
// import { Transaction } from "../types/transaction";
// import { db, errorCallback } from "./connector";

// export const saveTransaction = (item: Transaction):Promise<Transaction> => {
//   return new Promise((resolve, reject) => {
//     const successCallback = (transaction: SQLTransaction, resultSet: SQLResultSet) => {
//       return Promise.resolve(item);
//     };
//     db.transaction((tx) => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS Transaction (TransactionId INTEGER PRIMARY KEY AUTOINCREMENT, Category VARCHAR, Date VARCHAR, Amount VARCHAR)'
//         , undefined, successCallback, errorCallback
//       );
//     });
//   });
// }