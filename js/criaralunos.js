// Obter elementos necessários
const modal = document.getElementById("myModal");
const btnCriarAluno = document.getElementById("criar-aluno");
const btnFecharModal = document.getElementsByClassName("close")[0];

// Abrir o modal ao clicar no botão "Criar Aluno"
btnCriarAluno.onclick = function() {
    modal.style.display = "block";
}

// Fechar o modal ao clicar no "X"
btnFecharModal.onclick = function() {
    modal.style.display = "none";
}

// Fechar o modal se o usuário clicar fora da área do modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// API URL para criar o aluno
const API_URL_CRIAR_ALUNO = "https://school-system-spi.onrender.com/api/alunos/";

// Formulário e resposta
const form = document.getElementById("alunoForm");
const resposta = document.getElementById("resposta");

// Submissão do formulário
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("data_nascimento").value;
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const turmaId = parseInt(document.getElementById("turma_id").value);

    const aluno = {
        nome: nome,
        data_nascimento: dataNascimento,
        nota_primeiro_semestre: nota1,
        nota_segundo_semestre: nota2,
        turma_id: turmaId
    };

    try {
        const response = await fetch(API_URL_CRIAR_ALUNO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            resposta.innerHTML = `<p style="color: green;">✅ Aluno criado com sucesso!</p>`;
            form.reset();
            modal.style.display = "none"; // Fechar o modal após envio
            listarAlunos(); // Atualiza a lista de alunos após criar
        } else {
            resposta.innerHTML = `<p style="color: red;">❌ Erro: ${data.detail || JSON.stringify(data)}</p>`;
        }
    } catch (error) {
        resposta.innerHTML = `<p style="color: red;">❌ Erro ao conectar com a API.</p>`;
        console.error(error);
    }
});
  