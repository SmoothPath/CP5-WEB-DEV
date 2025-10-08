import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Produto = () => {
    //declarando a url da api que será consumida
    const API_URL = 'http://localhost:5001/produto';

    //declarando o hook useState (controla o estado da variável)
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({nome: '', descricao: '', preco: ''}); // adiciona preco
    const [editar, setEditar] = useState(false);
    const [mostrarLista, setMostrarLista] = useState(false); // controla exibição da lista

    //cadastrar produtos
    const cadastrarProduto = async() => {
        if(!novoProduto.nome || !novoProduto.descricao || !novoProduto.preco){ //  inclui preco
            alert('Campo obrigatório!');
            return;
        }    

        try{
            //função axios que vai pegar a api do servidor
            const response = await axios.post(API_URL, novoProduto);
            setProdutos([...produtos, response.data]);
            setNovoProduto({nome: '', descricao: '', preco: ''}); // ← limpa preco também
            setEditar(false);
        }
        catch(error){
            console.log('Erro ao cadastrar produto no servidor: ', error);
        }
    };

    //efeito para consultar os produtos cadastrados
    useEffect(()=>{
        consultarProduto();
    }, [])

    //Consultar Produtos
    const consultarProduto = async() => {
        try{
            const response = await axios.get(API_URL);
            setProdutos(response.data);
        }
        catch(error){
            console.log("Erro ao consultar produtos: ", error);
        }
    };

    //Alterar produto
    const alterarProduto = async() => {
        if(!novoProduto.nome || !novoProduto.descricao || !novoProduto.preco){ // ← inclui preco
            alert('Campo obrigatório!')
            return;
        };

        try{
            const response = await axios.put(`${API_URL}/${novoProduto.id}`, novoProduto);
            setProdutos(
                produtos.map((produto) => produto.id === novoProduto.id ? response.data : produto)
            );
            setNovoProduto({nome: '', descricao: '', preco: ''}); // ← limpa preco também
            setEditar(false);
        }
        catch(error){
            console.log("Erro ao atualizar produto: ", error)
        }
    };

    //Deletar produto
    const deletarProduto = async(id) => {
        if(window.confirm('Tem certeza que deseja deletar esse produto?')){
            try{
                await axios.delete(`${API_URL}/${id}`);
                setProdutos(produtos.filter((produto) => produto.id !== id));
            }
            catch(error){
                console.log('Erro ao deletar produto: ', error);
            }
        }
        else
        {
            console.log('Exclusão do produto cancelada pelo usuário!');
        }
    };

    //método de alterar
    const handleEditar = (produto) => {
        setNovoProduto(produto);
        setEditar(true);
    };

    //método submit que vai atualizar o botão do form
    const handleSubmit = () =>{
        if(editar){
            alterarProduto();
        }
        else{
            cadastrarProduto();
        }
    };

  return (
    <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Cadastro de Produtos</h1>
        <form className='mb-4'>
            <div className='mb-2'>
                <label htmlFor='nome' className='block text-sm font-medium text-gray-700'>
                Nome
                </label>
                <input type='text' id='nome' placeholder='Nome' value={novoProduto.nome} onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}  className='mt-1 p-2 border rounded w-full'>
                </input>
            </div>
            <div className='mb-2'>
                <label htmlFor='descricao' className='block text-sm font-medium text-gray-700'>
                Descrição
                </label>
                <input type='text' id='descricao' placeholder='Descrição' value={novoProduto.descricao} onChange={(e) => setNovoProduto({...novoProduto, descricao: e.target.value})} className='mt-1 p-2 border rounded w-full'>
                </input> 
            </div>
            <div className='mb-2'>
                <label htmlFor='preco' className='block text-sm font-medium text-gray-700'>
                Preço
                </label>
                <input type='text' id='preco' placeholder='Preço' value={novoProduto.preco} onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})} className='mt-1 p-2 border rounded w-full'>
                </input>
            </div>

            <button type='button' onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'> 
              {editar ? 'Alterar' : 'Cadastrar'}
            </button>

            <button type='button' onClick={() => setMostrarLista(!mostrarLista)} className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
              {mostrarLista ? 'Ocultar Lista' : 'Mostrar Lista'}
            </button>
        </form>

        {mostrarLista && (
          <ul>
              {produtos.map((produto) => (
              <li key={produto.id} className='border p-2 mb-2 rounded flex items-center justify-between'>
                  <div>
                      <strong className='font-semibold'>{produto.nome}</strong>{" "} 
                      {produto.descricao}{" "}
                      <span className='text-green-700 font-semibold'>R$ {produto.preco}</span>
                  </div>
                  <div>
                <button
                  onClick={() => handleEditar(produto)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={()=> deletarProduto(produto.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Deletar
                </button>
              </div>
              </li>   
              ))}
          </ul>
        )}
    </div>
  )
}

export default Produto
