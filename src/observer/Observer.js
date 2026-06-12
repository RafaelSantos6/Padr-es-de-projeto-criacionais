export class PedidoSubject {
    constructor() {
        this.observers = [];
    }

    inscrever(observer) {
        this.observers.push(observer);
    }

    notificar(pedidoId, status) {
        this.observers.forEach(observer => observer.atualizar(pedidoId, status));
    }
}

export class EmailObserver {
    atualizar(pedidoId, status) {
        console.log(`[Observer - Email] Notificando cliente: Pedido #${pedidoId} agora está "${status}".`);
    }
}

export class EstoqueObserver {
    atualizar(pedidoId, status) {
        if (status === 'Pagamento Aprovado') {
            console.log(`[Observer - Estoque] Pedido #${pedidoId} liberado. Iniciando separação dos itens no estoque.`);
        }
    }
}