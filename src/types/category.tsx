export type Type = "income" | "expenses" | "savings";
type Group = "lifestyle" | "housing" | "entertainment" | "food & drinks" | "savings" | "transportation" | "income";
type Color = "orange" | "palevioletred" | "royalblue" | "saddlebrown" | "seagreen" | "tomato" | "sienna" | "yellowgreen";

export type Category = {
    Name: string;
    Icon: any;
    Color: Color;
    Group: Group;
    Type: Type
};

export type CategoryGrouped = {
    Name: Group;
    Categories: Category[]
};