export class Recipe {
    id = 0;
    name = '';
    amountOfTimesMade = 0;
    ingredients: Ingredients[];
    directions: Directions[];
    mealType = mealType;
}

export class Ingredients {
    amount = 0;
    unit = '';
    name = '';
}

export class Directions {
    step = 0;
    instructions = '';
}

export const mealType = [
    { "id": 1, "itemName": "Breakfast" },
    { "id": 2, "itemName": "Lunch" },
    { "id": 3, "itemName": "Dinner" }
]

export const seasons = ['Winter', 'Fall', 'Spring', 'Summer', 'N/A']