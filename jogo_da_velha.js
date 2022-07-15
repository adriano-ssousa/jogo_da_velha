var rodada = 1; //variavel para controle de rodada
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;            //são as matrizes  que vão controlar todo o jogo a partir da marcação de ponto na coordenada
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;


$(document).ready( function(){

  $('#btn_iniciar_jogo').click( function(){
    
    //valida a digitação dos apelidos dos jogadores 1 e 2
    if($('#entrada_apelido_jogador_1').val() ==""){
      alert('Apelido do jogador 1 não foi preenchido');
      return false
    }
    if($('#entrada_apelido_jogador_2').val() ==""){
      alert('Apelido do jogador 2 não foi preenchido');
      return false
    }

   /*  alert($('#entrada_apelido_jogador_1').val());   "alert" apenas para testar se as entradas dos jogadores estavam sendo recuperadas
    alert($('#entrada_apelido_jogador_2').val()); */

    //exibir os apelidos abaixo das imagens
    $('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
    $('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());

    //controla visualização das div
    $('#pagina_inicial').hide();
    $('#palco_jogo').show();

  })

  $('.jogada').click( function(){
    /* alert('teste'); */     // realizando teste

    var id_campo_clicado = this.id;  /* o this faz referência ao elemento do contexto do click  */
    $('#'+id_campo_clicado).off();  // faz com que a aplicação recupere o id e desabilite a função de clique no campo
    jogada(id_campo_clicado);  //mostra a coordenada do campo clicado com base no elemento do contexto
  
  });

  function jogada(id){
    var icone = "";
    var ponto = 0;

    if((rodada % 2) == 1){
      /* alert('é a vez do jogador 1'); */
      ponto = -1;
      icone = 'url("imagens/marcacao_1.png")';
  }else{
    /* alert('è a vez do jogador 2'); */
    ponto = 1;
    icone = 'url("imagens/marcacao_2.png")'
  }

  /* alert(rodada); */  //dá um alerta da rodada
  rodada++;  

  $('#'+id).css('background-image',icone);   /* insere os icone de "x" e "o" na figura quando clicado */
  
  /* alert(id); */

  var linha_coluna = id.split('-'); //trunca a linha e coluna, separando as informações

  matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;  // o primeiro é a informacao da linha e o segundo é a informação da coluna, por fim é atribuido o ponto

  verifica_combinacao();

  console.log(matriz_jogo); //imprime informação no console, durante a inspeção da pagina

  /* alert(linha_coluna[0]);
  alert(linha_coluna[1]); */
}

function verifica_combinacao(){

  //verificar pontos na horizontal
  var pontos = 0;
  for (var i = 1; i <= 3; i++){
    pontos = pontos + matriz_jogo['a'][i];
  }
  ganhador(pontos);

  pontos = 0; //zerar os pontos, para poder verificar os pontos da segunda linha
  for (var i = 1; i <= 3; i++){
    pontos = pontos + matriz_jogo['b'][i];
  }
  ganhador(pontos);
 /*  alert(pontos); */

  pontos = 0; //zerar os pontos, para poder verificar os pontos da segunda linha
  for (var i = 1; i <= 3; i++){
    pontos = pontos + matriz_jogo['c'][i];
  }
  ganhador(pontos);

  //verificar pontos na vertical
  for(var l = 1; l <= 3; l++){
    pontos = 0;   //pontos tem que ser zerados a cada iteração

    pontos += matriz_jogo['a'][l];
    pontos += matriz_jogo['b'][l];
    pontos += matriz_jogo['c'][l];

    ganhador(pontos);
  }

  //verificar pontos na diagonal
  pontos = 0
  pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
  ganhador(pontos);

  pontos = 0
  pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
  ganhador(pontos)
}
  function ganhador(pontos){
    if(pontos == -3){
      var nome_jogador_1 = $('#entrada_apelido_jogador_1').val();
      alert(nome_jogador_1 + ' é o vencedor');
      $('.jogada').off(); //remover a possibilidade de capturar o evento click depois do jogo finalizado

    } else if(pontos == 3){
      var nome_jogador_2 = $('#entrada_apelido_jogador_1').val();
      alert(nome_jogador_2 + ' é o vencedor');
      $('.jogada').off();
    }
  }
  
});