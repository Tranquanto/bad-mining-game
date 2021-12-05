// These can be used to add all three types of content and more
// The script runs when it's loaded

setInterval(() => {
    // This example makes the player slowly lose health, or suffocate, when they go above 50 ft altitude
    if (pos.y >= 50) {
        health--;
    }
}, 200);