import { Transaction } from "../types/transaction";

export const getTransactionListIncome = (transactions: Transaction[]) =>{
    return transactions.filter((i: Transaction) => i.Category.Type === 'income')
    .reduce((sum: number, current: Transaction) => sum + current.Amount, 0);
}

export const getTransactionListExpenses = (transactions: Transaction[]) =>{
    return transactions.filter((i: Transaction) => i.Category.Type === 'expenses')
    .reduce((sum: number, current: Transaction) => sum + current.Amount, 0);
}