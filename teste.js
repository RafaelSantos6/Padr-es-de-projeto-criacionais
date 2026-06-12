import { GatewayAdapter } from './src/adapter/GatewayAdapter.js';
import { PagamentoComTaxa } from './src/decorator/PagamentoDecorator.js';
import { CalculadoraFrete, FreteNormal, FreteExpresso } from './src/strategy/CalculoFrete.js';
import { PedidoSubject, EmailObserver, EstoqueObserver } from './src/observer/Observer.js';
import { GerenciadorCarrinho, AdicionarItemCommand } from './src/command/Command.js';


console.log("=== TESTANDO TAREFA 04 e 05: ADAPTER & DECORATOR ===");
const adaptador = new GatewayAdapter();
const pagamentoComTaxa = new PagamentoComTaxa(adaptador);
pagamentoComTaxa.processar(150.00); 

console.log("\n=== TESTANDO TAREFA 07: STRATEGY (Cálculo de Frete) ===");
const calcFrete = new CalculadoraFrete(new FreteNormal());
console.log(`Frete Normal (10km): R$ ${calcFrete.calcular(10)}`);
calcFrete.setStrategy(new FreteExpresso());
console.log(`Frete Expresso (10km): R$ ${calcFrete.calcular(10)}`);

console.log("\n=== TESTANDO TAREFA 08: OBSERVER (Notificações) ===");
const pedido = new PedidoSubject();
pedido.inscrever(new EmailObserver());
pedido.inscrever(new EstoqueObserver());

pedido.notificar(101, "Aguardando Pagamento");
pedido.notificar(101, "Pagamento Aprovado");   

console.log("\n=== TESTANDO TAREFA 09: COMMAND (Carrinho e Undo) ===");
const carrinho = [];
const gerenciador = new GerenciadorCarrinho();

const cmd1 = new AdicionarItemCommand(carrinho, { nome: "Monitor", preco: 800 });
const cmd2 = new AdicionarItemCommand(carrinho, { nome: "Mouse", preco: 150 });

gerenciador.executarComando(cmd1);
gerenciador.executarComando(cmd2);
console.log("Itens no carrinho:", carrinho);

gerenciador.desfazerUltimoComando(); 
console.log("Carrinho após o Desfazer (Undo):", carrinho);