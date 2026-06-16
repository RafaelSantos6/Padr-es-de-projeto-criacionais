# Padrões de projeto criacionais

## Projeto feito em Node.js usando o Express e mysql2 para leitura e gravação em banco. 
O projeto consiste em uma aplicação web estruturada em camadas, expondo uma API RESTful desenvolvida em Node.js com o framework Express. A aplicação gerencia a criação e listagem de pedidos de um e-commerce, empregando Padrões Criacionais (Design Patterns) para resolver problemas complexos de instanciação e validação de regras de negócio antes de persistir os dados em um banco MySQL.

### Justificativas
1. **Singleton (Conexão com o Banco de Dados)**
Por que usar: Criar conexões com o banco de dados é uma operação lenta e que consome muita memória. O Singleton garante que apenas um Pool de Conexões seja criado e reaproveitado por todo o sistema durante as requisições. Isso centraliza o acesso ao banco em um ponto global seguro e evita que o servidor trave ou esgote seus recursos por excesso de conexões simultâneas.

2. **Builder (Montagem de Pedidos)**
Por que usar: Em vez de usar um construtor tradicional cheio de parâmetros ordenados (o que causa confusão e força a passagem de valores null para campos opcionais), o Builder permite montar o objeto passo a passo de forma fluente e legível. Além disso, ele isola e centraliza as regras de validação dentro do método build(), guessing que nenhum pedido incompleto ou inválido seja criado no sistema.

3. **Factory Method (Sistema de Pagamentos)**
Por que usar: Esse padrão isola a lógica de criação das diferentes formas de pagamento, fazendo com que o servidor (código cliente) não precise conhecer as classes concretas diretamente. Para adicionar uma nova opção como criptomoeda, basta criar a nova classe e registrá-la na Factory. O restante do sistema continua intacto, respeitando o Princípio Aberto/Fechado (baixo acoplamento).

4. **Adapter (Integração de Gateway Legado)**
Sem o padrão Adapter, seria necessário modificar o código que processa os pagamentos para tratar o gateway legado de forma diferente. O princípio Open/Closed diz que as classes devem estar abertas para extensão, mas fechadas para modificação. Com o Adapter, não é necessário alterar a lógica do pedido para suportar o gateway legado; quando surge um novo sistema de pagamento incompatível, basta criar outro Adapter.

5. **Decorator (Inclusão de Novos Comportamentos)**
O padrão Decorator permite adicionar novas funcionalidades, como o envio de SMS, sem modificar as classes já existentes. Basta criar um novo decorator que encapsula o objeto de pagamento e adiciona o comportamento desejado. Diferentemente da herança simples, que exige a criação de várias subclasses para cada combinação de funcionalidades, o Decorator permite combinar comportamentos dinamicamente, tornando o código mais flexível, reutilizável e alinhado ao princípio Open/Closed.

6. **Facade (Simplificação de Subsistemas no Controller)**
Sem a Facade, o controller teria que conhecer e interagir diretamente com todos os subsistemas, como `PedidoBuilder`, `PagamentoFactory` e `GatewayAdapter`. Se algum desses componentes mudasse sua API, o controller precisaria ser alterado para se adaptar, aumentando o acoplamento. Com a Facade, o controller se comunica apenas com o método `realizarCheckout()`. Dessa forma, se a implementação de um subsistema mudar, apenas a classe `CheckoutFacade` precisa ser atualizada, protegendo o código cliente.

7. **Strategy (Cálculo de Frete)**
Para adicionar uma nova transportadora, como a DHL, basta criar uma nova classe que implemente `FreteStrategy`, sem modificar a classe `Carrinho` ou `CalculadoraFrete`. O padrão Strategy permite adicionar novos métodos de cálculo de frete de forma simples e organizada, ajudando a seguir o princípio Open/Closed do SOLID, pois o sistema pode ser estendido sem alterar o código existente.

8. **Observer (Notificação de Eventos)**
Com o padrão Observer, para adicionar um novo serviço (como envio de SMS), basta criar uma nova classe `SMSObserver` e registrá-la no `PedidoSubject`, sem modificar o código existente. O sujeito apenas notifica todos os observers cadastrados. Sem o padrão, a classe `Pedido` precisaria chamar diretamente cada serviço (`Email`, `Estoque`, `SMS`, etc.), exigindo modificações na classe a cada novo serviço adicionado e aumentando drasticamente o acoplamento.

9. **Command (Fila de Tarefas Assíncronas e Desacoplamento)**
Além do *undo*, o padrão Command traz vantagens como o desacoplamento entre quem solicita uma ação e quem a executa, facilidade para registrar histórico de operações, reutilização de comandos e suporte a filas e agendamentos. Para implementar uma fila assíncrona, cada operação (enviar e-mail, atualizar estoque) é encapsulada em um comando e armazenada em uma fila. Um processador executa os comandos um por vez, permitindo expandir o sistema com novas ações sem que ele precise conhecer os detalhes internos de cada tarefa.

#### Alunos
* Rafael Ricetti
* Vinicius Sebold 

# Para rodar 
> node index.js