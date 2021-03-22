import { BudgetPeriodicity } from "../types/Settings";

export const getPeriodicities: [string, BudgetPeriodicity][] = [
    ["Mensual", "monthly"],
    ["Semanal", "weekly"],
    ["Anual", "yearly"],
];

export const getStartdayMonth: [string, number][] = [
    ["Primer día del mes", 1],
    ["Segundo día del mes", 2],
    ["Tercer día del mes", 3],
    ["4° día del mes", 4],
    ["5° día del mes", 5],
    ["6° día del mes", 6],
    ["7° día del mes", 7],
    ["8° día del mes", 8],
    ["9° día del mes", 9],
    ["10° día del mes", 10],
    ["11° día del mes", 11],
    ["12° día del mes", 12],
    ["13° día del mes", 13],
    ["14° día del mes", 14],
    ["14° día del mes", 15],
    ["15° día del mes", 16],
    ["17° día del mes", 17],
    ["18° día del mes", 18],
    ["19° día del mes", 19],
    ["20° día del mes", 20],
    ["21° día del mes", 21],
    ["22° día del mes", 22],
    ["23° día del mes", 23],
    ["24° día del mes", 24],
    ["25° día del mes", 25],
    ["26° día del mes", 26],
    ["27° día del mes", 27],
    ["28° día del mes", 28],
    ["29° día del mes", 29],
    ["30° día del mes", 30],
];

export const getStartdayWeek: [string, number][] = [
    ["Lunes", 1],
    ["Martes", 2],
    ["Miercoles", 3],
    ["Jueves", 4],
    ["Viernes", 5],
    ["Sábado", 6],
    ["Domingo", 7],
];

const getArrayStartdayYear = () => {
    let options = [];
    for (let index = 1; index <= 365; index++) {
        options.push([index.toString(), index]);
    }
    return options;
};
export const getStartdayYear: any = getArrayStartdayYear();