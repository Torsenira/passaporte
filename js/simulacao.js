// Simulação do Passaporte (HTML, CSS e JavaScript puros)
// Cada missão é um objeto; o array "missoes" tem 10 registros e a página é montada com innerHTML.
var missoes = [
  { local: "escola", pt: "Você não entendeu a tarefa. O que diz ao professor?", es: "No entendiste la tarea. ¿Qué le dices al profesor?", opcoes: ["Não.", "Professor, pode repetir, por favor?", "Tchau!"], certa: 1 },
  { local: "escola", pt: "Você precisa ir ao banheiro.", es: "Necesitas ir al baño.", opcoes: ["Posso ir ao banheiro, por favor?", "Eu quero um pão.", "Bom dia, professor."], certa: 0 },
  { local: "escola", pt: "Um colega pergunta: Qual é o seu nome?", es: "Un compañero pregunta: ¿Cómo te llamas?", opcoes: ["Está chovendo.", "Até amanhã.", "Meu nome é Luna. E o seu?"], certa: 2 },
  { local: "padaria", pt: "Você quer comprar um pão.", es: "Quieres comprar un pan.", opcoes: ["Quero um pão, por favor.", "Estou com dor.", "Onde fica a escola?"], certa: 0 },
  { local: "mercado", pt: "Você quer saber o preço do leite.", es: "Quieres saber el precio de la leche.", opcoes: ["Que horas são?", "Quanto custa o leite?", "Posso ir ao banheiro?"], certa: 1 },
  { local: "mercado", pt: "O caixa pergunta: Quer sacola?", es: "El cajero pregunta: ¿Quiere bolsa?", opcoes: ["Boa noite.", "Meu nome é Luna.", "Sim, quero. Obrigada."], certa: 2 },
  { local: "posto", pt: "Você está com dor de cabeça.", es: "Tienes dolor de cabeza.", opcoes: ["Estou com dor de cabeça.", "Estou com fome.", "Quero um pão."], certa: 0 },
  { local: "posto", pt: "Você precisa marcar uma consulta.", es: "Necesitas pedir una cita médica.", opcoes: ["Tenho um lápis.", "Onde fica o ônibus?", "Quero marcar uma consulta, por favor."], certa: 2 },
  { local: "onibus", pt: "Você quer saber se o ônibus passa pela escola.", es: "Quieres saber si el autobús pasa por la escuela.", opcoes: ["Esse ônibus passa pela escola?", "Eu gosto de azul.", "Quero um pão."], certa: 0 },
  { local: "onibus", pt: "Você quer descer na próxima parada.", es: "Quieres bajar en la próxima parada.", opcoes: ["Quanto custa o leite?", "Quero descer na próxima parada.", "Bom dia, professor."], certa: 1 }
];

var lugares = [
  { id: "escola", icone: "🏫", pt: "Escola", es: "Escuela" },
  { id: "padaria", icone: "🥖", pt: "Padaria", es: "Panadería" },
  { id: "mercado", icone: "🛒", pt: "Mercado", es: "Mercado" },
  { id: "posto", icone: "🏥", pt: "Posto de saúde", es: "Centro de salud" },
  { id: "onibus", icone: "🚌", pt: "Ônibus", es: "Autobús" }
];

var textoPt = { mapa: "Mapa do bairro", escolha: "Escolha um lugar para ver as missões.", passaporte: "Seu passaporte", missao: "Missão", voltar: "Voltar às missões", certo: "Muito bem! Você ganhou um carimbo.", errado: "Quase! Tente outra opção.", de: " de 10 carimbos.", completo: " Passaporte completo, parabéns!", reiniciar: "Recomeçar" };
var textoEs = { mapa: "Mapa del barrio", escolha: "Elige un lugar para ver las misiones.", passaporte: "Tu pasaporte", missao: "Misión", voltar: "Volver a las misiones", certo: "¡Muy bien! Ganaste un sello.", errado: "¡Casi! Prueba otra opción.", de: " de 10 sellos.", completo: " ¡Pasaporte completo, felicidades!", reiniciar: "Reiniciar" };

var t = textoPt;       // textos do idioma atual
var idioma = "pt";
var lugarAtual = "";
var feitas = [];       // feitas[i] é true quando a missão i foi concluída
for (var n = 0; n < missoes.length; n++) {
  feitas[n] = false;
}

function nomeDoLugar(id) {
  for (var i = 0; i < lugares.length; i++) {
    if (lugares[i].id == id) {
      if (idioma == "pt") {
        return lugares[i].pt;
      }
      return lugares[i].es;
    }
  }
  return "";
}

function desenharIdiomas() {
  var classePt = "botao sec";
  var classeEs = "botao sec";
  if (idioma == "pt") {
    classePt = "botao sec ativo";
  } else {
    classeEs = "botao sec ativo";
  }
  document.getElementById("idiomas").innerHTML =
    `<button type="button" class="${classePt}" onclick="trocarIdioma('pt')">Português</button> ` +
    `<button type="button" class="${classeEs}" onclick="trocarIdioma('es')">Español</button>`;
}

function desenharMapa() {
  var html = "";
  for (var i = 0; i < lugares.length; i++) {
    var classe = "lugar";
    if (lugares[i].id == lugarAtual) {
      classe = "lugar ativo";
    }
    html = html + `<button type="button" class="${classe}" onclick="escolherLugar('${lugares[i].id}')"><span class="ico">${lugares[i].icone}</span><span>${nomeDoLugar(lugares[i].id)}</span></button>`;
  }
  document.getElementById("mapa").innerHTML = html;
}

function escolherLugar(id) {
  lugarAtual = id;
  desenharMapa();
  listarMissoes();
}

function listarMissoes() {
  var painel = document.getElementById("painel");
  if (lugarAtual == "") {
    painel.innerHTML = t.escolha;
    return;
  }
  var html = `<p class="situacao">${nomeDoLugar(lugarAtual)}</p><ul class="lista-missoes">`;
  for (var i = 0; i < missoes.length; i++) {
    if (missoes[i].local == lugarAtual) {
      var marca = "";
      if (feitas[i] == true) {
        marca = " ✓";
      }
      html = html + `<li><button type="button" class="botao sec" onclick="abrirMissao(${i})">${t.missao} ${i + 1}${marca}</button></li>`;
    }
  }
  painel.innerHTML = html + "</ul>";
}

function abrirMissao(i) {
  var m = missoes[i];
  var situacao = m.pt;
  if (idioma == "es") {
    situacao = m.es;
  }
  var html = `<p class="situacao">${t.missao} ${i + 1}: ${situacao}</p><div class="opcoes">`;
  for (var k = 0; k < m.opcoes.length; k++) {
    html = html + `<button type="button" class="botao sec" onclick="responder(${i}, ${k})">${m.opcoes[k]}</button>`;
  }
  html = html + `</div><div id="retorno"></div><button type="button" class="botao" onclick="listarMissoes()">${t.voltar}</button>`;
  document.getElementById("painel").innerHTML = html;
}

function responder(i, k) {
  var retorno = document.getElementById("retorno");
  if (k == missoes[i].certa) {
    feitas[i] = true;
    retorno.innerHTML = `<p class="msg certo">${t.certo}</p>`;
    desenharPassaporte();
  } else {
    retorno.innerHTML = `<p class="msg errado">${t.errado}</p>`;
  }
}

function desenharPassaporte() {
  var html = "";
  var total = 0;
  for (var i = 0; i < missoes.length; i++) {
    if (feitas[i] == true) {
      total = total + 1;
      html = html + `<div class="carimbo ok">✓ ${nomeDoLugar(missoes[i].local)}</div>`;
    } else {
      html = html + `<div class="carimbo">${i + 1}</div>`;
    }
  }
  var fim = "";
  if (total == missoes.length) {
    fim = t.completo;
  }
  document.getElementById("carimbos").innerHTML = html;
  document.getElementById("progresso").innerHTML = total + t.de + fim;
}

function trocarIdioma(novo) {
  idioma = novo;
  if (novo == "pt") {
    t = textoPt;
  } else {
    t = textoEs;
  }
  document.getElementById("titulo-mapa").innerHTML = t.mapa;
  document.getElementById("titulo-passaporte").innerHTML = t.passaporte;
  document.getElementById("reiniciar").innerHTML = t.reiniciar;
  desenharIdiomas();
  desenharMapa();
  listarMissoes();
  desenharPassaporte();
}

function reiniciar() {
  for (var i = 0; i < missoes.length; i++) {
    feitas[i] = false;
  }
  lugarAtual = "";
  trocarIdioma(idioma);
}

document.getElementById("reiniciar").addEventListener("click", reiniciar);
trocarIdioma("pt");
