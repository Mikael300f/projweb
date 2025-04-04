window.addEventListener('DOMContentLoaded', async () => {
    await carregarProdutos();
    await carregarUsuarios();
});

async function carregarProdutos() {
    const tabela = document.querySelector('#produtosTable tbody');
    tabela.innerHTML = '';

    try {
        const res = await fetch('/api/produtos');
        const produtos = await res.json();

        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
                <td>${produto.estoque}</td>
            `;
            tabela.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

async function carregarUsuarios() {
    const tabela = document.querySelector('#usuariosTable tbody');
    tabela.innerHTML = '';

    try {
        const res = await fetch('/api/usuarios');
        const usuarios = await res.json();

        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
            `;
            tabela.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}