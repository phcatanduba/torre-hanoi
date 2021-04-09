let discos = 0;
const movimentos = document.querySelector(".movimentos");
const button = document.querySelector(".iniciar");
const reiniciar = document.querySelector(".recarregar");
let largura = discos * 20;
let arrayDiscos = [];
let torreA = document.querySelector(".a");
let torreB = document.querySelector(".b");
let torreC = document.querySelector(".c");
let posicao = 0;
let diminui = 4;
let count = 0;
let firstTime = true;

reiniciar.addEventListener("click", function(){
    if(firstTime === false) {
        location.reload();
    }
    firstTime = false;
});

button.addEventListener("click", function () {

    discos = parseInt(prompt("Quantos discos na Torre? \n\n NAO RECOMENDADO QUE QUANTIDADE DE DISCO SEJA MAIOR QUE 10"));
    largura = discos * 20;
    arrayDiscos = [];
    torreA = document.querySelector(".a");
    torreB = document.querySelector(".b");
    torreC = document.querySelector(".c");
    posicao = 0;
    diminui = 4;
    count = 0;

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
    jogar(discos, torreA, torreB, torreC);
});

let ms = 100;
function mover(origem, destino) {
    count++;
    movimentos.innerHTML =`${count}`
    ms = ms + ms*2;
    let guarda = origem.removeChild(origem.children[origem.childElementCount - 1]);
    for(let i = 0; i < 900000000; i++){
    };
    destino.appendChild(guarda);
};

function jogar(discos, origem, destino, trabalho){
    if(discos > 0) {
        jogar(discos - 1, origem, trabalho, destino);
        setTimeout(function(){
            mover(origem, destino);
        }, ms);
        jogar(discos - 1, trabalho, destino, origem);
    }
};
