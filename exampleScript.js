// These can be used to add all three types of content and more
// The script runs when it's loaded

setInterval(() => {
    // This example makes the player slowly lose health, or suffocate, when they go above 50 ft altitude
    if (player.pos.y >= 50) {
        player.health--;
    }
}, 200);
addItems({
    uselessItem: {
        name: "Useless Item",
        desc: "hello!",
        size: 2
    },
    uselessItem2: {
        name: "Useless Item 2",
        desc: "hello there!",
        size: 4,
        types: ["food"],
        foodValue: 10
    }
});
addRecipes([
    {
        ingredients: [
            {
                id: "uselessItem",
                count: 4
            }
        ],
        output: {
            id: "uselessItem2",
            count: 20
        }
    }
]);
addBlocks([
    {
        id: "uselessBlock",
        hardness: 3,
        color: "#f00"
    },
    {
        id: "uselessLiquid",
        viscosity: 50,
        types: ["liquid"],
        commonness: 20,
        foundBelow: -10000,
        foundAbove: -100000,
        color: "#00ff0040"
    }
]);