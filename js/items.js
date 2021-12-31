let ores = [
    {id: "air", hardness: 0, commonness: 100, foundBelow: 39000, foundAbove: 1, color: "#ffffff00"},
    {id: "dirt", hardness: 0.5, commonness: 90, foundBelow: 2500, foundAbove: -20739440, color: "#3d291d"},
    {id: "log", hardness: 1, commonness: 60, foundBelow: 2500, foundAbove: 1, color: "#361e0d"},
    {id: "apple", hardness: 1, commonness: 60, foundBelow: 2500, foundAbove: 1, color: "#ff0000"},
    {id: "stick", hardness: 1, commonness: 80, foundBelow: 2500, foundAbove: 1, color: "#4a2d18"},
    {id: "stone", hardness: 2, commonness: 100, foundBelow: 0, foundAbove: -20739840, color: "#474747"},
    {id: "granite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -44000, color: "#7e5d5d"},
    {id: "andesite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -44000, color: "#ababab"},
    {id: "diorite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -44000, color: "#dbdbdb"},
    {id: "pumice", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -44000, color: "#a19d3d"},
    {id: "talc", hardness: 2, commonness: 40, foundBelow: -3, foundAbove: -10000000, color: "#607054"},
    {id: "coal", hardness: 2, commonness: 60, foundBelow: 0, foundAbove: -Infinity, color: "#281f1b"},
    {id: "limonite", hardness: 3, commonness: 50, foundBelow: -5, foundAbove: -Infinity, color: "#9b5632"},
    {id: "copper", hardness: 3, commonness: 45, foundBelow: -38, foundAbove: -Infinity, color: "#ff7300"},
    {id: "cassiterite", hardness: 4, commonness: 45, foundBelow: -64, foundAbove: -Infinity, color: "#a4b7bb"},
    {id: "chromite", hardness: 3, commonness: 50, foundBelow: -250, foundAbove: -13300, color: "#a1fff2"},
    {id: "silver", hardness: 4, commonness: 40, foundBelow: -210, foundAbove: -900, color: "#beffff"},
    {id: "titanite", hardness: 4, commonness: 42, foundBelow: -1600, foundAbove: -3700000, color: "#7496f5"},
    {id: "gold", hardness: 4, commonness: 30, foundBelow: -4100, foundAbove: -5300, color: "#ffd500"},
    {id: "hematite", hardness: 5, commonness: 40, foundBelow: -16000, foundAbove: -18000, color: "#25004d"},
    {id: "apatite", hardness: 5, commonness: 40, foundBelow: -24000, foundAbove: -24000, color: "#7332c2"},
    {id: "barite", hardness: 6, commonness: 20, foundBelow: -24000, foundAbove: -93300, color: "#a49474"},
    {id: "floacite", hardness: 6, commonness: 5, foundBelow: 3050, foundAbove: 250, color: "#fba7ff"},
    {id: "trimium", hardness: 6, commonness: 12, foundBelow: -10315120, foundAbove: -10315200, color: "#762827"},
    {id: "arsenopyrite", hardness: 7, commonness: 15, foundBelow: -12000, foundAbove: -12036, deadliness: 25, color: "#ffe462"},
    {id: "garnet", hardness: 7, commonness: 4, foundBelow: -13000, foundAbove: -19291, color: "#ff2626"},
    {id: "topaz", hardness: 8, commonness: 4, foundBelow: -20000, foundAbove: -813213, color: "#ff9900"},
    {id: "sapphire", hardness: 8, commonness: 3, foundBelow: -24000, foundAbove: -3000000, color: "#4f4fff"},
    {id: "ruby", hardness: 9, commonness: 1, foundBelow: -38000, foundAbove: -6000000, color: "#ff0040"},
    {id: "diamond", hardness: 10, commonness: 0.21, foundBelow: -90000, foundAbove: -Infinity, color: "#7cdcff"},
    {id: "unobtainium", hardness: 10, commonness: 0.001, foundBelow: -666, foundAbove: -666, color: "#ff00ff"},

    {id: "wood", hardness: 1, color: "#573218"},
    {id: "stoneBlock", hardness: 2, color: "#646464"},
    {id: "graniteBlock", hardness: 2, color: "#a27878"},
    {id: "andesiteBlock", hardness: 2, color: "#c0c0c0"},
    {id: "dioriteBlock", hardness: 2, color: "#e8e8e8"},
    {id: "pumiceBlock", hardness: 2, color: "#d5d059"},
    {id: "airBlock", hardness: 0, color: "#ffffff60"},
    // Viscosity = milliseconds to move to a new block
    {id: "water", types: ["liquid"], viscosity: 200, commonness: 60, foundBelow: 1, foundAbove: -1000000, color: "#005ac0"},
    {id: "oil", types: ["liquid"], viscosity: 300, commonness: 30, foundBelow: 20, foundAbove: -300, color: "#31302c"},
    {id: "lava", types: ["liquid"], viscosity: 1500, commonness: 10, foundBelow: -6000, foundAbove: -1000000, deadliness: 40, color: "#ff4d00"},
    {id: "mercury", types: ["liquid"], viscosity: 150, commonness: 25, foundBelow: -10, foundAbove: -30, deadliness: 50, color: "#d9d5bc"}
];

for (let i = 0; i < ores.length; i++) {
    if (ores[i].hardness === undefined || ores[i].hardness === null) {
        ores[i].hardness = 0;
    }
    if (ores[i].types === undefined) {
        ores[i].types = [];
    }
}

let items = {

    // Resources

    dirt: {name: "Dirt", size: 1},
    log: {name: "Log", size: 1},
    stick: {name: "Stick", size: 0.25},
    stone: {name: "Stone", size: 2},
    granite: {name: "Granite", size: 2},
    andesite: {name: "Andesite", size: 2},
    diorite: {name: "Diorite", size: 2},
    pumice: {name: "Pumice", size: 0.75},
    talc: {name: "Talc", size: 2},
    coal: {name: "Coal", size: 1.5},
    limonite: {name: "Limonite (Iron Ore)", size: 3},
    copper: {name: "Copper Ore", size: 3},
    cassiterite: {name: "Cassiterite (Tin Ore)", size: 2.5},
    chromite: {name: "Chromite (Chromium Ore)", size: 3},
    silver: {name: "Silver Ore", size: 3},
    titanite: {name: "Titanite (Titanium Ore)", size: 2},
    gold: {name: "Gold Ore", size: 4},
    hematite: {name: "Hematite (Heavy Iron Ore)", size: 4},
    apatite: {name: "Apatite", size: 1},
    mercury: {name: "Mercury", size: 1.2},
    barite: {name: "Barite (Barium Ore)", size: 1.1},
    floacite: {name: "Floacite (Flotu Ore)", size: 0.3},
    trimium: {name: "Trimium", size: 1.75},
    arsenopyrite: {name: "Arsenopyrite", size: 2},
    garnet: {name: "Garnet", size: 1},
    topaz: {name: "Topaz", size: 1.2},
    sapphire: {name: "Sapphire", size: 1},
    ruby: {name: "Ruby", size: 1.1},
    diamond: {name: "Diamond", size: 1},
    unobtainium: {name: "Unobtainium", size: 10},

    // Blocks

    wood: {name: "Wood", size: 1, types: ["block"]},
    stoneBlock: {name: "Stone Block", types: ["block"]},
    graniteBlock: {name: "Granite Block", types: ["block"]},
    andesiteBlock: {name: "Andesite Block", types: ["block"]},
    dioriteBlock: {name: "Diorite Block", types: ["block"]},
    pumiceBlock: {name: "Pumice Block", types: ["block"]},
    airBlock: {name: "Air Block", size: 0, types: ["block"]},

    // Other Crafted Items

    ironBar: {name: "Iron Bar", size: 6},
    copperBar: {name: "Copper Bar", size: 6},
    bronzeBar: {name: "Bronze Bar", size: 7},
    tinBar: {name: "Tin Bar", size: 5},
    chromeBar: {name: "Chrome Bar", size: 6},
    silverBar: {name: "Silver Bar", size: 6},
    titaniumBar: {name: "Titanium Bar", size: 4},
    goldBar: {name: "Gold Bar", size: 8},
    heavyIronBar: {name: "Heavy Iron Bar", size: 8},
    bariumBar: {name: "Barium Bar", size: 2.2},
    flotuBar: {name: "Flotu Bar", size: 0.6},
    unobtainableBar: {name: "Unobtainable Bar"},

    // Tools

    stickAxe: {name: "Long Stick", types: ["axe"], durability: 8},
    woodAxe: {name: "Wood Axe", types: ["axe"], durability: 15},
    stoneAxe: {name: "Stone Axe", types: ["axe"], durability: 40},
    talcAxe: {name: "Talc Axe", types: ["axe"], durability: 40},
    ironAxe: {name: "Iron Axe", types: ["axe"], durability: 100},
    copperAxe: {name: "Copper Axe", types: ["axe"], durability: 80},
    bronzeAxe: {name: "Bronze Axe", types: ["axe"], durability: 240},
    tinAxe: {name: "Tin Axe", types: ["axe"], durability: 90},
    silverAxe: {name: "Silver Axe", types: ["axe"], durability: 200},
    titaniumAxe: {name: "Titanium Axe", types: ["axe"], durability: 300},
    goldAxe: {name: "Gold Axe", types: ["axe"], durability: 60},
    apatiteAxe: {name: "Apatite Axe", types: ["axe"], durability: 500},
    bariumAxe: {name: "Barium Axe", types: ["axe"], durability: 1000},
    garnetAxe: {name: "Garnet Axe", types: ["axe"], durability: 4250},
    topazAxe: {name: "Topaz Axe", types: ["axe"], durability: 6010},
    corundumAxe: {
        name: "Corundum Axe",
        types: ["axe"],
        durability: 7880
    },
    diamondAxe: {
        name: "Diamond Axe",
        types: ["axe"],
        durability: 10000
    },

    stickPickaxe: {
        name: "Long Sharp Stick",
        strength: 1,
        types: ["pickaxe"],
        durability: 8
    },
    woodPickaxe: {
        name: "Wood Pickaxe",
        durability: 15,
        types: ["pickaxe"],
        strength: 2
    },
    stonePickaxe: {
        name: "Stone Pickaxe",
        durability: 40,
        types: ["pickaxe"],
        strength: 3
    },
    talcPickaxe: {
        name: "Talc Pickaxe",
        durability: 40,
        types: ["pickaxe"],
        strength: 4
    },
    ironPickaxe: {
        name: "Iron Pickaxe",
        durability: 100,
        types: ["pickaxe"],
        strength: 5
    },
    copperPickaxe: {
        name: "Copper Pickaxe",
        durability: 80,
        types: ["pickaxe"],
        strength: 6
    },
    bronzePickaxe: {
        name: "Bronze Pickaxe",
        durability: 240,
        types: ["pickaxe"],
        strength: 7
    },
    tinPickaxe: {
        name: "Tin Pickaxe",
        durability: 90,
        types: ["pickaxe"],
        strength: 5
    },
    silverPickaxe: {
        name: "Silver Pickaxe",
        durability: 200,
        types: ["pickaxe"],
        strength: 6
    },
    titaniumPickaxe: {
        name: "Titanium Pickaxe",
        durability: 300,
        types: ["pickaxe"],
        strength: 7
    },
    goldPickaxe: {
        name: "Gold Pickaxe",
        durability: 60,
        types: ["pickaxe"],
        strength: 4
    },
    apatitePickaxe: {
        name: "Apatite Pickaxe",
        durability: 500,
        types: ["pickaxe"],
        strength: 7
    },
    bariumPickaxe: {
        name: "Barium Pickaxe",
        durability: 1000,
        types: ["pickaxe"],
        strength: 8
    },
    garnetPickaxe: {
        name: "Garnet Pickaxe",
        durability: 4250,
        types: ["pickaxe"],
        strength: 9
    },
    topazPickaxe: {
        name: "Topaz Pickaxe",
        durability: 6010,
        types: ["pickaxe"],
        strength: 9
    },
    corundumPickaxe: {
        name: "Corundum Pickaxe",
        durability: 7880,
        strength: 10,
        types: ["pickaxe"]
    },
    diamondPickaxe: {
        name: "Diamond Pickaxe",
        durability: 10000,
        strength: 10,
        types: ["pickaxe"]
    },
    shoppingBag: {name: "Shopping Bag"},
    box: {
        name: "Box"
    },
    backpack: {
        name: "Backpack"
    },
    magicBucket: {
        name: "Magic Bucket"
    },
    vault: {name: "Vault"},
    chest: {name: "Chest"},
    veryExpensiveEnormousBox: {
        name: "Very Expensive Enormous Box"
    },
    infinityBox: {
        name: "Infinity Box"
    },
    rocketBoots: {name: "Rocket Boots"},

    apple: {
        name: "Apple",
        size: 0.2,
        types: ["food"],
        foodValue: 10,
        drinkValue: 5
    },
    steak: {
        name: "Steak",
        size: 1,
        types: ["food"],
        foodValue: 30,
        needsToBeCooked: true
    }
};