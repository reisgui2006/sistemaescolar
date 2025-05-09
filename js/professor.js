const API_URL_PROFESSOR = "https://school-system-spi.onrender.com/api/professores/";

const buttonProfessores = document.getElementById("listar-professores");
const listaProfessores = document.getElementById("professores-lista");

buttonProfessores.addEventListener("click", async () => {
    const api = await fetch(API_URL_PROFESSOR);
    const dados = await api.json();
    console.log(dados);

    listaProfessores.innerHTML = "<h2>Professores</h2>" + dados.map(professor => (
        `
        <div>
            <h3>Nome: ${professor.nome}</h3>
            <p>Idade: ${professor.idade}</p>
            <p>ID: ${professor.id}</p>
        </div>
        `
    )).join('');
});
