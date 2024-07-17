let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}
function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 100:");
}
exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector("input").value;//Usamos o value quando queremos limpar apenas o valor

    if (chute == numeroSecreto){
        exibirTextoNaTela("h1", "Acertou");
        let palavraTentativa = tentativas > 1 ? "tentativas":"tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p",mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");//para pegar o botão correto usar getElementById, como no html tem 2 botões, se não especificar ele pega o primeiro quando o código rodar
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela("p", "O número secreto é menor. Tente novamente!");
        }else{
            exibirTextoNaTela("p", "O número secreto é maior. Tente novamente!");   
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");//Sem o value é para limpar todo o campo do input
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
