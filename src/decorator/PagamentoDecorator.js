export class PagamentoDecorator {
    constructor(pagamento) {
        this.pagamento = pagamento;
    }

    processar(valor) {
        return this.pagamento.processar(valor);
    }
}

export class PagamentoComTaxa extends PagamentoDecorator {
    processar(valor) {
        const taxa = 5.00; 
        const valorComTaxa = valor + taxa;
        console.log(`[Decorator] Adicionando taxa fixa de R$ ${taxa.toFixed(2)}. Total a processar: R$ ${valorComTaxa.toFixed(2)}`);
        return super.processar(valorComTaxa);
    }
}