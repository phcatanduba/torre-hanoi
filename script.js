const discos = parseInt(prompt("Quantos discos na Torre?"));
const largura = discos * 20;
let arrayDiscos = [];
let torreA = document.querySelector(".a");
let torreB = document.querySelector(".b");
let torreC = document.querySelector(".c");
let posicao = 0;
let diminui = 4;

for(let i = 0; i < discos; i++) {
    torreA.innerHTML += `
                            <div class="disco d${i}">

                            </div>`;
    let estiloDisco = document.querySelector(`.d${i}`);
    estiloDisco.style.bottom =  `${posicao}px`;
    posicao += 20;
    estiloDisco.style.width  =  `${largura - diminui}px`;
    arrayDiscos.push(estiloDisco);
    diminui += largura / discos;
};

let ms = 1000;
function mover(origem, destino) {
    ms = ms + ms;
    let guarda = origem.removeChild(origem.children[origem.childElementCount - 1]);
    destino.appendChild(guarda);
};


function jogar(discos, origem, destino, trabalho){
    if(discos > 0) {
        jogar(discos - 1, origem, trabalho, destino);
        setTimeout(function(){mover(origem, destino)}, ms);
        jogar(discos - 1, trabalho, destino, origem);
    }
};

jogar(discos, torreA, torreB, torreC);
