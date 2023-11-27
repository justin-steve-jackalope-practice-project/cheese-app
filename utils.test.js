import {describe, expect, test} from "vitest";
import {obToStrCheese} from "./utils.js";

const cheese = {
    "name": "Cashel Blue",
    "type": "blue",
    "country_of_origin": "Ireland"
};


describe('obToStrCheese', () => {
    test('it should work', () => {
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