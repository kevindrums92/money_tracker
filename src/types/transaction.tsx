import { Category } from "./category";

export type TransactionRecurrency = "none" | "everyDay" | "everyWorkingDay" | "everyWeek"
    | "every2Weeks" | "every3Weeks" | "everyMonth" | "every2Months" | "every3Months"
    | "every4Months" | "every6Months" | "everyYear";

export type Transaction = {
    Id?:number,
    Category: Category,
    Note?: string;
    Date: Date;
    Amount: number;
    Recurrency: TransactionRecurrency;
    Scheduled: boolean;
};