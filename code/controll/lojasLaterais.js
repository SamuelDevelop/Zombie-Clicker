
export async function configurarBotoes(id){
    
    if(id == "btnLoja"){
        await botoesLoja();
    }
}

async function botoesLoja() {
    const guns = await fetcher.getGuns();
    const gunsVec = guns.guns;

    gunsVec.forEach(gun => {
        
    });
}
