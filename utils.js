// NAME_OF_CHEESE_1 from COUNTRY_OF_ORIGIN_1 (TYPE_1)\n


export function obToStrCheese(cheese) {
    return `${cheese.name} from ${cheese.country_of_origin} (${cheese.type})`;
}

export function cheesesToStr(cheeses) {
    return cheeses.map(obToStrCheese).join('\n');
}

Array.prototype.filterCheesesByType = filterCheesesByType;

export function filterCheesesByType(type) {
    return this.filter(cheese => {
        return cheese.type === type;
    });
}