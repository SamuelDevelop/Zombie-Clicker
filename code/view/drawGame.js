import * as localStorage from "../controll/localStorage.js";
import * as filter from "../controll/filter.js";
import * as utils from "../controll/utils.js";

const TELA = document.querySelector(".conteudo-principal");

export async function apresentar(){
    const PLAYER_DATA = localStorage.getDados();
    
    const playerPers = await filter.getCharacterById(PLAYER_DATA.personagem);
    const playerImage = playerPers.image;
    
    let string = 
    `
        <section>
            <article class="part-game playerData"></article>
            <article class="part-game player">
                <img src="../${playerImage}">
            </article>
            <article class="part-game atualEnemy"></article>
            <article class="part-game atualEnemyData"></article>
        </section>

        <div class="number-counter-conteiner"></div>
        <div class="chat-conteiner"></div>
    `
    ;
    
    TELA.innerHTML = string;
}

export function loadInimigo(inimigo){
    const atualEnemyEl = document.querySelector(".atualEnemy");

    atualEnemyEl.innerHTML =
    `
        <img class="enemyEl" src="../${inimigo.sprite}">
    `;
}

export function clearInimigo(){
    const atualEnemyEl = document.querySelector(".atualEnemy");

    atualEnemyEl.innerHTML = 
    `
        <p><i class="fa-solid fa-skull-crossbones"></i> 
            Sem Algum Inimigo!
        <p>
    `;
}

export function atualizarDadosInimigo(inimigoControll){
    const enemyDataEl = document.querySelector(".atualEnemyData");
    const barraEl = criarBarra(inimigoControll.getVidaAtual(), inimigoControll.getVidaInicial());
    enemyDataEl.innerHTML = 
    `
        <h3>${inimigoControll.getNomeAtual()}</h3>
        ${barraEl}        
    `;
}

export function atualizarDadosJogador(player){
    const playerDataEl = document.querySelector(".playerData");

    playerDataEl.innerHTML = 
    `
        <p><i class="fa-solid fa-user"></i> <b>Você:</b></p>
        <p><i class="fa-solid fa-heart"></i> <b> ${player.getVidaAtual()}</b></p>
        <p><i class="fa-solid fa-arrow-pointer"></i>:${player.getClicks()}</p>
        <p><i class="fa-solid fa-skull"></i>:${player.getInimigosDerrotados()}</p>
    `
}

export function mudarModoBoss(boss){
    const body = document.body;
    const temaBoss = "images/iu/ground-red.svg";
    const temaPadrao = "images/iu/ground.svg"
    
    body.style.backgroundImage = `url("../${boss ? `${temaBoss}` : `${temaPadrao}`}")`;
}

export function mostrarNumeroClick(num, sinal = "+", evento){
    const conteiner = document.querySelector(".number-counter-conteiner");

    let numeroEl = document.createElement("p");
    numeroEl.innerHTML = `${sinal}${num}`;
    numeroEl.classList.add("number-counter");

    numeroEl.style.left = evento.pageX + utils.randomInt(10, 50) + "px";
    numeroEl.style.top = evento.pageY + utils.randomInt(10, 50) + "px";
    conteiner.appendChild(numeroEl);
    
    numeroEl.style.display = "block";
    numeroEl.style.opacity = 1;

    setTimeout(()=>{
        numeroEl.style.opacity = 0;
    }, 500);

    setTimeout(()=>{
        numeroEl.style.display = "none";
        numeroEl.remove();
    }, 600);
}

export function addChatMensage(autor, msg){
    const conteiner = document.querySelector(".chat-conteiner");

    let chatEl = document.createElement("p");
    chatEl.innerHTML = `<i class="fa-regular fa-message"></i> <span class="txt-yellow"><b>${autor}:</b></span> ${msg}`;
    chatEl.classList.add("chat");

    conteiner.appendChild(chatEl);
    
    chatEl.style.display = "block";
    chatEl.style.opacity = 1;

    setTimeout(()=>{
        chatEl.style.opacity = 0;
    }, 5000);

    setTimeout(()=>{
        chatEl.style.display = "none";
        chatEl.remove();
    }, 5100);
}

export function criarBarra(valorAtual, valorMax){

    let porcentagem = Math.floor((valorAtual / valorMax) * 100);

    if(porcentagem < 0) porcentagem = 0;
    if(porcentagem > 100) porcentagem = 100;

    return `
        <div class="barra-container">
            <div class="barra-preenchimento" style="width: ${porcentagem}%;">
            </div>
        </div>
    `;
}