import { Category } from "./category";

export type Transaction = {
    Category: Category,
    Note?: string;
    Date: Date;
    Amount: number;
};

export const dummyData = [
    {
        Category: { Name: 'loan', Icon: 'money', Color: 'orange', Group: 'housing', Type: 'expenses' },
        Date: new Date("2021/03/03"),
        Amount: 1100000
    }, {
        Category: { Name: 'pharmacy', Icon: 'local-pharmacy', Color: 'palevioletred', Group: 'lifestyle', Type: 'expenses' },
        Date: new Date("2021/03/02"),
        Note: "Gastos médicos Jacobo",
        Amount: 78500
    }, {
        Category: { Name: 'doctor', Icon: 'medical-services', Color: 'palevioletred', Group: 'lifestyle', Type: 'expenses' },
        Date: new Date("2021/03/04"),
        Note: "Factura Cesarea Jacobo",
        Amount: 40000
    }, {
        Category: { Name: 'loan', Icon: 'money', Color: 'orange', Group: 'housing', Type: 'expenses' },
        Date: new Date("2021/03/03"),
        Amount: 630000,
        Note: 'Cuota Apto Caña brava'
    }, {
        Category: { Name: 'loan', Icon: 'money', Color: 'orange', Group: 'housing', Type: 'expenses' },
        Date: new Date("2021/03/03"),
        Amount: 100000,
        Note: 'Cuota iPhone'
    }, {
        Category: { Name: 'gas', Icon: 'local-gas-station', Color: 'royalblue', Group: 'transportation', Type: 'expenses' },
        Date: new Date("2021/03/01"),
        Amount: 50000,
        Note: '50k gasolina'
    }, {
        Category: { Name: 'gas', Icon: 'local-gas-station', Color: 'royalblue', Group: 'transportation', Type: 'expenses' },
        Date: new Date("2021/03/01"),
        Amount: 50000,
        Note: '50k gasolina'
    }, {
        Category: { Name: 'gas', Icon: 'local-gas-station', Color: 'royalblue', Group: 'transportation', Type: 'expenses' },
        Date: new Date("2021/03/04"),
        Amount: 50000,
        Note: '50k gasolina'
    }, {
        Category: { Name: 'gas', Icon: 'local-gas-station', Color: 'royalblue', Group: 'transportation', Type: 'expenses' },
        Date: new Date("2021/03/05"),
        Amount: 50000,
        Note: '50k gasolina'
    }, {
        Category: { Name: 'salary', Icon: 'attach-money', Color: 'yellowgreen', Group: 'income', Type: 'income' },
        Date: new Date("2021/03/01"),
        Note: "Pago de nómina",
        Amount: 6200000
    }, {
        Category: { Name: 'market', Icon: 'local-grocery-store', Color: 'tomato', Group: 'food & drinks', Type: 'expenses' },
        Date: new Date("2021/03/06"),
        Note: "Compras en Olimpica",
        Amount: 98000
    },

];