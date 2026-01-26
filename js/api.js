import { exibirTarefas } from "./dom.js";

const API_URL = 'https://api-taskss.onrender.com/tarefas';

export async function getTarefas() {
    try {
        const resposta = await fetch(API_URL);
        
        if (!resposta.ok) {
            throw new Error(`Erro ao buscar as tarefas`);
        }
        const tarefas = await resposta.json();
        exibirTarefas(tarefas);
    } catch (error) {
        Toastify({
            text: "Não foi possível carregar as tarefas",
            duration: 4000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ef4444, #b91c1c)",
            stopOnFocus: true
        }).showToast();
    }
}

export async function criarTarefa(titulo, descricao, status) {
    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descricao, status })
        });
        if (!resposta.ok) {
            throw new Error('Erro ao adicionar a tarefa');
        }
        const novaTarefa = await resposta.json();
        return novaTarefa;
    } catch (error) {
        Toastify({
            text: "Erro ao adicionar a tarefa",
            duration: 4000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ef4444, #b91c1c)",
            stopOnFocus: true
        }).showToast();
    }
}

export async function excluirTarefa(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!resposta.ok) {
            throw new Error('Erro ao deletar a tarefa');
        }
    } catch (error) {
        Toastify({
            text: "Erro ao deletar a tarefa",
            duration: 4000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ef4444, #b91c1c)",
            stopOnFocus: true
        }).showToast();
    }
}

export async function atualizarTarefa(id, dados) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error('Erro ao atualizar a tarefa');
        }

        const tarefaAtualizada = await resposta.json();
        return tarefaAtualizada;

    } catch (error) {
        Toastify({
            text: "Erro ao atualizar a tarefa",
            duration: 4000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ef4444, #b91c1c)",
            stopOnFocus: true
        }).showToast();
    }
}






