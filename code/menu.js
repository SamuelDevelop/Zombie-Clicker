import { createGenericHeader } from "./view/header.js";
import * as localStorage from "./controll/localStorage.js";
import * as telasLaterais from "./view/telasLaterais.js";
import * as filter from "./controll/filter.js";

function startPage(){
    createGenericHeader();
    loadPage();
}

startPage();

function loadPage(){
    const opcoesEl = document.querySelector(".options");

    let string = 
    `
        <img class="option" src="../images/iu/porco.webp">
        <button id="btnLoja" class="option" id="alterna-menu">
            <i class="fa-solid fa-gun"></i>
        </button>
        <button id="btnMetas" class="option">
            <i class="fa-solid fa-bullseye"></i>
        </button>
        <button id="btnStars" class="option">
            <i class="fa-solid fa-star"></i>
        </button>
        <button id="btnTrofeus" class="option">
            <i class="fa-solid fa-trophy"></i>
        </button>
        <button class="option" onclick="window.location = 'game.html'">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `

    opcoesEl.innerHTML = string;

    const allOptionsEl = document.querySelectorAll(".option");

    allOptionsEl.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("aparecer");
        }, index * 200);
    });

    let btnLoja = document.getElementById("btnLoja");
    let btnMetas = document.getElementById("btnMetas");
    let btnStars = document.getElementById("btnStars");
    let btnTrofeus = document.getElementById("btnTrofeus");

    let botoes = [btnLoja, btnMetas, btnStars, btnTrofeus];
    let ids = ["btnLoja", "btnMetas", "btnStars", "btnTrofeus"];

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", async ()=>{
            await abrirTelaLateral(ids[i]);
        });   
    }
}

async function abrirTelaLateral(id){
    const opcoesEl = document.querySelector(".options");
    const conteudoEl = document.querySelector(".conteudo");

    conteudoEl.innerHTML = await telasLaterais.mostrarTela(id);
    conteudoEl.classList.add("aparecer");
    opcoesEl.classList.add("recuado");

    let btnFechar = document.querySelector(".btnFechar");

    btnFechar.addEventListener("click", ()=>{
        fecharTelaLateral();
    });
}

function fecharTelaLateral(){
    const opcoesEl = document.querySelector(".options");
    const conteudoEl = document.querySelector(".conteudo");

    conteudoEl.innerHTML = "";

    conteudoEl.classList.remove("aparecer");
    opcoesEl.classList.remove("recuado");
}

async function comprarArma(item){
    
    let playerData = localStorage.getDados();
    let arma = await filter.getGunById(item);

    if(playerData.clicks >= arma.price){
        playerData.clicks -= arma.price;
        playerData.armasDesbloqueadas.push(arma.id);
        localStorage.saveDados(playerData);
        abrirTelaLateral("btnLoja");
    }
    else{
        console.log("dá pra comprar não fi");
    }
}

globalThis.comprarArma = comprarArma;

async function equiparArma(item){
    let playerData = localStorage.getDados();
    let arma = await filter.getGunById(item);

    if(playerData.armasDesbloqueadas.includes(arma.id)){
        playerData.armaAtual = arma.id;
        playerData.aumentoClicks = arma.clicksReward;
        playerData.danoAtual = arma.damage;
        localStorage.saveDados(playerData);
        abrirTelaLateral("btnLoja");
    }
}

globalThis.equiparArma = equiparArma;