
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

//Meus Quizzes

function chamaMeusQuizzes(response) {
    var fecha = document.querySelector("#login");
    fecha.style.display = "none";
    
    var abre = document.querySelector("#meusQuizzes");
    abre.style.display = "flex";

    const myToken = {headers: {"User-Token":response.data.token}};
    var req = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes', myToken);
}

//Criando Quizz

function abreCriandoQuizz() {

    var fecha = document.querySelector("#meusQuizzes");
    fecha.style.display = "none";
    
    var abre = document.querySelector("#criandoQuizz");
    abre.style.display = "flex";
    criandoQuizz();
}

function criandoQuizz() {

    var title = document.getElementById("title");
    var tituloPerg = document.querySelector(".aPergunta");
    var imgResp = document.querySelector(".img");
    var textResp = document.querySelector(".resp");

    var min = document.querySelector(".min");
    var max = document.querySelector(".max");
    var tituloNivel = document.querySelector(".tituloNiv");
    var descricao = document.querySelector(".descricao");
    var imgNivel = document.querySelector(".imgNivel");
    
    postQuizz = {
        title: title.value,
        data: {
            perguntas:[
                {titulo: tituloPerg.value, 
                respostas: [{ 
                    img: imgResp.value,
                    text: textResp.value,
                    classe,}]}
            ], 
            //na hora de add perguntas, data.perguntas.push//

            niveis: [{
                min: min.value,
                max: max.value,
                titulo: tituloNivel.value,
                descricao: descricao.value,
                img: imgNivel.value}]
        }
    };

}