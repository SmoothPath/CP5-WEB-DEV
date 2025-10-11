import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001";

const Produto = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ id: null, nome: "", descricao: "", preco: "" });
  const [editar, setEditar] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);

  const handleSubmit = async () => {
    const produtoEnviar = {
      ...novoProduto,
      preco: parseFloat(novoProduto.preco),
    };

    if (!produtoEnviar.nome || !produtoEnviar.descricao || isNaN(produtoEnviar.preco)) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      if (editar) {
        await axios.put(`${API_URL}/produto/${produtoEnviar.id}`, produtoEnviar);
      } else {
        await axios.post(`${API_URL}/produto`, produtoEnviar);
      }

      setNovoProduto({ id: null, nome: "", descricao: "", preco: "" });
      setEditar(false);
      consultarProduto();
    } catch (error) {
      console.log("Erro ao salvar produto: ", error);
    }
  };

  const consultarProduto = async () => {
    try {
      const response = await axios.get(`${API_URL}/produto`);
      setProdutos(response.data);
    } catch (error) {
      console.log("Erro ao consultar produto: ", error);
    }
  };

  useEffect(() => {
    consultarProduto();
  }, []);

  const handleEditar = (p) => {
    setNovoProduto({ id: p.id, nome: p.nome, descricao: p.descricao, preco: p.preco });
    setEditar(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/produto/${id}`);
      consultarProduto();
    } catch (error) {
      console.log("Erro ao deletar produto: ", error);
    }
  };

  return (
    <div className="bg-white w-full max-w-5xl rounded-2xl p-6 mx-auto shadow-lg my-12">
      <h2 className="text-2xl font-bold mb-4 text-[#FF8C42]">Cadastro de Produtos</h2>

      {/* Form */}
      <div className="grid sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Nome do Produto"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]"
        />
        <input
          type="number"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSubmit}
          className="bg-[#FF8C42] hover:bg-[#e76f24] text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {editar ? "Salvar Alterações" : "Cadastrar Produto"}
        </button>
        <button
          onClick={() => setMostrarLista((v) => !v)}
          className="border border-[#FF8C42] text-[#FF8C42] hover:bg-[#FF8C42] hover:text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {mostrarLista ? "Ocultar Lista" : "Listar Produtos"}
        </button>
      </div>

      {/* Lista */}
      {mostrarLista && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {produtos.map((produto) => (
            <li
              key={produto.id}
              className="flex justify-between items-center bg-white border border-[#FF8C42] rounded-xl p-4 hover:shadow-lg transition"
            >
              <div>
                <p className="text-lg font-semibold text-[#FF8C42]">{produto.nome}</p>
                <p className="text-gray-600">{produto.descricao}</p>
                <p className="text-green-600 font-bold mt-1">
                  {Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditar(produto)}
                  className="bg-[#FF8C42] hover:bg-[#e76f24] text-white font-bold py-1 px-3 rounded-lg transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg transition"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Produto;
