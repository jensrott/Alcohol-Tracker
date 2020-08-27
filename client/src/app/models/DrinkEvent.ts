// Drinking Events
export class DrinkEvent {
    numberOfDrink: number;
    alcoholLevel: number;
    volumePerDrink: number;
    timeSinceFirstDrink: number;
    gender: string;
    bodyWeight: number;

    bloodAlcoholConcentration: number;
    timeToBeSober: number;

    timestamp: Date = new Date();

}