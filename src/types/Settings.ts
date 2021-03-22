export type BudgetPeriodicity = "monthly" | "weekly" | "yearly";

export interface Budget {
    Id?: number;
    Name: string;
    Icon: string,
    Periodicity: BudgetPeriodicity,
    Startday: number
};


export interface Settings {
    Id?: number;
    Currency: string;
    DailyNotifications: boolean,
    ScheduledTransactionsNotifications: boolean,
    SelectedBudget: number,
    WelcomeComplete: boolean,
    BudgetObj?: Budget
};

