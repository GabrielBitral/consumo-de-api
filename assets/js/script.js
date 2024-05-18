async function buscaEndereco (cep) {
    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';
    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro) {
            throw Error('CEP não existente!');
        }

        const campoLogradouro = document.getElementById('endereco');
        const campoCidade = document.getElementById('cidade');
        const campoEstado = document.getElementById('estado');
        const campoBairro = document.getElementById('bairro');

        campoCidade.value = consultaCepConvertida.localidade;
        campoLogradouro.value = consultaCepConvertida.logradouro;
        campoEstado.value = consultaCepConvertida.uf;
        campoBairro.value = consultaCepConvertida.bairro;
        console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

const campoCep = document.getElementById('cep');

campoCep.addEventListener('focusout', () => buscaEndereco(campoCep.value));

// let ceps = ['01001000', '01001001'];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));

// Promise.all(conjuntoCeps).then(respostas => console.log(respostas));