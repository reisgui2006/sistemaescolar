const API_URL_ALUNOS = "https://school-system-spi.onrender.com/api/alunos/";

// Elementos HTML
const buttonAlunos = document.getElementById("listar-alunos");
const listaAlunos = document.getElementById("alunos-lista");

// Função para listar os alunos
async function listarAlunos() {
    try {
        const api = await fetch(API_URL_ALUNOS);
        const dados = await api.json();
        console.log(dados);

        // Verifica se a API retornou algum dado
        if (dados && dados.length > 0) {
            listaAlunos.innerHTML = "<h2>Alunos</h2>" + dados.map(aluno => (
                `
                <div>
                    <h3>Nome: ${aluno.nome}</h3>
                    <p>Idade: ${aluno.idade}</p>
                    <p>Média Final: ${aluno.media_final}</p>
                </div>
                `
            )).join('');
        } else {
            listaAlunos.innerHTML = "<p>Não há alunos cadastrados.</p>";
        }
    } catch (error) {
        console.error('Erro ao buscar os alunos:', error);
        listaAlunos.innerHTML = "<p style='color: red;'>❌ Erro ao carregar os alunos.</p>";
    }
}

// Chama a função para listar os alunos ao clicar no botão
buttonAlunos.addEventListener("click", listarAlunos);

// Chama a função para listar os alunos automaticamente ao carregar a página
document.addEventListener("DOMContentLoaded", listarAlunos);
