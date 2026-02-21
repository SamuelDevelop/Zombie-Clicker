import * as filter from "../controll/filter.js";
import * as localStorage from "../controll/localStorage.js";

export async function createGenericHeader(){
    const HEADER = document.querySelector("header");
    let image = "images/enemys/zombieMine.gif";
    const PLAYER_DATA = localStorage.getDados();

    if(PLAYER_DATA != null){
        const playerPers = await filter.getCharacterById(PLAYER_DATA.personagem);
        image = playerPers.image;        
    }

    HEADER.innerHTML = 
    `
        <div class="header-parte">
            <img onclick="window.location = 'index.html'" src="../${image}">
            <h1>Zombie Clicker</h1>
        </div>
    `;
}

export async function createGameHeader(){
    const HEADER = document.querySelector("header");
    let image = "images/enemys/zombieMine.gif";
    const PLAYER_DATA = localStorage.getDados();

    if(PLAYER_DATA != null){
        const playerPers = await filter.getCharacterById(PLAYER_DATA.personagem);
        image = playerPers.image;        
    }

    HEADER.innerHTML = 
    `
        <div class="header-parte">
            <img onclick="window.location = 'index.html'" src="../${image}">
            <h1>Zombie Clicker</h1>
        </div>
        <div class="header-parte">
            <button onclick="window.location = 'menu.html'">
                <i class="fa-solid fa-bag-shopping"></i>
            </button>   
        </div>
    `;
}

