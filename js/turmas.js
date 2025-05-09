const API_URL_TURMAS = "https://school-system-spi.onrender.com/api/professores/";

const buttonTurmas = document.getElementById("listar-turmas");
const listaTurmas = document.getElementById("turmas-lista");

buttonTurmas.addEventListener("click", async () => {
    const api = await fetch(API_URL_TURMAS);
    const dados = await api.json();
    console.log(dados);

    listaTurmas.innerHTML = "<h2>Turmas</h2>" + dados.map(turma => (
        `
        <div>
            <h3>ID: ${turma.id}</h3>
            <p>Nome do Professor: ${turma.nome}</p>
            <p>Materia: ${turma.materia}</p>
        </div>
        `
    )).join('');
});
