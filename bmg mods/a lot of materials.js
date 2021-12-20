addMaterial("platinum", 42.5, 7, true, true);
addMaterial("arsenic", 35, 2.8, true, true);
addMaterial("antimony", 32.5, 3.3, true, true);
addMaterial("bismuth", 22.5, 4.85, true, true);
addMaterial("sulfur", 20, 2, true);
addMaterial("graphite", 15, 0.95, true, true);
addMaterial("acanthite", 22.5, 3.6, true);
addRecipes([{ingredients: [{id: "acanthite", count: 2}, {id: "coal", count: 2}], output: {id: "silverBar", count: 1}}]);
addMaterial("chalcocite", 27.5, 2.75, true);
addRecipes([{
    ingredients: [{id: "chalcocite", count: 2}, {id: "coal", count: 2}],
    output: {id: "copperBar", count: 1}
}]);
addMaterial("bornite", 30, 2.45, true, true);
rename("borniteBar", "Copper-Iron Alloy Bar");
rename("bornitePickaxe", "Copper-Iron Alloy Pickaxe");
rename("borniteAxe", "Copper-Iron Alloy Axe");
addMaterial("galena", 25, 3.7, true, true);
rename("galenaBar", "Lead Bar");
rename("galenaPickaxe", "Lead Pickaxe");
rename("galenaAxe", "Lead Axe");