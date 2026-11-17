// Alto contraste e tamanho da fonte (carregado em todas as páginas)
var pagina = document.getElementById("pagina");
var contraste = false;
var tamanho = 100;

function trocarContraste() {
  if (contraste == false) {
    contraste = true;
    pagina.className = "alto-contraste";
    document.getElementById("btn-contraste").innerHTML = "Alto contraste: ligado";
  } else {
    contraste = false;
    pagina.className = "";
    document.getElementById("btn-contraste").innerHTML = "Alto contraste: desligado";
  }
}

function mudarFonte(passo) {
  var novo = tamanho + passo;
  if (novo >= 100 && novo <= 125) {
    tamanho = novo;
    pagina.style.fontSize = tamanho + "%";
  }
}

document.getElementById("btn-contraste").addEventListener("click", trocarContraste);
document.getElementById("btn-menos").addEventListener("click", function () { mudarFonte(-12); });
document.getElementById("btn-mais").addEventListener("click", function () { mudarFonte(12); });
