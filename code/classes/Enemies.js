import * as fetcher from "../controll/fetcher.js";
import * as localStorage from "../controll/localStorage.js";
import * as utils from "../controll/utils.js";
import * as draw from "../view/drawGame.js";

export class Enemies{
    constructor(Player){
        this.inimigoAtual = null;
        this.nome = null;
        this.temInimigoEmTela = false;
        this.player = Player;
    }

    async novoInimigo(){
        this.inimigoAtual = await this.getProxEnemy();
        this.nome = this.inimigoAtual.name;
        let fatorVida = utils.fatorDeVidaInimiga(this.player.getInimigosDerrotados());
        this.vida = Math.floor(this.inimigoAtual.vida * fatorVida);
        this.vidaInicial = this.vida;

        draw.loadInimigo(this.inimigoAtual);
        draw.atualizarDadosInimigo(this);

        this.temInimigoEmTela = true;
        this.setEventListener();
        
        draw.mudarModoBoss(this.inimigoAtual.boss);

    }

    getVidaAtual(){
        return this.vida
    }

    getVidaInicial(){
        return this.vidaInicial;
    }

    getNomeAtual(){
        return this.nome;
    }

    apagarInimigos(){
        this.inimigoAtual = null;
        this.temInimigoEmTela = false;
        draw.clearInimigo();
    }

    setEventListener(){
        const inimigoEl = document.querySelector(".enemyEl");
        inimigoEl.addEventListener("click", (event)=>{
            if(this.temInimigoEmTela){
                this.clique(event);

                inimigoEl.classList.add("dano");

                setTimeout(() => {
                    inimigoEl.classList.remove("dano");
                }, 100);
            }
        });
    }

    async clique(event){
        this.vida -= this.player.getDanoAtual();
        draw.mostrarNumeroClick(this.player.getDanoAtual(), "-", event);
        draw.atualizarDadosInimigo(this);
        this.player.somaClicks();

        if(this.vida <= 0){
            draw.addChatMensage(this.inimigoAtual.name, this.inimigoAtual.frase)
            await this.novoInimigo();
            this.player.somaInimigosDerrotados();
        }
    }

    async getProxEnemy(){
        const PLAYER_DATA = localStorage.getDados();
    
        if(PLAYER_DATA.zombiesMortos % 10 == 0 && PLAYER_DATA.zombiesMortos != 0){
            const BOSSES = await fetcher.getBosses();
            const BOSSES_VEC = BOSSES.bosses;
            let boss = utils.randomVec(BOSSES_VEC);
    
            return boss;
        } else {
            const INIMIGOS = await fetcher.getEnemies();
            const INIMIGOS_VEC = INIMIGOS.enemys;
            let inimigo = utils.randomVec(INIMIGOS_VEC);   
            
            return inimigo;
        }
    }
}