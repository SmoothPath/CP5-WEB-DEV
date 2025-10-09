import React, { useEffect, useState } from "react";
import axios from "axios";

const Produto = () => {
  const API_URL = "http://localhost:5001/produto";

  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });
  const [editar, setEditar] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(false);

  const cadastrarProduto = async () => {
    if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.preco) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const response = await axios.post(API_URL, novoProduto);
      setProdutos([...produtos, response.data]);
      setNovoProduto({ nome: "", descricao: "", preco: "" });
      setEditar(false);
    } catch (error) {
      console.log("Erro ao cadastrar produto: ", error);
    }
  };

  const consultarProduto = async () => {
    try {
      const response = await axios.get(API_URL);
      setProdutos(response.data);
    } catch (error) {
      console.log("Erro ao consultar produtos: ", error);
    }
  };

  useEffect(() => {
    consultarProduto();
  }, []);

  const alterarProduto = async () => {
    if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.preco) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/${novoProduto.id}`, novoProduto);
      setProdutos(produtos.map((produto) => produto.id === novoProduto.id ? response.data : produto));
      setNovoProduto({ nome: "", descricao: "", preco: "" });
      setEditar(false);
    } catch (error) {
      console.log("Erro ao atualizar produto: ", error);
    }
  };

  const deletarProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setProdutos(produtos.filter((produto) => produto.id !== id));
      } catch (error) {
        console.log("Erro ao deletar produto: ", error);
      }
    }
  };

  const handleEditar = (produto) => {
    setNovoProduto(produto);
    setEditar(true);
  };

  const handleSubmit = () => {
    if (editar) {
      alterarProduto();
    } else {
      cadastrarProduto();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff4e6] via-[#ffe6cc] to-white flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-center text-[#FF8C42] mb-6">
          🐾 Cadastro de Produtos
        </h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-gray-700 font-semibold mb-1">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              placeholder="Nome do produto"
              value={novoProduto.nome}
              onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#FF8C42] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-gray-700 font-semibold mb-1">
              Descrição
            </label>
            <input
              type="text"
              id="descricao"
              placeholder="Descrição do produto"
              value={novoProduto.descricao}
              onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#FF8C42] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="preco" className="block text-gray-700 font-semibold mb-1">
              Preço
            </label>
            <input
              type="number"
              id="preco"
              placeholder="Preço (R$)"
              value={novoProduto.preco}
              onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#FF8C42] focus:outline-none"
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#FF8C42] hover:bg-[#e76f24] text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200"
            >
              {editar ? "Alterar" : "Cadastrar"}
            </button>

            <button
              type="button"
              onClick={() => setMostrarLista(!mostrarLista)}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-200"
            >
              {mostrarLista ? "Ocultar Lista" : "Mostrar Lista"}
            </button>
          </div>
        </form>

        {mostrarLista && (
          <ul className="mt-8 space-y-4">
            {produtos.map((produto) => (
              <li
                key={produto.id}
                className="flex justify-between items-center bg-[#FFF0E0] border border-[#FF8C42] rounded-xl p-4 hover:shadow-lg transition"
              >
                <div>
                  <p className="text-lg font-semibold text-[#FF8C42]">{produto.nome}</p>
                  <p className="text-gray-600">{produto.descricao}</p>
                  <p className="text-green-600 font-bold mt-1">
                    R$ {produto.preco}
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
                    onClick={() => deletarProduto(produto.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Produto;
