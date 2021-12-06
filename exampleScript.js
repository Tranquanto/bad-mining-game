// These can be used to add all three types of content and more
// The script runs when it's loaded

setInterval(() => {
    // This example makes the player slowly lose health, or suffocate, when they go above 50 ft altitude
    if (pos.y >= 50) {
        health--;
    }
}, 200);
addItems({
    uselessItem: {
        name: "Useless Item",
        size: 2
    },
    uselessItem2: {
        name: "Useless Item 2",
        size: 4
    }
});
addRecipes([
    {
        ingredients: [
            {
                id: "trimium",
                count: 4
            }
        ],
        output: {
            id: "flotuBar",
            count: 20
        }
    }
]);
addBlocks([
    {
        id: "exampleBlock",
        hardness: 3
    }
]);