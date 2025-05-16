(() => {
    const API_URL_ALUNOS = "https://school-system-spi.onrender.com/api/alunos/";
  
    const buttonAlunos = document.getElementById("listar-alunos");
    const listaAlunos = document.getElementById("alunos-lista");
  
    let listaVisivel = false;
  
    async function listarAlunos() {
      try {
        const response = await fetch(API_URL_ALUNOS);
        const dados = await response.json();
  
        if (dados && dados.length > 0) {
          listaAlunos.innerHTML = "<h2>Alunos</h2>" + dados.map(aluno => (
            `
            <div style="border:1px solid #ccc; padding:10px; margin:10px 0; border-radius:5px;">
              <h3>👤 Nome: ${aluno.nome}</h3>
              <p>🎂 Data de Nascimento: ${aluno.data_nascimento || 'Não informado'}</p>
              <p>📘 Nota 1: ${aluno.nota_primeiro_semestre ?? 'N/A'} | Nota 2: ${aluno.nota_segundo_semestre ?? 'N/A'}</p>
              <p>🧮 Média Final: ${aluno.media_final ?? 'N/A'}</p>
              <p>🏷️ Turma ID: ${aluno.turma_id ?? 'Não atribuída'}</p>
              <button class="excluir-btn" data-id="${aluno.id}">Excluir</button>
            </div>
            `
          )).join('');
        } else {
          listaAlunos.innerHTML = "<p>Não há alunos cadastrados.</p>";
        }
  
        listaAlunos.style.display = "block";
        listaVisivel = true;
        buttonAlunos.textContent = "Ocultar Alunos";
  
        adicionarEventosBotoes();
  
      } catch (error) {
        console.error('Erro ao buscar os alunos:', error);
        listaAlunos.innerHTML = "<p style='color: red;'>❌ Erro ao carregar os alunos.</p>";
        listaAlunos.style.display = "block";
        listaVisivel = true;
        buttonAlunos.textContent = "Ocultar Alunos";
      }
    }
  
    function adicionarEventosBotoes() {
      // Não existe mais botões editar, então removido
  
      const botoesExcluir = document.querySelectorAll(".excluir-btn");
  
      botoesExcluir.forEach(botao => {
        botao.addEventListener("click", async () => {
          const alunoId = botao.getAttribute("data-id");
          if (confirm("Tem certeza que deseja excluir este aluno?")) {
            try {
              const response = await fetch(`${API_URL_ALUNOS}${alunoId}`, { method: "DELETE" });
              if (response.ok) {
                alert("Aluno excluído com sucesso!");
                listarAlunos();
              } else {
                alert("Erro ao excluir o aluno.");
              }
            } catch (error) {
              alert("Erro na conexão com a API.");
              console.error(error);
            }
          }
        });
      });
    }
  
    buttonAlunos.addEventListener("click", () => {
      if (listaVisivel) {
        listaAlunos.style.display = "none";
        listaVisivel = false;
        buttonAlunos.textContent = "Listar Alunos";
      } else {
        listarAlunos();
      }
    });
  
    window.listarAlunos = listarAlunos;
  })();
  