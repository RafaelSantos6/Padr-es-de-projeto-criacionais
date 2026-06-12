export class Command {
    execute() {}
    undo() {}
}

export class AdicionarItemCommand extends Command {
    constructor(carrinho, item) {
        super();
        this.carrinho = carrinho;
        this.item = item;
    }

    execute() {
        this.carrinho.push(this.item);
        console.log(`[Command - Execute] Item "${this.item.nome}" adicionado ao carrinho.`);
    }

    undo() {
        const index = this.carrinho.indexOf(this.item);
        if (index > -1) {
            this.carrinho.splice(index, 1);
            console.log(`[Command - Undo] Ação desfeita: Item "${this.item.nome}" removido do carrinho.`);
        }
    }
}

export class GerenciadorCarrinho {
    constructor() {
        this.historico = [];
    }

    executarComando(command) {
        command.execute();
        this.historico.push(command);
    }

    desfazerUltimoComando() {
        if (this.historico.length > 0) {
            const comando = this.historico.pop();
            comando.undo();
        }
    }
}