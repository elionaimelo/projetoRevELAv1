'use strict';

// A ordem das palavras deve ser de cima para baixo, da esquerda para a direita
var palavras = ['Nariz', 'Boca', 'Laringe', 'Pulmão', 'Faringe',
                'Traquéia', 'Brônquios', 'Diafragma'];
                var qtdPalavrasSelecionadas = 0;

var topoDrop = 132;
var esquerdaDrop = 0;

var topoDrag = 440;
var esquerdaDrag = 0;

palavras.forEach(function(palavra, i) {
    addDroppable(palavra, i);
});

randomSort(palavras).forEach(function(palavra, i) {
    addDraggable(palavra, i);
});

console.log(palavras);

function addDroppable(palavra, i) {
    if (i === palavras.length / 2) {
        topoDrop = 145;
        esquerdaDrop = 530;
    }

    var container = $('<div></div>')
                      .addClass('drop')
                      .data('palavra', slug(palavra))
                      .css({ top: topoDrop + 'px', left: esquerdaDrop + 'px' })
                      .droppable({
                          drop: addPalavra,
                          hoverClass: 'hovered'
                      });

    $('#quadro').append(container);

    topoDrop += 65;
}

function addPalavra(evento, ui) {
    var palavrasCoincidem = $(this).data('palavra') === ui.draggable.data('palavra');
    if (palavrasCoincidem) {
        ui.draggable.draggable('option', { disabled: true, revert: false })
                    .position({of: $(this), my: 'left top', at: 'left top'});
        $(this).droppable({disabled: true});
        $(".ui-draggable-disabled").addClass( "correta" );
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

    var container = $('<div></div>')
                      .addClass('drag')
                      .text(palavra)
                      .data('palavra', slug(palavra))
                      .css({ top: topoDrag + 'px', left: esquerdaDrag + 'px' })
                      .draggable({
                          cursor: 'move',
                          revert: true
                      });

    $('#quadro').append(container);

    esquerdaDrag += container.width();
}


function verificarResposta() {
    if (qtdPalavrasSelecionadas == 8) {
        var mensagem = 'Parabéns, você concluiu a atividade!';
        $('#mensagem h2').text(mensagem);
        $('#mensagem').show();
    }

}


$("#reload").click(function () {
  window.location.reload();
});
