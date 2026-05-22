import express from 'express';
import { Conexao } from './src/singleton/Conexao.js';
import { PagamentoFactory } from './src/factory/PagamentoFactory.js';
import { PedidoBuilder } from './src/builder/PedidoBuilder.js';

const app = express();

// Permite que o Node entenda JSON e sirva arquivos estáticos (nosso HTML)
app.use(express.json());
app.use(express.static('public')); 

// ROTA 1: Retornar todos os pedidos do banco de dados
app.get('/api/pedidos', async (req, res) => {
    try {
        const pool = Conexao.getInstance().getPool();
        const [linhas] = await pool.query('SELECT * FROM pedidos ORDER BY data_criacao DESC');
        res.json(linhas);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar pedidos no banco." });
    }
});

// ROTA 2: Criar um novo pedido
app.post('/api/pedidos', async (req, res) => {
    try {
        const { itens, endereco, pagamento } = req.body;

        // 1. Usa a Factory para validar/criar a forma de pagamento
        const metodoPagamento = PagamentoFactory.criar(pagamento);

        // 2. Usa o Builder para montar e validar o pedido
        const builder = new PedidoBuilder();
        const pedidoFinal = builder
            .adicionarItem(itens)
            .setEndereco(endereco)
            .setPagamento(metodoPagamento)
            .build();

        // 3. Usa o Singleton para salvar no banco
        const pool = Conexao.getInstance().getPool();
        const itensString = pedidoFinal.itens.join(', '); // Converte array para string

        await pool.query(
            'INSERT INTO pedidos (itens, endereco, pagamento) VALUES (?, ?, ?)',
            [itensString, pedidoFinal.endereco, pagamento]
        );

        res.status(201).json({ mensagem: 'Pedido criado com sucesso!' });
    } catch (erro) {
        // Se o Builder ou a Factory lançarem um erro (ex: campo vazio), retornamos para o HTML
        res.status(400).json({ erro: erro.message });
    }
});

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando! Acesse: http://localhost:${PORT}`);
});
