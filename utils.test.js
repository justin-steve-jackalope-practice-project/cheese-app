import {describe, expect, test} from "vitest";
import {obToStrCheese, cheesesToStr} from "./utils.js";

const cheese = {
    "name": "Cashel Blue",
    "type": "blue",
    "country_of_origin": "Ireland"
};

const cheeses = [
    cheese,
    {
        "name": "Taleggio",
        "type": "semi-soft",
        "country_of_origin": "Italy"
    }
];

const oneCheese = [
    cheese
];

const threeCheeses = [
    ...cheeses,
    {
        "name": "Manouri",
        "type": "soft",
        "country_of_origin": "Greece"
    }
];

const fourCheeses = [
    ...threeCheeses,
    {
        "name": "Queso Fresco",
        "type": "soft",
        "country_of_origin": "Mexico"
    }
];


// Tests

describe('obToStrCheese', () => {
    test('it should be a defined function', () => {
        expect(obToStrCheese).toBeDefined();
    });
    test('it should return a string', () => {
        expect(typeof obToStrCheese(cheese)).toBe('string');
    });
    test('it should include the name of the cheese', () => {
        expect(obToStrCheese(cheese).includes('Cashel Blue')).toBeTruthy();
    });
    test('it should include the country of origin', () => {
        expect(obToStrCheese(cheese).includes('Ireland')).toBeTruthy();
    });
    test('it should include the type', () => {
        expect(obToStrCheese(cheese).includes('blue')).toBeTruthy();
    });
    test('it should be the correct format', () => {
        expect(obToStrCheese(cheese)).toBe('Cashel Blue from Ireland (blue)');
    });
});

describe('cheesesToStr', () => {
    test('it should be a defined function', () => {
        expect(cheesesToStr).toBeDefined();
    });
    test('it should concatenate two cheeses when passed an array of two cheeses', () => {
        expect(cheesesToStr(cheeses)).toBe('Cashel Blue from Ireland (blue)\nTaleggio from Italy (semi-soft)');
    });
    test('it should return one cheese string formatted correctly', () => {
        expect(cheesesToStr(oneCheese)).toBe('Cashel Blue from Ireland (blue)');
    });
    test('it should concatenate three cheeses when passed an array of three cheeses', () => {
        expect(cheesesToStr(threeCheeses)).toBe('Cashel Blue from Ireland (blue)\nTaleggio from Italy (semi-soft)\nManouri from Greece (soft)');
    });
    test('it should still work when passed a zero length array of cheeses', () => {
        expect(cheesesToStr([])).toBe('');
    });
});

describe('filterCheesesByType', () => {
    test('it should be defined', () => {
        expect(threeCheeses.filterCheesesByType).toBeDefined();
    });
    test('it should return Manouri cheese object when filtering by "soft" type from three cheese array', () => {
        expect(threeCheeses.filterCheesesByType('soft')).toStrictEqual([{
            "name": "Manouri",
            "type": "soft",
            "country_of_origin": "Greece"
        }]);
    });
    test('it should return Manouri and Queso Fresco cheese objects when filtering by "soft" type from four cheese array', () => {
        expect(fourCheeses.filterCheesesByType('soft')).toStrictEqual([
            {
                "name": "Manouri",
                "type": "soft",
                "country_of_origin": "Greece"
            },
            {
                "name": "Queso Fresco",
                "type": "soft",
                "country_of_origin": "Mexico"
            }
        ]);
    });
});