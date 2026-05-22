import { Pedido } from './Pedido.js';

export class PedidoBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.pedido = new Pedido();
    }

    adicionarItem(item) {
        this.pedido.itens.push(item);
        return this; // Retorna o próprio builder para fluidez
    }

    setEndereco(endereco) {
        this.pedido.endereco = endereco;
        return this;
    }

    setPagamento(pagamento) {
        this.pedido.pagamento = pagamento;
        return this;
    }

    build() {
        // Validações exigidas pela atividade
        if (this.pedido.itens.length === 0) {
            throw new Error("Validação falhou: O pedido deve ter pelo menos um item.");
        }
        if (!this.pedido.endereco) {
            throw new Error("Validação falhou: Um endereço de entrega é obrigatório.");
        }
        if (!this.pedido.pagamento) {
            throw new Error("Validação falhou: Uma forma de pagamento deve ser definida.");
        }

        const pedidoFinal = this.pedido;
        this.reset(); // Prepara o builder para o próximo pedido
        return pedidoFinal;
    }
}