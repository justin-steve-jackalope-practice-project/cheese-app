// NAME_OF_CHEESE_1 from COUNTRY_OF_ORIGIN_1 (TYPE_1)\n
export function obToStrCheese(cheese) {
    return `${cheese.name} from ${cheese.country_of_origin} (${cheese.type})`;
}

export function cheesesToStr(cheeses) {
    return cheeses.map(obToStrCheese).join('\n');
}

export function filterCheesesByType(type) {
    return this.filter(cheese => {
        return cheese.type === type;
    });
}

// validateSearchType
export function validateFilterType(type) {
    const validTypes = [
        'soft',
        'hard',
        'semi-hard',
        'blue'
    ];
    if (typeof type !== 'string') {
        return false;
    }
    return validTypes.includes(type.toLowerCase());
}

// validateFilterType

// searchCheeses(query, searchType)
export function searchCheeses(query, searchType) {
    if (searchType === 'country') {
        searchType = 'country_of_origin';
    }
    const cheeses = this;
    const outputCheeses = [];
    for (let cheese of cheeses) {
        if (cheese[searchType].toLowerCase().startsWith(query.toLowerCase())) {
            outputCheeses.push(cheese);
        }
    }
    return outputCheeses;
}

Array.prototype.filterCheesesByType = filterCheesesByType;
Array.prototype.searchCheeses = searchCheeses;

