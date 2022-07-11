function addBlocks(json) {
    for (let i = 0; i < json.length; i++) if (json[i].types === undefined) json[i].types = [];
    ores = ores.concat(json);
    addItemsToOres();
}

function addItems(json) {
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i++) {
        items[keys[i]] = json[keys[i]];
    }
}

function addRecipes(json) {
    recipes = recipes.concat(json);
    itemsUpdate();
}

function addMaterial({id, power, size, hasOre, hasBar, hasBlock, low, high, oreColor, blockColor}) {
    const hardness = power / 10;
    const recipeCost = Math.round(power / 16);
    if (low === undefined) {
        low = -20000000;
    }
    if (high === undefined) {
        high = Math.round(-(1.25 ** power));
    }
    eval(`addItems({${id}: {name: capitalize(camelCaseToRegular(id)), size: size, types: []}});`);
    eval(`addItems({
        ${id}Pickaxe: {
            name: capitalize(camelCaseToRegular(id + "Pickaxe")),
            strength: hardness < 10 ? hardness + 1 : 10,
            types: ["pickaxe"]
        }
    });`);
    eval(`addItems({${id}Axe: {name: capitalize(camelCaseToRegular(id + "Axe")), types: ["axe"]}});`);
    if (hasOre) {
        addBlocks([
            {
                id: id,
                commonness: 100 - power,
                hardness: hardness,
                minY: low,
                maxY: high,
                color: oreColor
            }
        ]);
    }
    if (hasBlock) {
        addBlocks([
            {
                id: `${id}Block`,
                hardness: hardness,
                color: blockColor
            }
        ]);
        eval(`addItems({
            ${id}Block: {
                name: capitalize(camelCaseToRegular(id)) + " Block",
                size: size * 4,
                types: ["block"]
            }
        });`);
        addRecipes([
            {
                ingredients: [
                    {
                        id: id,
                        count: 4
                    }
                ],
                output: {
                    id: `${id}Block`,
                    count: 1
                }
            },
            {
                ingredients: [
                    {
                        id: `${id}Block`,
                        count: 1
                    }
                ],
                output: {
                    id: id,
                    count: 4
                }
            }
        ]);
    }
    if (hasBar) {
        eval(`addItems({${id}Bar: {name: capitalize(camelCaseToRegular(id + "Bar")), size: size * 2}});`);
        addRecipes([
            {
                ingredients: [
                    {
                        id: id,
                        count: 2
                    },
                    {
                        id: "coal",
                        count: Math.floor(recipeCost / 2)
                    }
                ],
                output: {
                    id: `${id}Bar`,
                    count: 1
                }
            },
            {
                ingredients: [
                    {
                        id: `${id}Bar`,
                        count: recipeCost
                    },
                    {
                        id: "stick",
                        count: Math.round(recipeCost * 0.75)
                    }
                ],
                output: {
                    id: `${id}Pickaxe`,
                    count: 1
                }
            },
            {
                ingredients: [
                    {
                        id: `${id}Bar`,
                        count: recipeCost
                    },
                    {
                        id: "stick",
                        count: Math.round(recipeCost * 0.75)
                    }
                ],
                output: {
                    id: `${id}Axe`,
                    count: 1
                }
            }
        ]);
    } else {
        addRecipes([
            {
                ingredients: [
                    {
                        id: id,
                        count: recipeCost
                    },
                    {
                        id: "stick",
                        count: Math.round(recipeCost * 0.75)
                    }
                ],
                output: {
                    id: `${id}Pickaxe`,
                    count: 1
                }
            },
            {
                ingredients: [
                    {
                        id: id,
                        count: recipeCost
                    },
                    {
                        id: "stick",
                        count: Math.round(recipeCost * 0.75)
                    }
                ],
                output: {
                    id: `${id}Axe`,
                    count: 1
                }
            }
        ]);
    }
    reload();
}

function rename(id, name) {
    items[id].name = name;
}

function changeId(oldId, newId) {
    items[newId] = items[oldId];
    delete items[oldId];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            if (recipes[i].ingredients[j].id === oldId) {
                recipes[i].ingredients[j].id = newId;
            }
        }
    }
}