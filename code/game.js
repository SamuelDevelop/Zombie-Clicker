import { createGameHeader } from "./view/header.js";
import * as loadGame from "./view/drawGame.js";
import { Enemies } from "./classes/Enemies.js"
import { Player } from "./classes/Player.js";

async function startPage(){
    createGameHeader();
    await loadPage();
}

await startPage();

async function loadPage(){
    await loadGame.apresentar();

    //já pode hatear o js?
    const PLAYER = new Player();

    const ENEMIES = new Enemies(PLAYER);
    await ENEMIES.novoInimigo(); 
    
}