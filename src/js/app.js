"use strict";

// A ordem das palavras deve ser de cima para baixo, da esquerda para a direita
var palavras = [
  "Nariz",
  "Boca",
  "Laringe",
  "Pulmão",
  "Faringe",
  "Traquéia",
  "Brônquios",
  "Diafragma",
];
var qtdPalavrasSelecionadas = 0;

var topoDrop = 132;
var esquerdaDrop = 0;

var topoDrag = 440;
var esquerdaDrag = 0;

palavras.forEach(function (palavra, i) {
  addDroppable(palavra, i);
});

randomSort(palavras).forEach(function (palavra, i) {
  addDraggable(palavra, i);
});

// console.log(palavras);

function addDroppable(palavra, i) {
  if (i === palavras.length / 2) {
    topoDrop = 145;
    esquerdaDrop = 530;
  }

  var container = $("<div></div>")
    .addClass("drop")
    .data("palavra", slug(palavra))
    .css({ top: topoDrop + "px", left: esquerdaDrop + "px" })
    .droppable({
      drop: addPalavra,
      hoverClass: "hovered",
    });

  $("#quadro").append(container);

  topoDrop += 65;
}

function addPalavra(evento, ui) {
  var palavrasCoincidem =
    $(this).data("palavra") === ui.draggable.data("palavra");
  if (palavrasCoincidem) {
    ui.draggable
      .draggable("option", { disabled: true, revert: false })
      .position({ of: $(this), my: "left top", at: "left top" });
    $(this).droppable({ disabled: true });
    $(".ui-draggable-disabled").addClass("correta");
    qtdPalavrasSelecionadas++;
    console.log(qtdPalavrasSelecionadas);
    verificarResposta();
  }
}

function addDraggable(palavra, i) {
  if (i % 4 === 0) {
    topoDrag += 50;
    esquerdaDrag = 30;
  }

  var container = $("<div></div>")
    .addClass("drag")
    .text(palavra)
    .data("palavra", slug(palavra))
    .css({ top: topoDrag + "px", left: esquerdaDrag + "px" })
    .draggable({
      cursor: "move",
      revert: true,
    });

  $("#quadro").append(container);

  esquerdaDrag += container.width();
}

function verificarResposta() {
  if (qtdPalavrasSelecionadas == 8) {
    var mensagem = "Parabéns, você concluiu a atividade!";
    $("#mensagem h2").text(mensagem);
    $("#mensagem").show();
  }
}

$("#reload").click(function () {
  window.location.reload();
});

function getInputValue() {

  var acertos = 0;
  var erros = 0;
  var idPalavrasCorretas = [];
  var idPalavrasCorretasAux;
  var resp;

  var palas = [
    "1", //nariz
    "2",//boca
    "3", //Laringe
    "4", //Pulmão
    "5", //Faringe
    "6", //Traquéia
    "7", //Brônquios
    "8", //Diafragma
  ];

  var values = $("input[name='respostas[]']")
    .map(function () {
      return $(this).val();
    })
    .get();
    console.log(values);

    for (var i = 0; i < values.length; i++){
      if(values[i] === palas[i]){
        acertos++;
        idPalavrasCorretas = document.getElementsByName("respostas[]")[i];
        idPalavrasCorretasAux = idPalavrasCorretas.getAttribute("id");
        document.getElementById('pergunta'+idPalavrasCorretasAux.slice(-1)).style.display = "none";
      }else {
        erros++;
      }
     
    }

    

    if (acertos === 0) {
      resp = "Você não acertou nenhuma";
    }
    if (acertos === 1) {
      resp = "Você acertou uma";
    }
    if (acertos === 2) {
      resp = "Você acertou duas";
    }
    if (acertos === 3) {
      resp = "Você acertou três";
    }
    if (acertos === 4) {
      resp = "Você acertou quatro";
    }
    if (acertos === 5) {
      resp = "Você acertou cinco";
    }
    if (acertos === 6) {
      resp = "Você acertou seis";
    }
    if (acertos === 7) {
      resp = "Você acertou sete";
    }
    if (acertos === 8) {
      resp = "Você acertou todas! Parabéns!";
    }

    
    $("#resp p").text(resp);
    $("#resp").show();
}


