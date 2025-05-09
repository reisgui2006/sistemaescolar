const API_URL_ALUNOS = "https://school-system-spi.onrender.com/api/alunos/";

const buttonAlunos = document.getElementById("listar-alunos");
const listaAlunos = document.getElementById("alunos-lista");

buttonAlunos.addEventListener("click", async () => {
    const api = await fetch(API_URL_ALUNOS);
    const dados = await api.json();
    console.log(dados);

    listaAlunos.innerHTML = "<h2>Alunos</h2>" + dados.map(aluno => (
        `
        <div>
            <h3>Turma ID: ${aluno.id}</h3>
            <p>Nome do Aluno: ${aluno.nome}</p>
            <p>Idade: ${aluno.idade}</p>
            <p>Media: ${aluno.media_final}</p>
        </div>
        `
    )).join('');
});
