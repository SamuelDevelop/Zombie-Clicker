export function criarSave(nome, personagem){
    const PLAYER_DATA = {
        nickname: nome != "" ? nome : "jogador",
        personagem: personagem,
        clicks: 0,
        clicksTotais: 0,
        aumentoClicks: 1,
        danoAtual: 1,
        armaAtual: 0,
        vidaAtual: 100,
        zombiesMortos: 0,
        
        registroInimigos: [],
        armasDesbloqueadas: [0],
    }
    
    localStorage.setItem("ClickerData", JSON.stringify(PLAYER_DATA));
}

export function getDados(){    
    const raw = localStorage.getItem("ClickerData");
    if (raw === null) return null;

    try {
        return JSON.parse(raw);
    } catch (err) {
        console.error("Erro ao fazer parse do save:", err);
        return null;
    }
}

export function saveDados(dados){
    localStorage.setItem("ClickerData", JSON.stringify(dados));
}

export function deletarDados(){
    localStorage.removeItem("ClickerData");
    location.reload();
}