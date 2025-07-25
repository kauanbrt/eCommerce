# Sistema de Gerenciamento de E-commerce – API REST

Este projeto consiste em uma API REST desenvolvida em **Node.js e Express** com persistência de dados em **MongoDB**, com o objetivo de simular operações básicas de um sistema de e-commerce. A aplicação permite o gerenciamento de produtos, clientes e pedidos, seguindo boas práticas de organização em camadas (Model, Service, Controller) e implementando validações e regras de negócio.

Projeto desenvolvido para a disciplina **Programação Web Back-End** da UTFPR.

---

## Entidades e Operações

A seguir, estão descritas as três entidades principais e as respectivas operações implementadas para cada uma:

### Produto (`/products`)
- `GET /api/products` – Lista todos os produtos (Pública)
- `POST /api/products` – Cadastra um novo produto
- `PUT /api/products/:id` – Atualiza um produto existente
- `DELETE /api/products/:id` – Remove um produto

### Cliente (`/customers`)
- `GET /api/customers` – Lista todos os clientes
- `POST /api/customers` – Cadastra um novo cliente
- `PUT /api/customers/:id` – Atualiza um cliente existente
- `DELETE /api/customers/:id` – Remove um cliente

### Pedido (`/orders`)
- `GET /api/orders` – Lista todos os pedidos
- `POST /api/orders` – Cria um novo pedido
- `PUT /api/orders/:id` – Atualiza um pedido (por exemplo, para encerrá-lo)
- `DELETE /api/orders/:id` – Remove um pedido

### Usuário (`/users`)
- `GET /api/users` – Lista todos os usuários
- `POST /api/users` – Cria um novo usuário
- `PUT /api/users/:id` – Atualiza um usuários
- `DELETE /api/users/:id` – Remove um usuário

### Autenticação
- `POST /api/login` – Valida o usuário e retorna o token de autenticação
- `POST /api/verify` – Verifica se o token é válido

---

## Validações e Regras de Negócio

A API implementa validações de campos obrigatórios e regras específicas para garantir a consistência dos dados.

### Produto
- Campos obrigatórios: `name`, `price`, `amount`
- O preço deve ser um número maior que zero
- O estoque (`amount`) deve ser um número inteiro igual ou superior a zero
- Não é permitido cadastrar dois produtos com o mesmo nome

### Cliente
- Campos obrigatórios: `name`, `email`, `cpf`
- Não é permitido cadastrar clientes com CPF ou e-mail duplicados

### Pedido
- Campos obrigatórios: `product_id`, `customer_id`, `amount`
- Regras aplicadas:
  - O cliente não pode ter mais de um pedido em aberto (`status: "open"`)
  - O produto informado no pedido deve existir
  - O produto deve possuir estoque suficiente para o pedido
  - O valor total do pedido é calculado automaticamente com base na quantidade e no preço do produto
  - Após a criação do pedido, o estoque do produto é atualizado
  - Pedidos são criados com status `"open"` e podem ser encerrados posteriormente via atualização (`PUT`)

### Usuário
- Campos obrigatórios: `name`, `email`, `password`
- Não é permitido cadastrar usuários com e-mail duplicados
- A senha deve ser criptografada para persistir no banco

---

## Tratamento e Registro de Erros

O sistema captura e trata erros por meio de blocos `try/catch`. Todos os erros capturados são registrados automaticamente em um arquivo de log localizado em:

```
/logs/error.log
```

Cada entrada contém data, hora e mensagem de erro, permitindo a auditoria e depuração posterior.

---

## Como Executar o Projeto

A seguir, o passo a passo para executar a aplicação localmente:

### Requisitos
- Node.js instalado
- MongoDB em execução local (em `mongodb://127.0.0.1:27017`)

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/kauanbrt/eCommerce.git
cd eCommerce
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o MongoDB (caso ainda não esteja em execução):
```bash
sudo systemctl start mongod
```

4. Execute o servidor:
```bash
node server.js
```

5. Acesse os endpoints via Postman, Insomnia ou navegador:
```
http://localhost:3000/api/products
http://localhost:3000/api/customers
http://localhost:3000/api/orders
http://localhost:3000/api/users
http://localhost:3000/api/login
http://localhost:3000/api/verify
```
