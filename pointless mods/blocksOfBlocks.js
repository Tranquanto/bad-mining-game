const oresLength = ores.length;
for (let i = 0; i < oresLength; i++) {
    if (ores.commonness !== undefined) {
        addBlocks([
            {
                id: `${ores[i].id}Block`,
                hardness: ores[i].hardness
            }
        ]);
        addRecipes([
            {
                ingredients: [
                    {
                        id: ores[i].id,
                        count: 4
                    }
                ],
                output: {
                    id: `${ores[i].id}Block`,
                    count: 1
                }
            }
        ]);
        addRecipes([
            {
                ingredients: [
                    {
                        id: `${ores[i].id}Block`,
                        count: 4
                    }
                ],
                output: {
                    id: ores[i].id,
                    count: 1
                }
            }
        ]);
    }
}
const itemLength = Object.keys(items).length;
for (let i = 0; i < itemLength; i++) {
    if (items[Object.keys(items)[i]].type !== "hello") {
        addBlocks([
            {
                id: `${camelCase(items[Object.keys(items)[i]].name)}Block`,
                hardness: (10 * items[Object.keys(items)[i]].size) / (items[Object.keys(items)[i]].size + 2),
                excludeSize: true
            }
        ]);
        addRecipes([
            {
                ingredients: [
                    {
                        id: Object.keys(items)[i],
                        count: 4
                    }
                ],
                output: {
                    id: `${camelCase(items[Object.keys(items)[i]].name)}Block`,
                    count: 1
                }
            }
        ]);
        addRecipes([
            {
                ingredients: [
                    {
                        id: `${camelCase(items[Object.keys(items)[i]].name)}Block`,
                        count: 1
                    }
                ],
                output: {
                    id: Object.keys(items)[i],
                    count: 4
                }
            }
        ]);
    }
}