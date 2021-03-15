import { Moment } from "moment";
import { Transaction, TransactionRecurrency } from "../types/transaction";
import { buildNextValidDate } from "./date";

export const getTransactionListIncome = (transactions: Transaction[]) =>{
    return transactions.filter((i: Transaction) => i.Category.Type === 'income' && !i.Scheduled)
    .reduce((sum: number, current: Transaction) => sum + current.Amount, 0);
}

export const getTransactionListExpenses = (transactions: Transaction[]) =>{
    return transactions.filter((i: Transaction) => i.Category.Type === 'expenses' && !i.Scheduled)
    .reduce((sum: number, current: Transaction) => sum + current.Amount, 0);
}

export const getRecurrencyTypes:[string, TransactionRecurrency][] = [
    ["Nunca repetir", "none"],
    ["Todos los días", "everyDay"],
    ["Todos los días hábiles", "everyWorkingDay"],
    ["Semanal", "everyWeek"],
    ["Cada 2 semanas", "every2Weeks"],
    ["Cada 3 semanas", "every3Weeks"],
    ["Cada mes", "everyMonth"],
    ["Cada 2 meses", "every2Months"],
    ["Cada 3 meses", "every3Months"],
    ["Cada 4 meses", "every4Months"],
    ["Cada 6 meses", "every6Months"],
    ["Cada año", "everyYear"],
];

export const getNewDateTransactionRecurrency = (recurrency: TransactionRecurrency, transactionDate: Moment):Date =>{
    switch (recurrency) {
        case "everyDay":
            return transactionDate.add(1, 'd').toDate();
            
        case "everyWorkingDay":
            return buildNextValidDate(transactionDate.toDate());
            
        case "everyWeek":
            return transactionDate.add(1, 'w').toDate();
            
        case "every2Weeks":
            return transactionDate.add(2, 'w').toDate();
            
        case "every3Weeks":
            return transactionDate.add(3, 'w').toDate();
            
        case "everyMonth":
            return transactionDate.add(1, 'month').toDate();
            
        case "every2Months":
            return transactionDate.add(2, 'month').toDate();
            
        case "every3Months":
            return transactionDate.add(3, 'month').toDate();
            
        case "every4Months":
            return transactionDate.add(4, 'month').toDate();
            
        case "every6Months":
            return transactionDate.add(6, 'month').toDate();
            
        case "everyYear":
            return transactionDate.add(1, 'year').toDate();
            
        default:
            return transactionDate.toDate();
            
    }
}