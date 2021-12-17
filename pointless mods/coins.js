for (const key in items) {
    if (key.match(/Bar/) !== null && key.match(/Bar/).index + 3 === key.length) {
        console.log(key);
        const foo = key.slice(0, key.match(/Bar/).index);
        eval(`addItems({${foo}Coin: {name: capitalize(camelCaseToRegular("${foo}Coin"))}})`);
        eval(`addRecipes([{ingredients: [{id: key, count: 1}], output: {id: "${foo}Coin", count: 25}}]);`);
    }
}