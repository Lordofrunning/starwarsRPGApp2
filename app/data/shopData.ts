// contains all the information for stores


export const shopNames = [
    
"Eli's Everyday Emporium",
"Stella's Surplus Stop",
"Mo's Market",
"Tara's Treasure Chest",
"Arlo's Artisan Wares",
"Emmy's Essentials & More",
"Pete's Place of Plenty",
"Zorba's Salvage Shack",
"Greela's Galactic Goods",
"Drex's Droid Depot",
"Marn's Moon Market",
"Vela's Vapor Shop",
"Jexi's Jawa Junkyard",
"Tharn's Tech Terminal",
"Oona's Outer Rim Outpost",
"Rilo's Relic Resupply",
"Bexo's Blaster Bazaar",
"Noka's Nebula Nook",
"Yarrik's Yield Yard",
"Seebo's Starport Shop",
"Kyra's Krate & Cargo",
"Vorn's Vendor Vault",
"Tekka's Trinket Trove",
"Lom's Lightsaber Lounge",
"Rexa's Reactor Rarities",
"Doma's Droid Parts & Provisions",
"Jorra's Junk & Jabbers",
"Finnu's Force Finds",
"Grax's Gear Grind",
"Tilo's Trade Terminal",
"Zenna's Zabrak Zone",
"Qarr's Quasar Corner",
"R3-D9's Retro Repository",
"Mavi's Munitions Market",
"Orra's Outer Rim Relics",
"Bendu's Bits and Bobs",
"Kreezo's Corellian Curios",
"Tana's Tatooine Trinkets",
"Yuna's Used Starships",
"Narn's Naboo Niche",
"Silla's Smuggler Supplies",
"Dravo's Dune Deals",
"Jelli's Jedi Junkpile",
"Wexo's Wares and Wonders",
"Zuko's Zakku Market",
"Trenn's Trooper Gear",
"Aevo's Astromech Alley",
"Vira's Vintage Vault",
"Hondo's Hutt-Safe Goods",
"Mira's Mining Supply Co.",
"Leto's Light Freighter Fixes",
"Rikka's Reactor Junk",
"Kindo's Kessel Cache",
"Zebba's Zeffo Zone",
"Sarn's Starfreighter Stop",
"Vilo's Vibroblade Vault",
"Boona's Bounty Bazaar",
"Junta's Jawa Jumble",
"Karo's Kyber Crates",
"Mexi's Moisture Mart",
"Dran's Droid Doc Den",
"Edda's Ewok Emporium",
"Luri's Laser Locker",
"Tyx's Trade Tower",
"Reebo's Refit & Repair",
"Nara's Navigation Nook",
"Doro's Deep Space Depot",
"Trix's Tech Tools",
"Soola's Star Trader Shop",
"Graff's Grav Gear",
"Vinko's Void Vendor",
"Zeek's Zone of Zippers",
"Zalli's Zeff Relics",
"Quarn's Quirky Quarters",
"Fella's Fleet Fixes",
"Yoro's Yavin Yields",
"Haxa's Hyperdrive Hub",
"Jexo's Jetpack Junk",
"Reena's Republic Rarities",
"Krax's Krayt Caches",
"Uno's Ugnaught Utensils",
"Wari's Womp Rat Wares",
"Vell's Vortex Vendor",
"Noxi's Nexu Nests",
"Lana's Lightsaber Loot",
"Skarn's Ship Supplies",
"Jala's Jedi Junk & Jars",
"Broko's Bacta Bits",
"Sylvi's Star Map Store",
"Dorran's Droid Den",
"Kree's Kashyyyk Keepsakes",
"Tanni's Thrawn Treasures",
"Glaxx's Galactic Gear",
"Voona's Vapor Junkyard",
"Elek's Echo Base Essentials",
"Russa's Rebel Restock",
"Xanna's X-Wing Extras",
"Bren's Bounty Booth",
"Torr's Transmission Trades",
"Hexa's Holo Trinkets",
"Zyra's Zeltron Zings",
"Rondo's Republic Remnants",
"Galli's Grime & Gadgets",
"Zenn's Zero-G Garage",
"Kiff's Kessel Kiosk",
"Lurek's Lava Loot",
"Varn's Vault of Vibroknives"

]

export type Item = {
  name: string;
  cost: number;
  rarity: number;
  description: string;
  category: string;
};

export const allItems: Item[] = [
    // communication devices
  { name: 'Comlink (handheld)', cost: 25, rarity: 0 , description: 'item discription', category: "item" },
  { name: 'Comlink (long range)', cost: 200, rarity: 1 , description: 'item discription', category: "item" },

  // toxins and poisons
  { name: 'Synthetic Standard Neurotoxin (1 doese)', cost: 50, rarity: 6 , description: 'item discription', category: "item" },
  { name: 'Synthetic Standard Anesthetic (1 dose)', cost: 35, rarity: 4 , description: 'item discription', category: "item" },
  { name: 'Synthetic Standard Neuroparalytic (1 dose)', cost: 75, rarity: 75 , description: 'item discription', category: "item" },
  
  // medical stuff
  { name: 'Bacta (liter)', cost: 20, rarity: 1 , description: 'item discription', category: "item" },
  { name: 'Bacta (full tank)', cost: 4000, rarity: 1 , description: 'item discription', category: "item" },
  { name: 'Emergency Medpac', cost: 100, rarity: 1 , description: 'item discription', category: "item" },
  { name: 'Medpac', cost: 400, rarity: 2 , description: 'item discription', category: "item" },
  { name: 'stimpack', cost: 25, rarity: 1 , description: 'item discription', category: "item" },
  { name: 'Synthskin', cost: 10, rarity: 1 , description: 'item discription', category: "item" },


  // Detection Devices
  { name: 'Electrobinoculars', cost: 250, rarity: 1 , description: 'item discription', category: "item" },
  { name: 'General Purpose Scanner', cost: 500, rarity: 3 , description: 'item discription', category: "item" },
  { name: 'Hand Scanner', cost: 100, rarity: 2 , description: 'item discription', category: "item" },
  { name: 'Macrobinoculars', cost: 75, rarity: 2 , description: 'item discription', category: "item" },
  { name: 'Scanner Goggles', cost: 150, rarity: 3 , description: 'item discription' , category: "item"},
  { name: 'Surveillance Tagger', cost: 175, rarity: 4 , description: 'item discription', category: "item" },

  //Security
  { name: 'Binders', cost: 25, rarity: 0 , description: 'item discription', category: "item" },
  { name: 'Comm Jammer', cost: 400, rarity: 3 , description: 'item discription' , category: "item"},
  { name: 'Comm Scrambler', cost: 1000, rarity: 5 , description: 'item discription', category: "item" },
  { name: 'Disguise Kit', cost: 100, rarity: 4 , description: 'item discription', category: "item" },
  { name: 'Electronic Lock Breaker', cost: 1000, rarity: 5 , description: 'item discription' , category: "item"},
  { name: 'Restraining Bolt', cost: 35, rarity: 0 , description: 'item discription' , category: "item"},
  { name: 'Slicer Gear', cost: 500, rarity: 4 , description: 'item discription', category: "item" },
  
  //Survival
   { name: 'Crash Survival Kit', cost: 300, rarity: 2 , description: 'item discription', category: "item" },
   { name: 'Ration Pack', cost: 5, rarity: 0 , description: 'item discription', category: "item" },
   { name: 'Breath Mask', cost: 25, rarity: 1 , description: 'item discription', category: "item" },
   { name: 'Space Suit', cost: 100, rarity: 1 , description: 'item discription', category: "item" },
   { name: 'Tent', cost: 100, rarity: 1 , description: 'item discription', category: "item" },
   { name: 'Thermal Cloak', cost: 200, rarity: 1 , description: 'item discription', category: "item" },

  // Tools
  { name: 'Backpack', cost: 50, rarity: 0 , description: 'item discription' , category: "item"},
  { name: 'Climbing Gear', cost: 50, rarity: 2 , description: 'item discription', category: "item" },
  { name: 'Datapad', cost: 75, rarity: 1 , description: 'item discription' , category: "item"},
  { name: 'Emergency Repair Patch', cost: 25, rarity: 1 , description: 'item discription', category: "item" },
  { name: 'Extra Reloads', cost: 25, rarity: 1 , description: 'item discription', category: "item" },
  { name: 'Fusion Lantern', cost: 150, rarity: 2 , description: 'item discription' , category: "item"},
  { name: 'Glow Rod', cost: 10, rarity: 0 , description: 'item discription' , category: "item"},
  { name: 'Jet Pack', cost: 4500, rarity: 7 , description: 'item discription' , category: "item"},
  { name: 'Tool Kit', cost: 350, rarity: 2 , description: 'item discription', category: "item" },
  { name: 'Utility Belt', cost: 25, rarity: 0 , description: 'item discription', category: "item" },
  // etc.
];


export type blackMarketItem = {
    name: string;
    cost: number;
    rarity: number;
    description: string;

};

export const allBlackMarketItems: blackMarketItem[] = [
    // spice stuff
    { name: 'Avabush Spice (dose)', cost: 25, rarity: 6 , description: 'item discription' },
    { name: 'Avabush Spice (100 dose cargo container)', cost: 2000, rarity: 7 , description: 'item discription' },
    { name: 'Booster Blue(1 dose)', cost: 10, rarity: 5 , description: 'item discription' },
    { name: 'Booster Blue (100 dose cargo container)', cost: 750, rarity: 6 , description: 'item discription' },
    { name: 'Death sticks(1 dose)', cost: 5, rarity: 1 , description: 'item discription' },
    { name: 'Death sticks(100 dose cargo container)', cost: 250, rarity: 2 , description: 'item discription' },
    { name: 'Glitterstim (1 dose)', cost: 100, rarity: 7 , description: 'item discription' },
    { name: 'Glitterstim (100 dose cargo container)', cost: 5000, rarity: 8 , description: 'item discription' },
    { name: 'Lesai (1 dose) ', cost: 500, rarity: 9 , description: 'item discription' },
    { name: 'Lesai (20 dose enviro-sealev cargo pod', cost: 7500, rarity: 10 , description: 'item discription' },
    { name: 'Yarrock (1 dose)', cost: 350, rarity: 8 , description: 'item discription' },
    { name: 'Yarrock (100 dose cargo container)', cost: 20000, rarity: 9 , description: 'item discription' },

    // personal equipment
    { name: 'Data Breaker', cost: 1000, rarity: 6 , description: 'item discription' },
    { name: 'Flesh Camouflage Set', cost: 2500, rarity: 7 , description: 'item discription' },
    { name: 'Personal Stealth Field', cost: 20000, rarity: 9 , description: 'item discription' },
];


export type weapon = {
    name: string;
    cost: number;
    rarity: number
    description: string;
    
    damage: number;
    critRating: number;
    encum: number;
    range: string;
};

export const allWeapons: weapon[] = [
    {name: "blaster rifle", cost: 700, rarity: 4, description: "", damage: 8, critRating: 3, encum: 4, range: ''},
]

export type armor = {
    name: string;
    cost: number;
    rarity: number
    description: string;
    
    soak: number;
    defense: string;
    encum: number;
    
};

export const allArmor: armor[] = [
    {name: "padded clothing", cost: 200, rarity: 3, description: "", soak: 1, defense: '', encum: 4},
]