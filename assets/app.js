
var postQuizz = {
    title: '',
    data: {
        perguntas: [],
        niveis: []
    }
};
var contPerg = 1;
var contNivel = 1;
var myToken;
var resposta;
var objeto = {};

//login

function realizaLogin() {
    var email = document.querySelector(".email");
    var senha = document.querySelector(".senha");
    var usuario = {
        email: email.value,
        password: senha.value
    }

    verificaLogin(email, senha, usuario);
}

function verificaLogin(email, senha, usuario) {

    if(email.value == "" || senha.value == "") {
        alert("Preencha os campos com seu Email e Senha!");
    } else {
        entrar = document.querySelector(".entrar");
        entrar.setAttribute("disabled", "disabled");
        var req = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users',usuario);
        req.then(chamaMeusQuizzes).catch(usuarioIncorreto);
    }
}

function usuarioIncorreto() {
    alert("Email ou Senha incorretos...");
    entrar.removeAttribute("disabled");
}

//Clique retorno Meus Quizzes

/* PRECISO ALTERAR AS TROCAS DE TELA PRA TOGGLE DE CLASS COM DISPLAY NONE / FLEX
var header = document.querySelector("header");
header.setAttribute('onclick', retornoMeusQuizzes());

function retornoMeusQuizzes(){

}*/
//Meus Quizzes

function chamaMeusQuizzes(response) {
    var fecha = document.querySelector("#login");
    fecha.style.display = "none";
    
    var abre = document.querySelector("#meusQuizzes");
    abre.style.display = "flex";

    myToken = {headers: {"User-Token":response.data.token}};
    var req = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes', myToken);
    req.then(addCardsQuizzes);
}

//Criando Quizz

function abreCriandoQuizz() {

    var fecha = document.querySelector("#meusQuizzes");
    fecha.style.display = "none";
    
    var abre = document.querySelector("#criandoQuizz");
    abre.style.display = "flex";

    addCardPergunta();
    addCardNivel();
}

function addPergunta() {

    postQuizz.title = document.getElementById("title").value;


    objeto = {
        titulo: document.querySelector(".aPergunta").value,
        opcoes: [
            {img: document.querySelector(".img1").value,
            text: document.querySelector(".resp1").value},
            {img: document.querySelector(".img2").value,
            text: document.querySelector(".resp2").value},
            {img: document.querySelector(".img3").value,
            text: document.querySelector(".resp3").value},
            {img: document.querySelector(".img4").value,
            text: document.querySelector(".resp4").value}]
    }

    postQuizz.data.perguntas.push(objeto);

    addCardPergunta();
}

function addCardPergunta() {
    var perguntas = document.getElementById("perguntas");
    var div = document.createElement("div");
    div.classList.add("pergunta");
    div.innerHTML = "<h2>Pergunta " + contPerg + "</h2><input class='aPergunta' type='text' placeholder='Digite a pergunta'><div class='respostas'><input class='correto resp1' type='text' placeholder='Digite a resposta correta'><input class='correto img1' type='text' placeholder='Link para a imagem correta'><input class='incorreto resp2' type='text' placeholder='Digite a resposta errada 1'><input class='incorreto img2' type='text' placeholder='Link para a imagem errada 1'><input class='incorreto resp3' type='text' placeholder='Digite a resposta errada 2'><input class='incorreto img3' type='text' placeholder='Link para a imagem errada 2'><input class='incorreto resp4' type='text' placeholder='Digite a resposta errada 3'><input class='incorreto img4' type='text' placeholder='Link para a imagem errada 3'></div>";

    perguntas.appendChild(div);
    contPerg++;
}

function addCardNivel() {

    var niveis = document.getElementById("niveis");
    var div = document.createElement("div");
    div.classList.add("nivel");
    div.innerHTML = "<h2>Nível " + contNivel + "</h2><div><input type='text' class='min' placeholder='% Mínima de Acerto do nível'><input type='text' class='max' placeholder='% Máxima de Acerto do nível'></div><div><input type='text' class='tituloNiv' placeholder='Títudo do nível'><input type='text' class='imgNivel' placeholder='Link da imagem do nível'><input type='text' class='descricao' placeholder='Descrição do nível'></div>";

    niveis.appendChild(div);
    contNivel++;
}

function addNivel() {


    objeto = {
        min: document.querySelector(".min").value,
        max: document.querySelector(".max").value,
        titulo: document.querySelector(".tituloNiv").value,
        descricao: document.querySelector(".descricao").value,
        img: document.querySelector(".imgNivel").value,
    }

    postQuizz.data.niveis.push(objeto);

    addCardNivel();
}

//ZERAR OS CAMPOS QUANDO CLICAR EM PUBLICAR
//quando clica em publicar
function criandoQuizz() {

    var req = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes', postQuizz, myToken);
    req.then(voltaMeusQuizzes);
}

//MeusQuizzes

function voltaMeusQuizzes() {

    var fecha = document.querySelector("#criandoQuizz");
    fecha.style.display = "none";
    
    meusQuizzes = document.querySelector("#meusQuizzes");
    meusQuizzes.style.display = "flex";

    var req = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes', myToken);
    req.then(addCardsQuizzes);
}

//Refatorar e criar renders!! (pra geral msm)
function addCardsQuizzes(response) {
    limpaQuizzes();
    var container = document.querySelector(".containerQuizzes");
    var quizzes = [];
    
    for(i = 0; i < response.data.length; i++) {
        var title = response.data[i].title;
        var id = response.data[i].id;
        
        var cardQuizz = document.createElement("div");
        
        cardQuizz.innerHTML = "<div class='quizzesCriados' onclick='abreQuizz(this, "+ id +")'><p>" + title + "</p></div>";

        quizzes.push(cardQuizz);
        container.appendChild(quizzes[i]);
    }

    resposta = response.data;
}
function limpaQuizzes() {

    var container = document.querySelector(".containerQuizzes");
    container.innerHTML = "<div class='containerQuizzes'><div class='novoQuizz'><span>Novo Quizz</span><div onclick='abreCriandoQuizz()' class='addQuizz'><ion-icon name='add-circle-outline'></ion-icon></div></div></div>"
    
}

function abreQuizz(elemento, id) {

    for(i = 0; i < resposta.length; i++) {
        if (id == resposta[i].id){
            executaQuizz(resposta[i]);
        }
    }
}

var telaQuizz = document.querySelector("#perguntaQuizz");
function executaQuizz(quizz) {
    meusQuizzes.style.display = "none";
    telaQuizz.style.display = "flex";

    renderQuizz(quizz);
}

function renderQuizz(quizz) {
    console.log(quizz);
    contPerg = 1;

    var pergData = quizz.data.perguntas;
    var perguntaDiv = document.createElement("div");
    perguntaDiv.classList.add("perguntaQuizz");
    
    perguntaDiv.innerHTML += "<h2>" + quizz.title + "</h2>";

    for(i = 0; i < pergData.length; i++){
        perguntaDiv.innerHTML += "<p>" + contPerg + ". " + pergData[i].titulo + "</p>";

        for(j = 0; j < pergData[i].opcoes.length; j++) {

            perguntaDiv.innerHTML += "<div class='alternativas'><div class='alternativa' onclick='resposta(this)'><img src=" + pergData[i].opcoes[j].img + "><p>" + pergData[i].opcoes[j].text + "</p></div>";
            
            telaQuizz.appendChild(perguntaDiv);
        }
        
    }
    console.log(perguntaDiv);  
}
