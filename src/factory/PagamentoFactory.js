import { CartaoCredito, Pix, Boleto } from './pagamentos.js';

export class PagamentoFactory {
    static criar(tipo) {
        switch (tipo.toLowerCase()) {
            case 'cartao':
                return new CartaoCredito();
            case 'pix':
                return new Pix();
            case 'boleto':
                return new Boleto();
            default:
                throw new Error(`Tipo de pagamento não suportado: ${tipo}`);
        }
    }
}