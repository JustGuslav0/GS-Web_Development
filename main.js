// Vetor para armazenar as habilidades adicionadas pelo usuário
let vetorHabilidades = [];

/**
 * Função para adicionar uma habilidade selecionada ao vetor
 */
function adicionarHabilidade() {
    // Obtém a habilidade selecionada via radio button
    let habilidadeSelecionada = document.querySelector('input[name="habilidade"]:checked');
    
    // Valida se alguma habilidade foi selecionada
    if (habilidadeSelecionada == null) {
        alert('Você precisa selecionar uma habilidade antes de adicionar!');
        return; 
    }
    
    let valorHabilidade = habilidadeSelecionada.value;

    // Verifica se a habilidade já foi adicionada ao vetor
    if (vetorHabilidades.includes(valorHabilidade)) {
        alert('Essa habilidade já foi adicionada!');
        return; 
    }

    // Adiciona a habilidade ao vetor
    vetorHabilidades.push(valorHabilidade);
    
    // Atualiza a exibição da lista de habilidades no DOM usando document.getElementById
    let divLista = document.getElementById('lista_habilidades');
    divLista.innerHTML = ''; 
    
    for (let i = 0; i < vetorHabilidades.length; i++) {
        divLista.innerHTML += vetorHabilidades[i] + '<br>';
    }
    
    // Desmarca o radio button após adicionar
    habilidadeSelecionada.checked = false;
}

// Associa o botão de adicionar à função
let botaoAplicar = document.getElementById('aplicar');
botaoAplicar.onclick = adicionarHabilidade;

/**
 * Função principal de validação do formulário
 * Coordena todas as validações e exibe o feedback
 */
function validarFormulario() {
    // Vetor para armazenar mensagens de erro
    let vetorErros = [];
    
    // Lê todos os valores dos campos usando document.getElementById
    let nome = document.getElementById('nome').value;
    let cpfInput = document.getElementById('cpf').value;
    let emailInput = document.getElementById('email').value;
    let interesseSelecionado = document.querySelector('input[name="tipo_interesse"]:checked');

    // Objeto para armazenar dados validados com sucesso
    let dadosSucesso = {};

    // Validação do Nome (manipulação de strings)
    // Verifica se o nome contém apenas letras e espaços
    const caracteresPermitidos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ áéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ';
    let nomeValido = true;
    
    if (nome === '') {
        nomeValido = false;
    } else {
        for (let i = 0; i < nome.length; i++) {
            if (caracteresPermitidos.indexOf(nome[i]) === -1) {
                nomeValido = false;
                break;
            }
        }
    }
    
    if (nomeValido) {
        dadosSucesso.nome = nome;
    } else {
        vetorErros.push('Nome: Inválido (só letras e espaços)');
    }

    // Validação do CPF usando função dedicada
    let cpfValidado = checarCPF(cpfInput);
    if (cpfValidado) {
        dadosSucesso.cpf = cpfValidado;
    } else {
        vetorErros.push('CPF: Inválido (use 11 números ou 123.456.789-10)');
    }

    // Validação do Email usando função dedicada
    let emailValidado = checarEmail(emailInput);
    if (emailValidado) {
        dadosSucesso.email = emailValidado;
    } else {
        vetorErros.push('E-mail: Inválido (deve ser @dominio.com)');
    }

    // Validação do vetor de habilidades
    if (vetorHabilidades.length > 0) {
        dadosSucesso.habilidades = vetorHabilidades;
    } else {
        vetorErros.push('Habilidades: Você deve adicionar pelo menos uma');
    }

    // Validação do tipo de interesse
    if (interesseSelecionado != null) {
        dadosSucesso.interesse = interesseSelecionado.value;
    } else {
        vetorErros.push('Interesse: Você deve escolher uma opção');
    }

    // Chama a função de feedback passando o vetor de erros e dados de sucesso
    if (vetorErros.length === 0) {
        exibirFeedback([], dadosSucesso);
    } else {
        exibirFeedback(vetorErros, null);
    }
}

/**
 * Função dedicada para validar e normalizar o CPF
 * Retorna o CPF limpo (somente números) ou null se inválido
 */
function checarCPF(cpfInput) {
    // Manipulação de strings: verifica caracteres permitidos
    const caracteresPermitidos = '0123456789.-';
    
    if (cpfInput === '') {
        return null;
    }

    // Verifica se contém apenas caracteres válidos (números, ponto e traço)
    for (let i = 0; i < cpfInput.length; i++) {
        if (caracteresPermitidos.indexOf(cpfInput[i]) === -1) {
            return null;
        }
    }

    // Remove pontos e traço, mantendo apenas números
    let cpfLimpo = '';
    const numeros = '0123456789';
    for (let i = 0; i < cpfInput.length; i++) {
        if (numeros.indexOf(cpfInput[i]) !== -1) {
            cpfLimpo += cpfInput[i];
        }
    }

    // Verifica se tem exatamente 11 dígitos
    if (cpfLimpo.length !== 11) {
        return null;
    }
    
    // Se tem pontos ou traço, verifica se está no formato correto: 123.456.789-10
    if (cpfInput.indexOf('.') !== -1 || cpfInput.indexOf('-') !== -1) {
        // Formato esperado: XXX.XXX.XXX-XX (14 caracteres)
        if (cpfInput.length !== 14) {
            return null;
        }
        // Verifica posições dos pontos e traço
        if (cpfInput[3] !== '.' || cpfInput[7] !== '.' || cpfInput[11] !== '-') {
            return null;
        }
    }

    return cpfLimpo;
}

/**
 * Função dedicada para validar e normalizar o e-mail
 * Retorna o e-mail em minúsculas ou null se inválido
 */
function checarEmail(emailInput) {
    // Manipulação de strings: converte para minúsculas
    let emailLower = emailInput.toLowerCase();
    
    // Verifica se está vazio
    if (emailLower === '') {
        return null;
    }
    
    // Verifica presença do @
    let posicaoArroba = emailLower.indexOf('@');
    if (posicaoArroba === -1 || posicaoArroba === 0) {
        return null;
    }
    
    // Verifica presença do ponto após o @
    let posicaoPonto = emailLower.lastIndexOf('.');
    if (posicaoPonto === -1 || posicaoArroba > posicaoPonto) {
        return null;
    }
    
    // Verifica se o ponto vem logo após o @ (ex: teste@.com é inválido)
    if (posicaoPonto === posicaoArroba + 1) {
        return null;
    }
    
    // Verifica se termina com .com
    let finalEmail = emailLower.substring(emailLower.length - 4);
    if (finalEmail !== '.com') {
        return null;
    }

    return emailLower;
}

/**
 * Função para exibir o feedback de validação e resumo
 * Recebe o vetor de erros e os dados validados
 */
function exibirFeedback(vetorErros, dadosSucesso) {
    // Acessa as áreas de feedback usando document.getElementById
    let areaFeedback = document.getElementById('area_feedback');
    let areaResumo = document.getElementById('area_resumo');
    
    // Limpa o conteúdo anterior
    areaFeedback.innerHTML = '';
    areaResumo.innerHTML = '';

    // Se houver erros, exibe cada um deles na área de feedback
    if (vetorErros && vetorErros.length > 0) {
        for (let i = 0; i < vetorErros.length; i++) {
            areaFeedback.innerHTML += '<span class="erro">' + vetorErros[i] + '</span><br>';
        }
    } 
    // Se não houver erros, exibe mensagem de sucesso e resumo
    else if (dadosSucesso) {
        areaFeedback.innerHTML = '<span class="ok">Formulário validado com sucesso!</span>';
        
        // Formata o nome: primeira letra de cada palavra em maiúscula (manipulação de strings)
        let nomeFormatado = "";
        let capitalizarProxima = true;
        let nomeLower = dadosSucesso.nome.toLowerCase();
        
        for (let i = 0; i < nomeLower.length; i++) {
            let letra = nomeLower[i];
            if (letra === ' ') {
                capitalizarProxima = true;
                nomeFormatado += letra;
            } else if (capitalizarProxima === true) {
                nomeFormatado += letra.toUpperCase();
                capitalizarProxima = false;
            } else {
                nomeFormatado += letra;
            }
        }

        // Formata o CPF: 123.456.789-10 (manipulação de strings)
        let cpfFormatado = "";
        for (let i = 0; i < dadosSucesso.cpf.length; i++) {
            cpfFormatado += dadosSucesso.cpf[i];
            if (i === 2 || i === 5) { 
                cpfFormatado += '.'; 
            }
            if (i === 8) { 
                cpfFormatado += '-'; 
            }
        }

        // Exibe o resumo na área de resumo usando document.getElementById
        areaResumo.innerHTML = `
            <strong>Nome:</strong> ${nomeFormatado}<br>
            <strong>CPF:</strong> ${cpfFormatado}<br>
            <strong>E-mail:</strong> ${dadosSucesso.email}<br>
            <strong>Interesse:</strong> ${dadosSucesso.interesse}<br>
            <strong>Habilidades:</strong> ${dadosSucesso.habilidades.join(', ')}
        `;
    }
}