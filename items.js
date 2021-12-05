const ores = [
    {id: "air", hardness: 0, commonness: 100, foundBelow: 39000, foundAbove: 1},
    {id: "dirt", hardness: 0.5, commonness: 90, foundBelow: 2500, foundAbove: -20739440},
    {id: "log", hardness: 1, commonness: 60, foundBelow: 2500, foundAbove: 1},
    {id: "stick", hardness: 1, commonness: 80, foundBelow: 2500, foundAbove: 1},
    {id: "stone", hardness: 2, commonness: 100, foundBelow: 0, foundAbove: -20739840},
    {id: "granite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -43760},
    {id: "andesite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -43760},
    {id: "diorite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -43760},
    {id: "pumice", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -43760},
    {id: "talc", hardness: 2, commonness: 40, foundBelow: -3, foundAbove: -10293110},
    {id: "coal", hardness: 2, commonness: 60, foundBelow: 0, foundAbove: -20739840},
    {id: "limonite", hardness: 3, commonness: 50, foundBelow: -5, foundAbove: -20739840},
    {id: "copper", hardness: 3, commonness: 45, foundBelow: -38, foundAbove: -20144206},
    {id: "chromite", hardness: 3, commonness: 50, foundBelow: -253, foundAbove: -13299},
    {id: "silver", hardness: 4, commonness: 40, foundBelow: -212, foundAbove: -913},
    {id: "titanite", hardness: 4, commonness: 42, foundBelow: -1614, foundAbove: -3723182},
    {id: "gold", hardness: 4, commonness: 30, foundBelow: -4061, foundAbove: -5317},
    {id: "hematite", hardness: 5, commonness: 40, foundBelow: -15611, foundAbove: -18222},
    {id: "apatite", hardness: 5, commonness: 40, foundBelow: -23812, foundAbove: -24000},
    {id: "mercury", hardness: 5, commonness: 25, foundBelow: -10, foundAbove: -30, deadliness: 50},
    {id: "barite", hardness: 6, commonness: 20, foundBelow: -24036, foundAbove: -93285},
    {id: "floacite", hardness: 6, commonness: 5, foundBelow: 3051, foundAbove: 252},
    {id: "trimium", hardness: 6, commonness: 12, foundBelow: -10315119, foundAbove: -10315200},
    {id: "arsenopyrite", hardness: 7, commonness: 15, foundBelow: -11912, foundAbove: -12036, deadliness: 25},
    {id: "garnet", hardness: 7, commonness: 4, foundBelow: -12929, foundAbove: -19291},
    {id: "topaz", hardness: 8, commonness: 4, foundBelow: -20333, foundAbove: -813213},
    {id: "sapphire", hardness: 8, commonness: 3, foundBelow: -24115, foundAbove: -3001000},
    {id: "ruby", hardness: 9, commonness: 1, foundBelow: -37621, foundAbove: -6123123},
    {id: "diamond", hardness: 10, commonness: 0.21, foundBelow: -91291, foundAbove: -19292294},

    {id: "wood", hardness: 1},
    {id: "stoneBlock", hardness: 2},
    {id: "graniteBlock", hardness: 2},
    {id: "andesiteBlock", hardness: 2},
    {id: "dioriteBlock", hardness: 2},
    {id: "pumiceBlock", hardness: 2},
    {id: "airBlock", hardness: 0},
];

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
    limonite: {name: "Limonite", size: 3},
    copper: {name: "Copper Ore", size: 3},
    chromite: {name: "Chromite", size: 3},
    silver: {name: "Silver Ore", size: 3},
    titanite: {name: "Titanite", size: 2},
    gold: {name: "Gold Ore", size: 4},
    hematite: {name: "Hematite", size: 4},
    apatite: {name: "Apatite", size: 1},
    mercury: {name: "Mercury", size: 1.2},
    barite: {name: "Barite", size: 1.1},
    floacite: {name: "Floacite", size: 0.3},
    trimium: {name: "Trimium", size: 1.75},
    arsenopyrite: {name: "Arsenopyrite", size: 2},
    garnet: {name: "Garnet", size: 1},
    topaz: {name: "Topaz", size: 1.2},
    sapphire: {name: "Sapphire", size: 1},
    ruby: {name: "Ruby", size: 1.1},
    diamond: {name: "Diamond", size: 1},

    // Blocks

    wood: {name: "Wood", size: 1, type: "block"},
    stoneBlock: {name: "Stone Block", size: 2, type: "block"},
    graniteBlock: {name: "Granite Block", size: 2, type: "block"},
    andesiteBlock: {name: "Andesite Block", size: 2, type: "block"},
    dioriteBlock: {name: "Diorite Block", size: 2, type: "block"},
    pumiceBlock: {name: "Pumice Block", size: 0.75, type: "block"},
    airBlock: {name: "Air Block", size: 0, type: "block"},

    // Other Crafted Items

    ironBar: {name: "Iron Bar", size: 6},
    copperBar: {name: "Copper Bar", size: 6},
    silverBar: {name: "Silver Bar", size: 6},
    titaniumBar: {name: "Titanium Bar", size: 4},
    goldBar: {name: "Gold Bar", size: 8},
    heavyIronBar: {name: "Heavy Iron Bar", size: 8},
    bariumBar: {name: "Barium Bar", size: 2.2},
    flotuBar: {name: "Flotu Bar", size: 0.6},

    // Tools

    stickAxe: {name: "Long Stick", size: 1, type: "axe", durability: 8},
    woodAxe: {name: "Wood Axe", size: 1, type: "axe", durability: 15},
    stoneAxe: {name: "Stone Axe", size: 1, type: "axe", durability: 40, recipe: {"stone": 6, "stick": 3}},
    talcAxe: {name: "Talc Axe", size: 1, type: "axe", durability: 40, recipe: {"talc": 6, "stick": 3}},
    ironAxe: {name: "Iron Axe", size: 1, type: "axe", durability: 100, recipe: {"ironBar": 4, "stick": 4}},
    copperAxe: {name: "Copper Axe", size: 1, type: "axe", durability: 120, recipe: {"copperBar": 4, "stick": 4}},
    silverAxe: {name: "Silver Axe", size: 1, type: "axe", durability: 200, recipe: {"silverBar": 4, "stick": 4}},
    titaniumAxe: {name: "Titanium Axe", size: 1, type: "axe", durability: 300, recipe: {"titaniumBar": 5, "stick": 6}},
    goldAxe: {name: "Gold Axe", size: 1, type: "axe", durability: 60, recipe: {"goldBar": 4, "stick": 5}},
    apatiteAxe: {name: "Apatite Axe", size: 1, type: "axe", durability: 500, recipe: {"apatite": 4, "stick": 3}},
    bariumAxe: {name: "Barium Axe", size: 1, type: "axe", durability: 1000, recipe: {"bariumBar": 8, "stick": 5}},
    garnetAxe: {name: "Garnet Axe", size: 1, type: "axe", durability: 4250, recipe: {"garnet": 12, "stick": 18}},
    topazAxe: {name: "Topaz Axe", size: 1, type: "axe", durability: 6010, recipe: {"topaz": 18, "stick": 22}},
    corundumAxe: {
        name: "Corundum Axe",
        size: 1,
        type: "axe",
        durability: 7880,
        recipe: {"sapphire": 12, "ruby": 12, "stick": 10}
    },
    diamondAxe: {
        name: "Diamond Axe",
        size: 1,
        type: "axe",
        durability: 10000,
        recipe: {"diamond": 10, "topaz": 1, "stick": 12}
    },

    stickPickaxe: {
        name: "Long Sharp Stick",
        strength: 1,
        size: 1,
        type: "pickaxe",
        durability: 8
    },
    woodPickaxe: {
        name: "Wood Pickaxe",
        durability: 15,
        size: 1,
        type: "pickaxe",
        strength: 2,
        recipe: {"wood": 6, "stick": 3}
    },
    stonePickaxe: {
        name: "Stone Pickaxe",
        durability: 40,
        size: 1,
        type: "pickaxe",
        strength: 3,
        recipe: {"stone": 6, "stick": 3}
    },
    talcPickaxe: {
        name: "Talc Pickaxe",
        durability: 40,
        size: 1,
        type: "pickaxe",
        strength: 4,
        recipe: {"talc": 6, "stick": 3}
    },
    ironPickaxe: {
        name: "Iron Pickaxe",
        durability: 100,
        size: 1,
        type: "pickaxe",
        strength: 5,
        recipe: {"ironBar": 4, "stick": 4}
    },
    copperPickaxe: {
        name: "Copper Pickaxe",
        durability: 120,
        size: 1,
        type: "pickaxe",
        strength: 6,
        recipe: {"copperBar": 4, "stick": 4}
    },
    silverPickaxe: {
        name: "Silver Pickaxe",
        durability: 200,
        size: 1,
        type: "pickaxe",
        strength: 6,
        recipe: {"silverBar": 4, "stick": 4}
    },
    titaniumPickaxe: {
        name: "Titanium Pickaxe",
        durability: 300,
        size: 1,
        type: "pickaxe",
        strength: 7,
        recipe: {"titaniumBar": 5, "stick": 6}
    },
    goldPickaxe: {
        name: "Gold Pickaxe",
        durability: 60,
        size: 1,
        type: "pickaxe",
        strength: 4,
        recipe: {"goldBar": 4, "stick": 5}
    },
    apatitePickaxe: {
        name: "Apatite Pickaxe",
        durability: 500,
        size: 1,
        type: "pickaxe",
        strength: 7,
        recipe: {"apatite": 4, "stick": 3}
    },
    bariumPickaxe: {
        name: "Barium Pickaxe",
        durability: 1000,
        size: 1,
        type: "pickaxe",
        strength: 8,
        recipe: {"bariumBar": 8, "stick": 5}
    },
    garnetPickaxe: {
        name: "Garnet Pickaxe",
        durability: 4250,
        size: 1,
        type: "pickaxe",
        strength: 9,
        recipe: {"garnet": 12, "stick": 18}
    },
    topazPickaxe: {
        name: "Topaz Pickaxe",
        durability: 6010,
        size: 1,
        type: "pickaxe",
        strength: 9,
        recipe: {"topaz": 18, "stick": 22}
    },
    corundumPickaxe: {
        name: "Corundum Pickaxe",
        durability: 7880,
        strength: 10, size: 1, type: "pickaxe",
        recipe: {"sapphire": 12, "ruby": 12, "stick": 10}
    },
    diamondPickaxe: {
        name: "Diamond Pickaxe",
        durability: 10000,
        strength: 10,
        recipe: {"diamond": 10, "topaz": 1, "stick": 12}
    },
    shoppingBag: {name: "Shopping Bag", storage: 100},
    box: {
        name: "Box",
        storage: 200,
        recipe: [{id: "stone", count: 6}, {id: "granite", count: 3}, {id: "wood", count: 7}]
    },
    backpack: {
        name: "Backpack",
        storage: 400,
        recipe: [{id: "ironBar", count: 2}, {id: "granite", count: 12}, {id: "pumice", count: 3}]
    },
    bucket: {
        name: "Bucket",
        storage: 1000,
        recipe: [{id: "silverBar", count: 28}, {id: "stone", count: 13}, {id: "stick", count: 4}]
    },
    vault: {name: "Vault", storage: 2500, recipe: [{id: "apatite", count: 16}, {id: "goldBar", count: 80}]},
    chest: {name: "Chest", storage: 8000, recipe: [{"ruby": 1, "garnet": 56, "stone": 100}]},
    veryExpensiveEnormousBox: {
        name: "Very Expensive Enormous Box",
        storage: 6553600,
        recipe: [{"diamond": 200, "topaz": 225}]
    }
};