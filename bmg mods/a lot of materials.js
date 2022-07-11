addMaterial({
    id: "platinum",
    power: 42.5,
    size: 7,
    hasOre: true,
    hasBar: true,
    oreColor: "#bbb"
});
addMaterial({
    id: "arsenic",
    power: 35,
    size: 2.8,
    hasOre: true,
    hasBar: true,
    oreColor: "#587053"
});
addMaterial({
    id: "antimony",
    power: 32.5,
    size: 3.3,
    hasOre: true,
    hasBar: true,
    oreColor: "#637053"
});
addMaterial({
    id: "bismuth",
    power: 22.5,
    size: 4.85,
    hasOre: true,
    hasBar: true,
    oreColor: "#938c76"
});
addMaterial({
    id: "sulfur",
    power: 20,
    size: 2,
    hasOre: true,
    oreColor: "#ecd960"
});
addMaterial({
    id: "graphite",
    power: 15,
    size: 0.95,
    hasOre: true,
    hasBar: true,
    oreColor: "#464646"
});
addMaterial({
    id: "acanthite",
    power: 22.5,
    size: 3.6,
    hasOre: true,
    oreColor: "#beb4c9"
});
addMaterial({
    id: "chalcocite",
    power: 27.5,
    size: 2.75,
    hasOre: true,
    oreColor: "#33333c"
});
addMaterial({
    id: "bornite",
    power: 30,
    size: 2.45,
    hasOre: true,
    hasBar: true,
    oreColor: "#d3802c"
});
addMaterial({
    id: "galena",
    power: 25,
    size: 3.7,
    hasOre: true,
    hasBar: true,
    oreColor: "#592967"
});
addRecipes([{
    ingredients: [{id: "acanthite", count: 2}, {id: "fuel", count: 2}],
    output: {id: "silverBar", count: 1}
}]);
addRecipes([{
    ingredients: [{id: "chalcocite", count: 2}, {id: "fuel", count: 2}],
    output: {id: "copperBar", count: 1}
}]);
rename("borniteBar", "Copper-Iron Alloy Bar");
rename("bornitePickaxe", "Copper-Iron Alloy Pickaxe");
rename("borniteAxe", "Copper-Iron Alloy Axe");
rename("galenaBar", "Lead Bar");
rename("galenaPickaxe", "Lead Pickaxe");
rename("galenaAxe", "Lead Axe");