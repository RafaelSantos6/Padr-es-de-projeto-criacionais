import { PedidoBuilder } from '../builder/PedidoBuilder.js';
import { GatewayAdapter } from '../adapter/GatewayAdapter.js';
import { PagamentoFactory } from '../factory/PagamentoFactory.js'; 

export class CheckoutFacade {
    realizarCheckout(itens, metodoPagamento) {
        console.log("\n--- [Facade] Iniciando Checkout ---");
        
        const builder = new PedidoBuilder();
        itens.forEach(item => builder.adicionarItem(item));
        const pedido = builder.build();
        
        const valorTotal = itens.reduce((acc, item) => acc + item.preco, 0);
        
        let pagamento;
        if (metodoPagamento === 'legado') {
            pagamento = new GatewayAdapter();
        } else {
            pagamento = PagamentoFactory.criarPagamento(metodoPagamento);
        }
        
        pagamento.processar(valorTotal);
        
        console.log("--- [Facade] Checkout finalizado com sucesso! ---\n");
        return pedido;
    }
}