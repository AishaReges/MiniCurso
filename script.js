const imagem = document.querySelector('img');
const input = document.querySelector('input');
const button = document.querySelector('button');
const pontuacaoContainer = document.querySelector('.pontuacao-container');
const pontuacao = document.querySelector('#pontuacao');
const campoErro = document.querySelector('#campo-erro');

let pontos = 0;
let nomedoPersonagem;

gerarValorAleatorio = () => {
    return Math.floor(Math.random() * 671);
}

pegarPersonagem = () => {
    // pegando valor aleatorio
    let numeroAleatorio = gerarValorAleatorio();
    
    // comunicando com a api do rick and morty
    return fetch(`https://rickandmortyapi.com/api/character/${numeroAleatorio}`, {
        method:'GET',
        headers: {
            Accept: 'application/json',
            "Content-type": 'application/json'
        }
    }).then((response) => response.json()).then((data) =>{
        // colocando valores na imagem
        imagem.src = data.image;
        imagem.alt = data.name;
        nomedoPersonagem = data.name;
    });
}

jogar = () => {
    pegarPersonagem();
    pontuacaoContainer.style.display = 'flex';
    button.innerHTML = 'jogar';
    input.style.opacity = 1;
    // Faz com que todo o nome do pernagem fique minusculo
    nomedoPersonagem = nomedoPersonagem.toLowerCase();
    let nomeDigitado = input.value.toLowerCase();

    if(nomedoPersonagem == nomeDigitado){
        pontos = pontos+1;
    }else{
        campoErro.innerHTML = `Você errou. O nome era ${nomedoPersonagem}`;
    }

    pontuacao.innerHTML = pontos;
    input.value = '';
}

button.onclick = jogar;
