import * as localStorage from "../controll/localStorage.js";
import * as drawGame from "../view/drawGame.js";

export class Player{
    constructor(){
        this.saveData = localStorage.getDados();
        this.vidaLocal = this.saveData.vidaAtual;
        drawGame.atualizarDadosJogador(this);
    }

    getVidaAtual(){
        return this.vidaLocal;
    }

    getClicks(){
        return this.saveData.clicks;
    }

    getInimigosDerrotados(){
        return this.saveData.zombiesMortos;
    }

    getDanoAtual(){
        return this.saveData.danoAtual;
    }

    somaClicks(){
        this.saveData.clicks += this.saveData.aumentoClicks;
        this.saveData.clicksTotais += this.saveData.aumentoClicks;
        localStorage.saveDados(this.saveData);
        drawGame.atualizarDadosJogador(this);
    }

    somaInimigosDerrotados(){
        this.saveData.zombiesMortos += 1;
        localStorage.saveDados(this.saveData);
        drawGame.atualizarDadosJogador(this);
    }

    sofrerDano(dano){
        this.vidaLocal -= dano;
        drawGame.atualizarDadosJogador(this);
    }
}