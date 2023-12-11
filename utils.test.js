import {describe, expect, test} from "vitest";
import {obToStrCheese, cheesesToStr, searchCheeses, validateFilterType} from "./utils.js";

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


const fiveCheeses = [...fourCheeses, {
    "name": "Cheddar",
    "type": "hard",
    "country_of_origin": "United Kingdom"
}];

const sixCheeses = [...fiveCheeses, {
    "name": "Parmesan",
    "type": "hard",
    "country_of_origin": "Italy"
}];


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

describe('searchCheeses', () => {
    test('it should be defined when called on fourCheeses', () => {
        expect(fourCheeses.searchCheeses).toBeDefined()
    });
    test('it should return an empty array when passed "hello" and "country" when called on fourCheeses', () => {
        expect(fourCheeses.searchCheeses('hello', 'country')).toStrictEqual([]);
    });
    test('it should return a fourCheeses array when passed "" and "name" when called on fourCheeses', () => {
        expect(fourCheeses.searchCheeses('', 'name')).toStrictEqual(fourCheeses);
    });
    test('it should return an array with the "Cashel Blue" cheese object when passed "Cachel Blue" and "name" when called on fourCheeses', () => {
        expect(fourCheeses.searchCheeses('Cashel Blue', 'name')).toStrictEqual([{
            "name": "Cashel Blue",
            "type": "blue",
            "country_of_origin": "Ireland"
        }]);
    });
    test('it should return an array with the "Taleggio" cheese object when passed "Taleggio" and "name" when called on fourCheeses', () => {
        expect(fourCheeses.searchCheeses('Taleggio', 'name')).toStrictEqual([{
            "name": "Taleggio",
            "type": "semi-soft",
            "country_of_origin": "Italy"
        }]);
    });
    test('it should return an array with the "Cashel Blue" and "Chedder" cheese objects when passed "c" and "name" when called on fiveCheeses', () => {
        expect(fiveCheeses.searchCheeses('c', 'name')).toStrictEqual([{
            "name": "Cashel Blue",
            "type": "blue",
            "country_of_origin": "Ireland"
        },
            {
                "name": "Cheddar",
                "type": "hard",
                "country_of_origin": "United Kingdom"
            }]);
    });
    test('it should return an array with the "Taleggio" and "Parmesan" cheese objects when passed "italy" and "country" when called on sixCheeses', () => {
        expect(sixCheeses.searchCheeses('italy', 'country')).toStrictEqual([{
            "name": "Taleggio",
            "type": "semi-soft",
            "country_of_origin": "Italy"
        },
            {
                "name": "Parmesan",
                "type": "hard",
                "country_of_origin": "Italy"
            }]);
    });
    test('it should return an array with the "Taleggio" and "Parmesan" cheese objects when passed "it" and "country" when called on sixCheeses', () => {
        expect(sixCheeses.searchCheeses('it', 'country')).toStrictEqual([{
            "name": "Taleggio",
            "type": "semi-soft",
            "country_of_origin": "Italy"
        },
            {
                "name": "Parmesan",
                "type": "hard",
                "country_of_origin": "Italy"
            }]);
    });
});

describe('validateFilterType', () => {
    test('it should be defined', () => {
        expect(validateFilterType).toBeDefined();
    });
    test('it should return false when passed a number', () => {
        expect(validateFilterType(7)).toBeFalsy();
        expect(validateFilterType(-7)).toBeFalsy();
        expect(validateFilterType(0)).toBeFalsy();
        expect(validateFilterType(1000.45)).toBeFalsy();
    });
    test('it should return true when passed the string any of the strings "soft", "hard", "semi-hard", "blue", regardless of case and false otherwise', () => {
        expect(validateFilterType('soft')).toBeTruthy();
        expect(validateFilterType('SofT')).toBeTruthy();
        expect(validateFilterType('SOFT')).toBeTruthy();
        expect(validateFilterType('HARD')).toBeTruthy();
        expect(validateFilterType('semi-HARD')).toBeTruthy();
        expect(validateFilterType('BlUe')).toBeTruthy();
        expect(validateFilterType('sotf')).toBeFalsy();
        expect(validateFilterType('')).toBeFalsy();
        expect(validateFilterType('123')).toBeFalsy();
    });
});

