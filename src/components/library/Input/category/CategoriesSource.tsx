import { Category, CategoryGrouped } from "../../../../types/category";

export function getCategories(): CategoryGrouped[] {
    return [getEntertainment(), getFoodAndDrinks(),getHousing(), getLifeStyle(), getTransportation(), getIncomes()];
};

const getEntertainment = (): CategoryGrouped => {
    const categories: Category[] = [];

    categories.push({ Name: "Bolos", Icon: "bowling-ball", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Cine", Icon: "film", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Concierto", Icon: "music", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Electronico", Icon: "bolt", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Entretenimiento", Icon: "smile", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Gimnasio", Icon: "dumbbell", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Hobby", Icon: "box", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Club Nocturno", Icon: "kaaba", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Deportes", Icon: "futbol", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Subscripciones", Icon: "apple-pay", Color: "orange", Group: "entertainment", Type: "expenses", });
    categories.push({ Name: "Vacaciones", Icon: "plane-departure", Color: "orange", Group: "entertainment", Type: "expenses", });

    return {
        Name: "entertainment",
        Categories: categories
    };
}

const getFoodAndDrinks = (): CategoryGrouped => {
    const categories: Category[] = [];

    categories.push({ Name: "Dulces", Icon: "candy-cane", Color: "palevioletred", Group: "food & drinks", Type: "expenses", });
    categories.push({ Name: "Café", Icon: "coffee", Color: "palevioletred", Group: "food & drinks", Type: "expenses", });
    categories.push({ Name: "Bebidas", Icon: "cocktail", Color: "palevioletred", Group: "food & drinks", Type: "expenses", });
    categories.push({ Name: "Comida", Icon: "hamburger", Color: "palevioletred", Group: "food & drinks", Type: "expenses", });
    categories.push({ Name: "Mercado", Icon: "shopping-cart", Color: "palevioletred", Group: "food & drinks", Type: "expenses", });
    categories.push({ Name: "Restaurante", Icon: "utensils", Color: "palevioletred", Group: "food & drinks", Type: "expenses", });
    
    return {
        Name: "food & drinks",
        Categories: categories
    };
}

const getHousing = (): CategoryGrouped => {
    const categories: Category[] = [];

    categories.push({ Name: "Electricidad", Icon: "plug", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Alojamiento", Icon: "home", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Seguro", Icon: "house-damage", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Internet", Icon: "wifi", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Prestamos", Icon: "landmark", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Mantenimiento", Icon: "tools", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Renta", Icon: "bed", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Televisión", Icon: "tv", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Telefono", Icon: "mobile-alt", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Agua", Icon: "faucet", Color: "seagreen", Group: "housing", Type: "expenses", });
    categories.push({ Name: "Servicios", Icon: "servicestack", Color: "seagreen", Group: "housing", Type: "expenses", });

    return {
        Name: "housing",
        Categories: categories
    };
}

const getLifeStyle = (): CategoryGrouped => {
    const categories: Category[] = [];

    categories.push({ Name: "Cuidado de los niños", Icon: "child", Color: "saddlebrown", Group: "lifestyle", Type: "expenses", });
    categories.push({ Name: "Dentista", Icon: "tooth", Color: "saddlebrown", Group: "lifestyle", Type: "expenses", });
    categories.push({ Name: "Médico", Icon: "user-nurse", Color: "saddlebrown", Group: "lifestyle", Type: "expenses", });
    categories.push({ Name: "Regalo", Icon: "gift", Color: "saddlebrown", Group: "lifestyle", Type: "expenses", });
    categories.push({ Name: "Hotel", Icon: "hotel", Color: "saddlebrown", Group: "lifestyle", Type: "expenses", });
    categories.push({ Name: "Estilo de vida", Icon: "heart", Color: "saddlebrown", Group: "lifestyle", Type: "expenses", });
    categories.push({ Name: "Mascotas", Icon: "paw", Color: "saddlebrown", Group: "lifestyle", Type: "expenses", });
    categories.push({ Name: "Farmacia", Icon: "band-aid", Color: "saddlebrown", Group: "lifestyle", Type: "expenses", });

    return {
        Name: "lifestyle",
        Categories: categories
    };
}

const getTransportation = (): CategoryGrouped => {
    const categories: Category[] = [];

    categories.push({ Name: "Car insurance", Icon: "car-crash", Color: "tomato", Group: "transportation", Type: "expenses", });
    categories.push({ Name: "Car Loan", Icon: "car", Color: "tomato", Group: "transportation", Type: "expenses", });
    categories.push({ Name: "Flight", Icon: "plane", Color: "tomato", Group: "transportation", Type: "expenses", });
    categories.push({ Name: "Gas", Icon: "gas-pump", Color: "tomato", Group: "transportation", Type: "expenses", });
    categories.push({ Name: "Parking", Icon: "parking", Color: "tomato", Group: "transportation", Type: "expenses", });
    categories.push({ Name: "Public transport", Icon: "bus", Color: "tomato", Group: "transportation", Type: "expenses", });
    categories.push({ Name: "Repair", Icon: "tools", Color: "tomato", Group: "transportation", Type: "expenses", });
    categories.push({ Name: "Taxi", Icon: "taxi", Color: "tomato", Group: "transportation", Type: "expenses", });
    categories.push({ Name: "Transportation", Icon: "shuttle-van", Color: "tomato", Group: "transportation", Type: "expenses", });
    
    return {
        Name: "transportation",
        Categories: categories
    };
}

const getIncomes = (): CategoryGrouped => {
    const categories: Category[] = [];

    categories.push({ Name: "Salary", Icon: "dollar-sign", Color: "seagreen", Group: "income", Type: "income", });
    categories.push({ Name: "Other", Icon: "search-dollar", Color: "seagreen", Group: "income", Type: "income", });
   
    return {
        Name: "income",
        Categories: categories
    };
}

//template
// const getFoodAndDrinks = (): CategoryGrouped => {
//     const categories: Category[] = [];

//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });
//     categories.push({ Name: "", Icon: "", Color: "", Group: "", Type: "expenses", });

//     return {
//         Name: "food & drinks",
//         Categories: categories
//     };
// }