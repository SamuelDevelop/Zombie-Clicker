import * as fetcher from "../controll/fetcher.js"
import * as localStorage from "../controll/localStorage.js";

export async function mostrarTela(id){
    console.log(id);

    if(id == "btnLoja"){
        return await loadLoja();
    }
    else if(id == "btnMetas"){
        return await loadMetas();
    }
    else if(id == "btnStars"){
        return await loadStars();
    }
    else if(id == "btnTrofeus"){
        return await loadTrofeus();
    }
}

async function loadLoja() {
    const playerData = localStorage.getDados();
    const guns = await fetcher.getGuns();
    const gunsVec = guns.guns;

    let string = `
        <h1>Armas:</h1>
        <p>Total: <i class="fa-solid fa-arrow-pointer"></i> ${playerData.clicks}</p>
        <div class="armas-conteiner">
    `;

    gunsVec.forEach(gun => {
        string += 
        `
            <div class="arma-conteiner">
                <img src="../${gun.sprite}">
                <p> <i class="fa-regular fa-hand-back-fist"></i> ${gun.damage}</p>
        `

        if(playerData.armaAtual == gun.id){
            string += `
                <button>
                    Equipado
                </button>
            `;
        }
        else if(playerData.armasDesbloqueadas.includes(gun.id)){
            string += `
                <button onclick="equiparArma(${gun.id})">
                    Usar
                </button>
            `;
        }

        else{
            string += `
                <button onclick="comprarArma(${gun.id})">
                    <i class="fa-solid fa-arrow-pointer"></i> ${gun.price}
                </button>
            `;
        }

        string += "</div>";       
    });

    string += `
        </div>
        <button class="btnFechar">
            Fechar
        </button>
    `;

    return string;
}

async function loadMetas() {
    return `
    <h1><i class="fa-solid fa-triangle-exclamation"></i> Metas: Em Breve!</h1>   
        <button class="btnFechar">
            Fechar
        </button>
    `;
}

async function loadStars() {
    return `
    <h1><i class="fa-solid fa-triangle-exclamation"></i> Estrelas?: Em Breve!</h1>
    <button class="btnFechar">
        Fechar
    </button>
    `;
}

async function loadTrofeus() {
    return `
    <h1><i class="fa-solid fa-triangle-exclamation"></i> Conquistas: Em Breve!</h1>
    <button class="btnFechar">
        Fechar
    </button>
    `;
}