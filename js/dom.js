export function exibirTarefas(tarefas) {
    const listaTarefas = document.getElementById('listaTarefas');

    listaTarefas.innerHTML = '';

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.classList.add('container-tarefas');

        const statusClassMap = {
            "a fazer": "aFazer",
            "em andamento": "emAndamento",
            "concluída": "concluido"
        };
        const statusClasse =
            statusClassMap[tarefa.status.toLowerCase()] || "aFazer";

        const data = new Date(tarefa.createdAt);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        li.innerHTML = `
            <article class="article-tarefas">
                        <div class="article-info">
                            <div class="info-tarefa">
                                <h3 class="article-titulo">${tarefa.titulo}</h3>
                                <p class="article-descricao">${tarefa.descricao}</p>
                            </div>
                            <span class="status-tarefa ${statusClasse}">${tarefa.status}</span>
                        </div>

                        <div class="data-criacao">
                            <span><i class="fa-regular fa-calendar"></i> ${dataFormatada}</span>
                            <span><i class="fa-regular fa-clock"></i> ${horaFormatada}</span>
                        </div>

                        <div class="buttons-acoes">
                            <button class="editar" data-id="${tarefa.id}"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button class="excluir" data-id="${tarefa.id}"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                    </article>
        `;
        listaTarefas.appendChild(li);
    });
    atualizarContagem(tarefas);
}

export function dadosTarefa() {
    return {
        titulo: document.getElementById('idTitulo').value,
        descricao: document.getElementById('idDescricao').value,
        status: document.getElementById('idStatus').value || "pendente"
    };
}

function atualizarContagem(tarefas) {
    const divTarefas = document.querySelector('.div-tarefas button');
    const quantidade = tarefas.length;
    divTarefas.textContent = `${quantidade} ${quantidade === 1 ? 'tarefa' : 'tarefas'}`;
}

function filtrarTarefasPorStatus() {
    document.querySelectorAll(".filtro-status button").forEach(botao => {
        botao.addEventListener("click", () => {
            const statusSelecionado = botao.dataset.status;

            // remover ativo de todos
            document.querySelectorAll(".filtro-status button")
                .forEach(btn => btn.classList.remove("ativo"));

            // adicionar ativo ao clicado
            botao.classList.add("ativo");

            // Filtrar as tarefas visualmente
            const todasAsTarefas = document.querySelectorAll('#listaTarefas li');
            let tarefasVisiveis = 0;

            todasAsTarefas.forEach(tarefaLi => {
                const statusTarefa = tarefaLi.querySelector('.status-tarefa').textContent.toLowerCase();

                if (statusSelecionado === "todos") {
                    tarefaLi.style.display = 'block';
                    tarefasVisiveis++;
                } else if (statusTarefa === statusSelecionado.toLowerCase()) {
                    tarefaLi.style.display = 'block';
                    tarefasVisiveis++;
                } else {
                    tarefaLi.style.display = 'none';
                }
            });

            // Atualizar contagem
            const divTarefas = document.querySelector('.div-tarefas button');
            divTarefas.textContent = `${tarefasVisiveis} ${tarefasVisiveis === 1 ? 'tarefa' : 'tarefas'}`;
        });
    });
}

filtrarTarefasPorStatus();


