let discos = 0;
const movimentos = document.querySelector(".movimentos");
const button = document.querySelector(".iniciar");
const reiniciar = document.querySelector(".recarregar");
let largura = discos * 20;
let arrayDiscos = [];
let torreA, torreB, torreC;
let posicao = 0;
let diminui = 4;
let counter = 0;
let lastmove = null;

let TorreProcessadaA = [];
let TorreProcessadaB = [];

let disco1;
reiniciar.addEventListener("click", () => location.reload());

let interval = null;

let intervalControl = 1000; // Altere o intervalo de jogadas aqui

button.addEventListener("click", function () {
  discos = parseInt(prompt("Quantos discos na Torre?"));
  largura = discos * 20;
  arrayDiscos = [];
  torreA = document.querySelector(".a");
  torreB = document.querySelector(".b");
  torreC = document.querySelector(".c");
  posicao = 0;
  diminui = 4;

  for (let i = 0; i < discos; i++) {
    torreA.innerHTML += `
                                <div class="disco d${i}">
    
                                </div>`;
    let estiloDisco = document.querySelector(`.d${i}`);
    estiloDisco.style.bottom = `${posicao}px`;
    posicao += 20;
    estiloDisco.style.width = `${largura - diminui}px`;
    arrayDiscos.push(estiloDisco);
    diminui += largura / discos;
  }
  disco1 = document.querySelector(`.d${discos - 1}`);

  interval = setInterval(jogar, intervalControl);
});

function jogar() {
  movimentos.innerHTML = counter;

  if (counter == 0) {
    if (discos % 2 !== 0) {
      torreA.removeChild(disco1);
      torreB.appendChild(disco1);
      lastmove = 2;
    } else {
      torreA.removeChild(disco1);
      torreC.appendChild(disco1);
      lastmove = 3;
    }
    updateMoves();
  }

  if (counter === 1) {
    setTimeout(move, intervalControl / 3);
  } else {
    move();
  }
}

function move() {
  if (torreB.children.length > discos) {
    clearInterval(interval);
    return;
  }

  updateMoves();

  if (lastmove === 1) {
    check(torreB, torreC);
    setTimeout(() => {
      if (discos % 2 !== 0) {
        torreA.removeChild(disco1);
        torreB.appendChild(disco1);
        lastmove = 2;
      } else {
        torreA.removeChild(disco1);
        torreC.appendChild(disco1);
        lastmove = 3;
      }
      updateMoves();
    }, intervalControl / 3);
  } else if (lastmove === 2) {
    check(torreA, torreC);

    setTimeout(() => {
      if (discos % 2 !== 0) {
        torreB.removeChild(disco1);
        torreC.appendChild(disco1);
        lastmove = 3;
      } else {
        torreB.removeChild(disco1);
        torreA.appendChild(disco1);
        lastmove = 1;
      }
      updateMoves();
    }, intervalControl / 3);
  } else {
    check(torreA, torreB);
    setTimeout(() => {
      if (discos % 2 !== 0) {
        torreC.removeChild(disco1);
        torreA.appendChild(disco1);
        lastmove = 1;
      } else {
        torreC.removeChild(disco1);
        torreB.appendChild(disco1);
        lastmove = 2;
      }
      updateMoves();
    }, intervalControl / 3);
  }
}

function check(a, b) {
  TorreProcessadaA = a.querySelectorAll(".disco");
  TorreProcessadaB = b.querySelectorAll(".disco");

  let topDiskA;
  let topDiskB;

  if (TorreProcessadaA[TorreProcessadaA.length - 1]) {
    topDiskA = TorreProcessadaA[TorreProcessadaA.length - 1];
  } else {
    if (TorreProcessadaB[TorreProcessadaB.length - 1]) {
      b.removeChild(TorreProcessadaB[TorreProcessadaB.length - 1]);
      a.appendChild(TorreProcessadaB[TorreProcessadaB.length - 1]);
      return;
    }
  }

  if (TorreProcessadaB[TorreProcessadaB.length - 1]) {
    topDiskB = TorreProcessadaB[TorreProcessadaB.length - 1];
  } else {
    if (TorreProcessadaA[TorreProcessadaA.length - 1]) {
      a.removeChild(TorreProcessadaA[TorreProcessadaA.length - 1]);
      b.appendChild(TorreProcessadaA[TorreProcessadaA.length - 1]);
      return;
    }
  }

  let topDiskANumber = topDiskA.classList.value.replace("disco d", "");
  let topDiskBNumber = topDiskB.classList.value.replace("disco d", "");

  if (topDiskANumber < topDiskBNumber) {
    b.removeChild(topDiskB);
    a.appendChild(topDiskB);
  } else {
    a.removeChild(topDiskA);
    b.appendChild(topDiskA);
  }

  TorreProcessadaA = [];
  TorreProcessadaB = [];
}

function updateMoves() {
  counter++;
  movimentos.innerHTML = counter;
}
