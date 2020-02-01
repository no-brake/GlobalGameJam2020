export const combinationLookup: {
    [left: string]: {
        [right: string]: number;
    }
} = {
    "banane": {
        "banane": 100,
        "bear": 10,
        "croissant": 11,
        "einhorn": 12,
        "laptop": 13,
        "pizza": 14,
        "uboot": 15,
        "uhr": 16
    },
    "bear": {
        "banane": 9,
        "bear": 101,
        "croissant": 11,
        "einhorn": 12,
        "laptop": 13,
        "pizza": 14,
        "uboot": 15,
        "uhr": 16
    },
    "croissant": {
        "banane": 9,
        "bear": 10,
        "croissant": 102,
        "einhorn": 12,
        "laptop": 13,
        "pizza": 14,
        "uboot": 15,
        "uhr": 16
    },
    "einhorn": {
        "banane": 9,
        "bear": 10,
        "croissant": 11,
        "einhorn": 777,
        "laptop": 13,
        "pizza": 14,
        "uboot": 15,
        "uhr": 16
    },
    "laptop": {
        "banane": 9,
        "bear": 10,
        "croissant": 11,
        "einhorn": 12,
        "laptop": 103,
        "pizza": 14,
        "uboot": 15,
        "uhr": 16
    },
    "pizza": {
        "banane": 9,
        "bear": 10,
        "croissant": 11,
        "einhorn": 12,
        "laptop": 13,
        "pizza": 104,
        "uboot": 15,
        "uhr": 16
    },
    "uboot": {
        "banane": 9,
        "bear": 10,
        "croissant": 11,
        "einhorn": 12,
        "laptop": 13,
        "pizza": 14,
        "uboot": 105,
        "uhr": 16
    },
    "uhr": {
        "banane": 9,
        "bear": 10,
        "croissant": 11,
        "einhorn": 12,
        "laptop": 13,
        "pizza": 14,
        "uboot": 15,
        "uhr": 106
    }
}