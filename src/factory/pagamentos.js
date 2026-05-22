// Simula a Interface
export class Pagamento {
    processar(valor) {
        throw new Error("O método processar() deve ser implementado.");
    }
}

export class CartaoCredito extends Pagamento {
    processar(valor) {
        console.log(`Processando pagamento de R$ ${valor.toFixed(2)} via Cartão de Crédito.`);
    }
}

export class Pix extends Pagamento {
    processar(valor) {
        console.log(`Processando pagamento de R$ ${valor.toFixed(2)} via PIX.`);
    }
}

export class Boleto extends Pagamento {
    processar(valor) {
        console.log(`Processando pagamento de R$ ${valor.toFixed(2)} via Boleto.`);
    }
}