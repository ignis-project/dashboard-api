

function validarSenha() {

    var password = in_senha.value;

    if (password.length <= 6) {
        div_senha.innerHTML = "Senha Fraca"
        div_senha.style.color = "red"
    } else if (password.length <= 12) {
        div_senha.innerHTML = "Senha Média"
        div_senha.style.color = "#acaf00"
    } else {
        div_senha.innerHTML = "Senha Forte"
        div_senha.style.color = "green"
    }
    
}   

function entrar() {
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("/usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(resposta => {

        if (resposta.ok) {

            resposta.json().then(json => {

                sessionStorage.login_usuario_meuapp = json.email;
                sessionStorage.nome_usuario_meuapp = json.nome;

                window.location.href = 'permissao_total/grafico.html';
            });

        } else {

            console.log('Erro de login!');

            resposta.text().then(texto => {
                console.error(texto);
                finalizar_aguardar(texto);
            });
        }
    });

    return false;
}


function cadastrar_usuario() {
    
        var formulario = new URLSearchParams(new FormData(form_cadastro_usuario));
        fetch("/usuarios/cadastrar", {
            method: "POST",
            body: formulario
        }).then(function (response) {
            if(response.ok) {
                window.location.href = 'login.html'
            } else {
                console.log('Erro de cadastro');
                response.text().then(function (resposta) {
                    div_erro.innerHTML = resposta;
                });
            }
        });

        return false;
   
}


function cadastrar() {


    var formulario = new URLSearchParams(new FormData(form_cadastro));
    fetch("/clientes/cadastrar", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if(response.ok) {
            window.location.href = 'cadastro.html'
        } else {
            console.log('Erro de cadastro');
            response.text().then(function (resposta) {
                div_erro.innerHTML = resposta;
            });
        }
    });

    return false;
}