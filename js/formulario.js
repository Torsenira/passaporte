// Validação do formulário: mensagens na própria página, sem alert()
var campos = ["nome", "email", "escola", "papel", "mensagem"];

// Mostra ou limpa a mensagem de erro de um campo. Devolve 1 se houve erro e 0 se está certo.
function validarCampo(id, valido, mensagem) {
  var campo = document.getElementById(id);
  var erro = document.getElementById("erro-" + id);
  if (valido) {
    campo.style.borderColor = "";
    erro.innerHTML = "";
    return 0;
  }
  campo.style.borderColor = "#ff0000";
  erro.innerHTML = mensagem;
  return 1;
}

function enviar() {
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var escola = document.getElementById("escola").value;
  var papel = document.getElementById("papel").value;
  var mensagem = document.getElementById("mensagem").value;
  var erros = 0;

  erros = erros + validarCampo("nome", nome.length >= 3, "Digite seu nome (mínimo 3 letras).");
  erros = erros + validarCampo("email", email.indexOf("@") > 0 && email.lastIndexOf(".") > email.indexOf("@") + 1, "Digite um e-mail válido, como nome@escola.com.");
  erros = erros + validarCampo("escola", escola.length >= 3, "Informe o nome da escola ou da rede.");
  erros = erros + validarCampo("papel", papel != "", "Escolha a sua função.");
  erros = erros + validarCampo("mensagem", mensagem.length >= 10, "Escreva pelo menos 10 caracteres.");

  var status = document.getElementById("status-form");
  if (erros > 0) {
    status.innerHTML = `<p class="msg errado">Corrija ${erros} campo(s) e envie de novo.</p>`;
  } else {
    status.innerHTML = `<p class="msg certo">Obrigado! Recebemos o seu interesse (simulação: nenhum dado foi enviado).</p>`;
    for (var i = 0; i < campos.length; i++) {
      document.getElementById(campos[i]).value = "";
    }
  }
}

document.getElementById("enviar").addEventListener("click", enviar);
