<<<<<<< HEAD
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
=======
const API_BASE = "http://localhost:3000";

async function carregarUsuarios() {
  try {
    const res = await fetch(`${API_BASE}/usuarios`);
    const usuarios = await res.json();
    const tbody = document.getElementById("lista-usuarios");
    tbody.innerHTML = "";

    usuarios.forEach((u) => {
      const tr = document.createElement("tr");
      tr.id = `usuario-${u.id}`;
      tr.innerHTML = `
      <td>${u.id}</td>
      <td id="nome-${u.id}">${u.nome}</td>
      <td id="email-${u.id}">${u.email}</td>
      <td class="acoes" id="acoes-${u.id}">
        <button onclick="editarUsuario(${u.id}, '${u.nome}', '${u.email}')">Editar</button>
        <button onclick="removerUsuario(${u.id})">Remover</button>
      </td>
    `;
    
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Erro ao carregar usuários:", err);
  }
}

function editarUsuario(id, nome, email) {
  const nomeTd = document.getElementById(`nome-${id}`);
  const emailTd = document.getElementById(`email-${id}`);
  const acoesTd = document.getElementById(`acoes-${id}`);

  nomeTd.innerHTML = `<input type="text" id="edit-nome-${id}" value="${nome}">`;
  emailTd.innerHTML = `<input type="email" id="edit-email-${id}" value="${email}">`;
  acoesTd.innerHTML = `
    <button onclick="salvarEdicaoUsuario(${id})">Salvar</button>
    <button onclick="cancelarEdicaoUsuario(${id}, '${nome}', '${email}')">Cancelar</button>
  `;
}

async function salvarEdicaoUsuario(id) {
  const nome = document.getElementById(`edit-nome-${id}`).value;
  const email = document.getElementById(`edit-email-${id}`).value;

  try {
    await fetch(`${API_BASE}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    });
    carregarUsuarios();
  } catch (err) {
    alert("Erro ao editar usuário.");
  }
}

function cancelarEdicaoUsuario(id, nome, email) {
  const nomeTd = document.getElementById(`nome-${id}`);
  const emailTd = document.getElementById(`email-${id}`);
  const acoesTd = document.getElementById(`acoes-${id}`);

  nomeTd.textContent = nome;
  emailTd.textContent = email;
  acoesTd.innerHTML = `
    <button onclick="editarUsuario(${id}, '${nome}', '${email}')">Editar</button>
    <button onclick="removerUsuario(${id})">Remover</button>
  `;
}

async function carregarProdutos() {
  try {
    const res = await fetch(`${API_BASE}/produtos`);
    const produtos = await res.json();
    const tbody = document.getElementById("lista-produtos");
    tbody.innerHTML = "";

    produtos.forEach((p) => {
      const tr = document.createElement("tr");
      tr.id = `produto-${p.id}`;
      tr.innerHTML = `
      <td>${p.id}</td>
      <td id="produto-nome-${p.id}">${p.nome}</td>
      <td id="produto-preco-${p.id}">R$ ${parseFloat(p.preco).toFixed(2)}</td>
      <td id="produto-estoque-${p.id}">${p.estoque}</td>
      <td class="acoes" id="produto-acoes-${p.id}">
        <button onclick="editarProduto(${p.id}, '${p.nome}', '${parseFloat(p.preco).toFixed(2)}', ${p.estoque})">Editar</button>
        <button onclick="removerProduto(${p.id})">Remover</button>
      </td>
    `;
    
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
  }
}

function editarProduto(id, nome, preco, estoque) {
  document.getElementById(`produto-nome-${id}`).innerHTML = `<input type="text" id="edit-produto-nome-${id}" value="${nome}">`;
  document.getElementById(`produto-preco-${id}`).innerHTML = `<input type="text" id="edit-produto-preco-${id}" value="${preco.replace('.', ',')}" oninput="formatarPreco(this)">`;
  document.getElementById(`produto-estoque-${id}`).innerHTML = `<input type="number" id="edit-produto-estoque-${id}" value="${estoque}" onkeypress="somenteNumeros(event)">`;
  document.getElementById(`produto-acoes-${id}`).innerHTML = `
    <button onclick="salvarEdicaoProduto(${id})">Salvar</button>
    <button onclick="cancelarEdicaoProduto(${id}, '${nome}', '${preco}', ${estoque})">Cancelar</button>
  `;
}

async function salvarEdicaoProduto(id) {
  const nome = document.getElementById(`edit-produto-nome-${id}`).value;
  const preco = document.getElementById(`edit-produto-preco-${id}`).value.replace(",", ".");
  const estoque = parseInt(document.getElementById(`edit-produto-estoque-${id}`).value, 10);

  try {
    await fetch(`${API_BASE}/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, preco: parseFloat(preco), estoque }),
    });
    carregarProdutos();
  } catch (err) {
    alert("Erro ao editar produto.");
  }
}

function cancelarEdicaoProduto(id, nome, preco, estoque) {
  document.getElementById(`produto-nome-${id}`).textContent = nome;
  document.getElementById(`produto-preco-${id}`).textContent = `R$ ${parseFloat(preco).toFixed(2)}`;
  document.getElementById(`produto-estoque-${id}`).textContent = estoque;
  document.getElementById(`produto-acoes-${id}`).innerHTML = `
    <button onclick="editarProduto(${id}, '${nome}', '${preco}', ${estoque})">Editar</button>
    <button onclick="removerProduto(${id})">Remover</button>
  `;
}

async function removerUsuario(id) {
  if (confirm("Tem certeza que deseja remover este usuário?")) {
    await fetch(`${API_BASE}/usuarios/${id}`, { method: "DELETE" });
    carregarUsuarios();
  }
}

async function removerProduto(id) {
  if (confirm("Tem certeza que deseja remover este produto?")) {
    await fetch(`${API_BASE}/produtos/${id}`, { method: "DELETE" });
    carregarProdutos();
  }
}

function formatarPreco(input) {
  let valor = input.value.replace(/\D/g, "");
  valor = (parseInt(valor || "0", 10) / 100).toFixed(2);
  input.value = valor.replace(".", ",");
}

function somenteNumeros(event) {
  const key = event.key;
  if (!/[0-9]/.test(key)) {
    event.preventDefault();
  }
}

async function salvarProduto(event) {
  event.preventDefault();
  const nome = document.getElementById("produto-nome").value;
  const preco = document.getElementById("produto-preco").value.replace(",", ".");
  const estoque = parseInt(document.getElementById("produto-estoque").value, 10);

  const id = localStorage.getItem("editProdutoId");
  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_BASE}/produtos/${id}` : `${API_BASE}/produtos`;

  try {
    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, preco: parseFloat(preco), estoque }),
    });
    localStorage.removeItem("editProdutoId");
    window.location.href = "index.html";
  } catch (err) {
    alert("Erro ao salvar produto.");
  }
}

async function preencherFormularioProduto() {
  const id = localStorage.getItem("editProdutoId");
  if (!id) return;
  const res = await fetch(`${API_BASE}/produtos/${id}`);
  const produto = await res.json();

  document.getElementById("produto-nome").value = produto.nome;
  document.getElementById("produto-preco").value = produto.preco.toFixed(2).replace(".", ",");
  document.getElementById("produto-estoque").value = produto.estoque;
}

async function salvarUsuario(event) {
  event.preventDefault();
  const nome = document.getElementById("usuario-nome").value;
  const email = document.getElementById("usuario-email").value;
  const senha = document.getElementById("usuario-senha").value;

  const id = localStorage.getItem("editUsuarioId");
  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_BASE}/usuarios/${id}` : `${API_BASE}/usuarios`;

  try {
    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });
    localStorage.removeItem("editUsuarioId");
    window.location.href = "index.html";
  } catch (err) {
    alert("Erro ao salvar usuário.");
  }
}

async function preencherFormularioUsuario() {
  const id = localStorage.getItem("editUsuarioId");
  if (!id) return;
  const res = await fetch(`${API_BASE}/usuarios/${id}`);
  const usuario = await res.json();

  document.getElementById("usuario-nome").value = usuario.nome;
  document.getElementById("usuario-email").value = usuario.email;
  document.getElementById("usuario-senha").value = usuario.senha;
}
>>>>>>> main
