import { atualizarTarefa, criarTarefa, excluirTarefa, getTarefas } from "./api.js";
import { dadosTarefa } from "./dom.js";

getTarefas();

function deletarTarefa() {
    document.addEventListener('click', async (event) => {
        const botaoExcluir = event.target.closest('button.excluir'); 
        if (botaoExcluir) {
            const id = botaoExcluir.dataset.id; 
            if (!id) return;

            try {
                await excluirTarefa(id); 
                Toastify({
                    text: "Tarefa excluída com sucesso!",
                    duration: 3000,
                    gravity: "top", // top ou bottom
                    position: "right", // left, center, right
                    backgroundColor: "linear-gradient(to right, #22c55e, #16a34a)",
                    stopOnFocus: true
                }).showToast();
                await getTarefas();
            } catch (error) {
                Toastify({
                    text: "Erro ao excluir a tarefa",
                    duration: 4000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #ef4444, #b91c1c)",
                    stopOnFocus: true
                }).showToast();
            }
        }
    });
}
deletarTarefa();

let tarefaAtualId = null;
function putTarefa() {

    const form = document.querySelector('.form-adicionar-tarefa');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const { titulo, descricao, status } = dadosTarefa();

        if (tarefaAtualId) {
            await atualizarTarefa(tarefaAtualId, { titulo, descricao, status });
            tarefaAtualId = null;
            Toastify({
                text: "Tarefa atualizada com sucesso!",
                duration: 3000,
                gravity: "top", // top ou bottom
                position: "right", // left, center, right
                backgroundColor: "linear-gradient(to right, #22c55e, #16a34a)",
                stopOnFocus: true
            }).showToast();
        } else {
            await criarTarefa(titulo, descricao, status);
            Toastify({
                text: "Tarefa criada com sucesso!",
                duration: 3000,
                gravity: "top", // top ou bottom
                position: "right", // left, center, right
                backgroundColor: "linear-gradient(to right, #22c55e, #16a34a)",
                stopOnFocus: true
            }).showToast();
        }
        form.reset();
        getTarefas();
    }); 
}
putTarefa();

function preencherFormulario() {
    document.addEventListener('click', (event) => {
        const botaoEditar = event.target.closest('button.editar');
        if (botaoEditar) {
            // Pega o id da tarefa clicada
            tarefaAtualId = botaoEditar.dataset.id;

            // Pega os valores da tarefa clicada no DOM
            const li = botaoEditar.closest('li');
            const titulo = li.querySelector('.article-titulo').textContent;
            const descricao = li.querySelector('.article-descricao').textContent;
            const status = li.querySelector('.status-tarefa').textContent.toLowerCase();

            // Preenche o formulário
            document.getElementById('idTitulo').value = titulo;
            document.getElementById('idDescricao').value = descricao;
            document.getElementById('idStatus').value = status;

            document.querySelector('.adicionar-tarefa').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

preencherFormulario();

function filtrarTarefas() {
    const inputFiltro = document.getElementById('filtroTarefas');

    inputFiltro.addEventListener('input', () => {
        const textoFiltro = inputFiltro.value.toLowerCase();
        const tarefas = document.querySelectorAll('#listaTarefas li');

        tarefas.forEach((tarefa) => {
            const titulo = tarefa
                .querySelector('.article-titulo')
                .textContent
                .toLowerCase();

            if (titulo.includes(textoFiltro)) {
                tarefa.style.display = 'block';
            } else {
                tarefa.style.display = 'none';
            }
        });
    });
}
filtrarTarefas();


// function postTarefa() {
//     const form = document.querySelector('.form-adicionar-tarefa');

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const { titulo, descricao, status } = dadosTarefa();
//         await criarTarefa(titulo, descricao, status);
//         alert('Tarefa criada com sucesso!');
//         getTarefas();

//         form.reset();
//     })
// }
// postTarefa();