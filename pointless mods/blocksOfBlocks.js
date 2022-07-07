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
for (const i in items) {
    addBlocks([
        {
            id: `${camelCase(items[i].name)}Block`,
            hardness: (10 * items[i].size) / (items[i].size + 2),
            excludeSize: true
        }
    ]);
    addRecipes([
        {
            ingredients: [
                {
                    id: i,
                    count: 4
                }
            ],
            output: {
                id: `${camelCase(items[i].name)}Block`,
                count: 1
            }
        }
    ]);
    addRecipes([
        {
            ingredients: [
                {
                    id: `${camelCase(items[i].name)}Block`,
                    count: 1
                }
            ],
            output: {
                id: i,
                count: 4
            }
        }
    ]);
}