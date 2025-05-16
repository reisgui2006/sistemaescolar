(() => {
    const modal = document.getElementById("myModal");
    const tituloModal = document.getElementById("modal-titulo");
    const form = document.getElementById("alunoForm");
    const btnFecharModal = document.querySelector(".close");
  
    document.getElementById("criar-aluno").addEventListener("click", () => {
      form.reset();
      form.alunoId.value = "";
      tituloModal.textContent = "Criar Aluno";
      modal.style.display = "block";
    });
  
    btnFecharModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const alunoId = form.alunoId.value.trim();
      const aluno = {
        nome: form.nome.value.trim(),
        data_nascimento: form.data_nascimento.value,
        nota_primeiro_semestre: parseFloat(form.nota1.value),
        nota_segundo_semestre: parseFloat(form.nota2.value),
        turma_id: parseInt(form.turma_id.value, 10),
      };
  
      if (!aluno.nome || !aluno.data_nascimento || isNaN(aluno.nota_primeiro_semestre) || isNaN(aluno.nota_segundo_semestre) || isNaN(aluno.turma_id)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
      }
  
      try {
        let url = "https://school-system-spi.onrender.com/api/alunos/";
        let method = "POST";
  
        if (alunoId) {
          url += alunoId;
          method = "PUT";
        }
  
        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aluno),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert("Erro: " + (errorData.detail || JSON.stringify(errorData)));
          return;
        }
  
        alert(`Aluno ${alunoId ? "editado" : "criado"} com sucesso!`);
        modal.style.display = "none";
        if (typeof window.listarAlunos === "function") {
          window.listarAlunos();
        }
      } catch (error) {
        alert("Erro ao conectar com a API.");
        console.error("Erro ao enviar dados:", error);
      }
    });
  })();
  