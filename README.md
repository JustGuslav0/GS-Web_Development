# Global Solution - Formulário SkillShift

## 👥 Integrantes

- **Gustavo Almeida Ferreira** – RM566980
- **Lucas de Oliveira Miranda Caetano** – RM568036
- **Sofia Souza Rodrigues** – RM566708

---

## 📌 Sobre o Projeto

Formulário interativo de inscrição para o programa **SkillShift**, desenvolvido para a Global Solution 2025 com tema "O Futuro do Trabalho".

O formulário permite que usuários se cadastrem informando nome, CPF, e-mail, habilidades e área de interesse profissional.

---

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla - sem frameworks)

---

## 📂 Estrutura de Arquivos

```
├── index.html       # Página principal
├── style.css        # Estilização
├── main.js          # Validações e lógica
└── README.md        # Documentação
```

---

## 🚀 Como Executar

1. Clone o repositório
2. Abra o arquivo `index.html` no navegador
3. Pronto! Não precisa instalar nada.

---

## ⚙️ Funcionalidades

### Campos do Formulário
- **Nome Completo**: apenas letras e espaços
- **CPF**: 11 números ou formato 123.456.789-10
- **E-mail**: deve ter @ e terminar com .com
- **Habilidades**: adicionar pelo menos 1 da lista
- **Tipo de Interesse**: escolher entre Trabalho Remoto, IA, Sustentabilidade ou Upskilling

### Validações
Todas as validações são feitas em JavaScript puro:
- Nome não pode ter números
- CPF precisa ter 11 dígitos
- E-mail precisa ser válido (@dominio.com)
- Pelo menos 1 habilidade deve ser adicionada
- Um tipo de interesse deve ser selecionado

---

## 💻 Requisitos Implementados

✅ **Funções**: `validarFormulario()`, `checarCPF()`, `checarEmail()`, `exibirFeedback()`, `adicionarHabilidade()`

✅ **Vetores**: `vetorHabilidades` (armazena habilidades) e `vetorErros` (armazena erros de validação)

✅ **Manipulação de Strings**: validações de formato, conversão para minúsculas, formatação de CPF e nome

✅ **Manipulação DOM**: todos os acessos usando `document.getElementById()`

---

## 📝 Instruções de Uso

1. Preencha todos os campos obrigatórios
2. Selecione e adicione suas habilidades (clique em "Adicionar Habilidade")
3. Escolha seu tipo de interesse
4. Clique em "Enviar Inscrição"
5. Veja o resultado na área de validação/resumo

---

## ⚠️ Observações

- Não há persistência de dados (conforme especificado no enunciado)
- Projeto desenvolvido com JavaScript puro, sem bibliotecas externas
- Foco em validação front-end

---

**FIAP - Engenharia de Software - 2025**
