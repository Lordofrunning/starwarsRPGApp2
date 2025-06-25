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
  quantity: number;
  description: string;
  category: string;
};



export const allItems: Item[] = [
    // communication devices
  { name: 'Comlink (handheld)', cost: 25, rarity: 1 , quantity: 2, description: 'shorter ranged communication device.', category: "item" },
  { name: 'Comlink (long range)', cost: 200, rarity: 1 , quantity: 2, description: "for when you need to call your off world ''buddy'' ", category: "item" },

  // toxins and poisons
  { name: 'Synthetic Standard Strenght Neurotoxin (1 doese)', cost: 50, rarity: 6 , quantity: 2, description: 'a simple toxin for a not so simple time', category: "item" },
  { name: 'Synthetic Standard Anesthetic (1 dose)', cost: 35, rarity: 4 , quantity: 2, description: 'knock your foes out in style', category: "item" },
  { name: 'Synthetic Standard Neuroparalytic (1 dose)', cost: 75, rarity: 75 , quantity: 2, description: 'so you dont have to paralize your enemies with fright, just paralize them normally', category: "item" },
  
  // medical stuff
  { name: 'Bacta (liter)', cost: 20, rarity: 1 ,  quantity: 2,description: 'Provides Accelerated Healing Rates', category: "item" },
  { name: 'Bacta (full tank)', cost: 4000, rarity: 1 , quantity: 2, description: 'An Entire Tank of Bacta... Just for you?', category: "item" },
  { name: 'Emergency Medpac', cost: 100, rarity: 1 , quantity: 2, description: 'Perfect for all of your Dire Emergencies', category: "item" },
  { name: 'Medpac', cost: 400, rarity: 2 , quantity: 2, description: 'Great for injures and ouchies sustained in you extreme activities', category: "item" },
  { name: 'Stimpack', cost: 25, rarity: 0 , quantity: 2, description: 'Qucik healing for the Heat of battle', category: "item" },
  { name: 'Synthskin', cost: 10, rarity: 1 ,  quantity: 2, description: 'keep losing your skin? not your problem any longer! ', category: "item" },


  // Detection Devices
  { name: 'Electrobinoculars', cost: 250, rarity: 1 ,quantity: 2, description: 'These wonders allow for great magnification, and ability to peirce the darkest night', category: "item" },
  { name: 'General Purpose Scanner', cost: 500, rarity: 3 ,quantity: 2, description: 'locate lifeforms, see heat signatutes, detect metal, all within 1 kilometer!', category: "item" },
  { name: 'Hand Scanner', cost: 100, rarity: 2 ,quantity: 2, description: 'a perfect compact scanner, capable of many different detection programs', category: "item" },
  { name: 'Macrobinoculars', cost: 75, rarity: 2 ,quantity: 2, description: 'less advanced than the electrobionoculars, but for a much cheaper price!', category: "item" },
  { name: 'Scanner Goggles', cost: 150, rarity: 3 ,quantity: 2, description: 'light weight darkness pericer, as i like the call them' , category: "item"},
  { name: 'Surveillance Tagger', cost: 175, rarity: 4 ,quantity: 2, description: 'track you prey in style with these compact trackers', category: "item" },

  //Security
  { name: 'Binders', cost: 25, rarity: 2 , quantity: 2,description: 'perfect for locking up anybody you dont like', category: "item" },
  { name: 'Comm Jammer', cost: 400, rarity: 3 ,quantity: 2, description: 'with these fancy devices, you can stop any unwanted comm links' , category: "item"},
  { name: 'Comm Scrambler', cost: 1000, rarity: 5 ,quantity: 2, description: 'decrypt your personal communications effortlesly', category: "item" },
  { name: 'Disguise Kit', cost: 100, rarity: 4 ,quantity: 2, description: 'want to look like sombody else? now you can!', category: "item" },
  { name: 'Electronic Lock Breaker', cost: 1000, rarity: 5 , quantity: 2,description: 'for getting into places that seem to interesting to remain locked behind a door' , category: "item"},
  { name: 'Restraining Bolt', cost: 35, rarity: 2 , quantity: 2,description: 'got a feisty droid tailing you? use a Restraining Bolt!' , category: "item"},
  { name: 'Slicer Gear', cost: 500, rarity: 4 , quantity: 2,description: 'open up any computer with these amazing slicers. skills not included', category: "item" },
  
  //Survival
   { name: 'Crash Survival Kit', cost: 300, rarity: 2 ,quantity: 2, description: 'Filled with all the basic necesities for survival in harsh ecosystems', category: "item" },
   { name: 'Ration Pack', cost: 5, rarity: 1 ,quantity: 2, description: 'food, duh', category: "item" },
   { name: 'Breath Mask', cost: 25, rarity: 1 , quantity: 2,description: 'provides any type of air needed to survive', category: "item" },
   { name: 'Space Suit', cost: 100, rarity: 1 ,quantity: 2, description: 'suitable for short space walks. not ready for long term space journies', category: "item" },
   { name: 'Tent', cost: 100, rarity: 1 , quantity: 2,description: 'provides protection from the elements', category: "item" },
   { name: 'Thermal Cloak', cost: 200, rarity: 1 ,quantity: 2, description: 'a cloak to help with the extream heat and cold', category: "item" },

  // Tools
  { name: 'Backpack', cost: 50, rarity: 1 , quantity: 2,description: 'need more room? take this handy backpack' , category: "holds your gear for when you run out of room. "},
  { name: 'Climbing Gear', cost: 50, rarity: 2 ,quantity: 2, description: 'ascend to places you cant reach yourself', category: "comes with a synthrope line, and 4 suction pads that can afix to any surface" },
  { name: 'Datapad', cost: 75, rarity: 1 , quantity: 2,description: 'item discription' , category: "usefull for storing and displaying information"},
  { name: 'Emergency Repair Patch', cost: 25, rarity: 1 ,quantity: 2, description: 'item discription', category: "quick and easy patch for any machine you have" },
  { name: 'Extra Reloads', cost: 25, rarity: 1 , quantity: 2,description: 'item discription', category: "extra packs for when you run out of ammo" },
  { name: 'Fusion Lantern', cost: 150, rarity: 2 , quantity: 2,description: 'item discription' , category: "item"},
  { name: 'Glow Rod', cost: 10, rarity: 1 , quantity: 2,description: 'item discription' , category: "item"},
  { name: 'Jet Pack', cost: 4500, rarity: 7 , quantity: 2,description: 'item discription' , category: "item"},
  { name: 'Tool Kit', cost: 350, rarity: 2 , quantity: 2,description: 'item discription', category: "item" },
  { name: 'Utility Belt', cost: 25, rarity: 1 ,quantity: 2, description: 'item discription', category: "item" },
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
    { name: 'Thermal Detonator', cost: 2000, rarity: 8, description: 'item description'},
    {name: 'Missle Tube (Launcher)', cost: 7500, rarity: 8, description: 'item description'}, 
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
    {name: 'Frag Grenade', cost: 50, rarity: 5, description: "", damage: 8, critRating: 2, encum: 1, range: "Short" },
    {name: 'Stun Grenade', cost: 75, rarity: 4, description: "", damage: 8, critRating: 0, encum: 1, range: 'Short' },
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