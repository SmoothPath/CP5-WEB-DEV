const cors = require('cors'); //habilita conexão entre front e back, permite que acesse diferentes rotas (domínios)
const express = require('express'); //constrói o servidor com módulo express
const bodyParser = require('body-parser'); //analisa as requisições do corpo da página como entrada http
const {v4: uuid} = require('uuid'); //gera ids únicos
const fs = require('fs').promises; //manipula arquivos json e sincroniza os dados
const path = require('path'); //trabalha com os caminhos dos arquivos

//Instanciando o express
const app = express();

//definindo porta do servidor
const port = 5001;

//usando cors para habilitar as rotas
app.use(cors());

//usando bodyParser para analisar as requisições na aplicação (ex: dados de um form) e converter para json
app.use(bodyParser.json());

//local do banco de dados (arquivos)
const caminho = path.join(__dirname, "data", "produtos.json")

//============ Rota para cadastrar produtos, post
app.post("/produto", async (req, res) => {
    //destruct (desestruturação) - acessa as propriedades que serão manipuladas no body
    const { nome, descricao, preco } = req.body; //adicionado preco

    //validação dos campos (verifica se não está vazio)
    if (!nome || !descricao || !preco) { // ← inclui preco na validação
        return res.status(400).json({ error: "Campos Inválidos" })
    }

    try {
        //lê o conteúdo do arquivo json
        const data = await fs.readFile(caminho, "utf-8");
        //analisa o json lido e converte para um obj js
        const produtos = JSON.parse(data);

        //obj (array) com id, nome, descrição e preço
        const novoItem = { id: uuid(), nome, descricao, preco }; // incluindo preco
        
        //adiciona o novo item ao array 
        produtos.push(novoItem);
        
        //converte o array (produtos) atualizado de volta para uma string json formatada
        const updateData = JSON.stringify(produtos, null, 2);

        //escreve o conteúdo atualizado de volta no arquivo json
        await fs.writeFile(caminho, updateData, "utf-8");

        //retorna o novo item cadastrado com mensagem de sucesso
        res.status(201).json(novoItem);

    } catch (error) {
        console.error("Erro ao gravar dados:", error);
        return res.status(500).json({ error: "Erro interno do servidor ao salvar o produto." });
    }
});

//=========== Rota para consultar os produtos cadastrados (get)
app.get('/produto', async(req,res) => {
    try {
        const data = await fs.readFile(caminho, "utf-8");
        const produtos = JSON.parse(data)
        res.json(produtos);
    } catch(error){
        console.error("Erro ao consultar dados:", error);
        return res.status(500).json({error: "Erro interno do servidor ao consultar produtos."});
    }
});

//============= Rota para alterar os produtos cadastrados (put)
app.put('/produto/:id', async(req,res) => {
    const produtoId = req.params.id;
    const {nome, descricao, preco} = req.body; // com preco

    if(!nome || !descricao || !preco){ // incluindo preco na validação
        return res.status(400).json({error: 'Campos inválidos!'})
    }

    try{
        const data = await fs.readFile(caminho, "utf-8");
        let produtos = JSON.parse(data);

        const produtoIndex = produtos.findIndex(item => item.id === produtoId);
        
        if(produtoIndex === -1){
            return res.status(404).json({error: 'Produto não encontrado!'});
        };

        produtos[produtoIndex] = {id: produtoId, nome, descricao, preco}; 

        const updateData = JSON.stringify(produtos, null,2);
        await fs.writeFile(caminho,updateData, 'utf-8');

        res.json(produtos[produtoIndex]);
    }
    catch(error){
        console.log('Erro ao atualizar dados: ', error);
        return res.status(500).json({error: "Erro interno do servidor ao alterar produto."});
    }
});

//========== Rota para deletar produto cadastrado (delete)
app.delete("/produto/:id", async (req, res) => { 
    const produtoId = req.params.id;

    try {
        const data = await fs.readFile(caminho, "utf-8");
        let produtos = JSON.parse(data);

        const inicioProduto = produtos.length;
        produtos = produtos.filter(item => item.id !== produtoId);

        if (produtos.length === inicioProduto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        const updateData = JSON.stringify(produtos, null, 2);
        await fs.writeFile(caminho, updateData, "utf-8");

        res.status(200).send("Produto removido com sucesso");
    } catch (error) {
        console.error("Erro ao deletar dados:", error);
        res.status(500).json({ error: "Erro interno do servidor ao deletar o produto." });
    }
});

// Caminho do arquivo de mensagens
const caminhoMensagens = path.join(__dirname, "data", "mensagens.json");

//======= Rota para cadastrar mensagem
app.post("/mensagem", async (req, res) => {
    const { nome, mensagem } = req.body;

    if (!nome || !mensagem) {
        return res.status(400).json({ error: "Campos inválidos" });
    }

    try {
        // Lê mensagens existentes ou cria array vazio
        let mensagens = [];
        try {
            const data = await fs.readFile(caminhoMensagens, "utf-8");
            mensagens = JSON.parse(data);
        } catch (err) {
            // Se o arquivo não existir, continua com array vazio
        }

        const novaMensagem = { id: uuid(), nome, mensagem, data: new Date().toISOString() };
        mensagens.push(novaMensagem);

        await fs.writeFile(caminhoMensagens, JSON.stringify(mensagens, null, 2), "utf-8");

        res.status(201).json(novaMensagem);
    } catch (error) {
        console.error("Erro ao gravar mensagem:", error);
        res.status(500).json({ error: "Erro interno ao salvar mensagem" });
    }
});


//========== Executando servidor na porta escolhida
app.listen(port, ()=> {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
});
