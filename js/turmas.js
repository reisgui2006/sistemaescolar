const API_URL_TURMAS = "https://school-system-spi.onrender.com/api/turmas/"; // A URL para as turmas
const buttonTurmas = document.getElementById("listar-turmas"); // Botão para listar turmas
const listaTurmas = document.getElementById("turmas-lista"); // Div onde as turmas serão listadas

buttonTurmas.addEventListener("click", async () => {
    try {
        const response = await fetch(API_URL_TURMAS); // Fazendo a requisição à API
        const dados = await response.json(); // Convertendo a resposta em JSON
        
        if (!response.ok) {
            throw new Error(`Erro: ${dados.detail || "Erro desconhecido"}`); // Tratar erro na requisição
        }

        // Exibindo as turmas na página
        listaTurmas.innerHTML = "<h2>Turmas</h2>" + dados.map(turma => (
            `
            <div>
                <h3>Turma ID: ${turma.id}</h3>
                <p>Nome da Turma: ${turma.nome}</p>
                <p>Curso: ${turma.curso}</p>
                <p>Período: ${turma.periodo}</p>
            </div>
            `
        )).join('');
    } catch (error) {
        listaTurmas.innerHTML = `<p style="color: red;">❌ Erro ao carregar turmas: ${error.message}</p>`;
    }
});
