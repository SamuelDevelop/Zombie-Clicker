import * as functions from "./fetcher.js";

export async function getCharacterById(id) {
    const allCharacters = await functions.getCharacters();
    
    return allCharacters.characters.find(c => c.id === id);
}

export async function getEnemyById(id) {
    const allEnemies = await functions.getEnemies();
    
    return allEnemies.characters.find(e => e.id === id);
}

export async function getBossById(id) {
    const allBosses = await functions.getBosses();
    
    return allBosses.characters.find(b => b.id === id);
}

export async function getGunById(id) {
    const allGuns = await functions.getGuns();
    
    return allGuns.guns.find(g => g.id === id);
}