HEAD
Relatório Técnico - Sistema de Gerenciamento de Produtos e Usuários.

O objetivo do projeto é dinamizar o cadastro de Produtos e Usuários para uma empresa, de forma que todos estejam devidamente inseridos no sistema. Além disso, a aplicação também deve permitir a busca dos mesmos em seu banco de dados. Utilizamos Express, Node.JS, Mysql Workbench, Postman, Sequelize e organização do projeto com o MVC(Model, View, Controller) para o funcionamento correto da aplicação.

Organização do Projeto: ├── config/ │ ├── database.js ├── controllers/ │ ├── produtoController.js │ └── usuarioController.js ├── models/ │ ├── produtoModel.js │ └── usuarioModel.js ├── routes/ │ ├── produtoRoutes.js │ └── usuarioRoutes.js ├── .env ├── index.js ├── package.json

Pastas Principais:

Pasta Model - Recebeu toda a lógica de busca do dados no banco de dados, tanto da busca de Produtos, quanto da busca de Usuários; Pasta Controller - Recebeu toda a parte de requisição e respostas. Ela controla todos os dados do banco e sua forma de envio para o usuário; Pasta Views - Recebeu toda a parte de apresentação dos dados do banco para o usuário da interface. Aqui acontece a reendenização dos dados e apresentação. Pasta Routes - Recebeu a definição dos endpoints e direciona as requisições para os controllers. Também foi utilizada a pasta "Public", onde estão os estáticos da página, que poderão servir para aplicação de estilizações e até imagens na página.

A utilização dos Routes foi imprescindível para o routeamento do site ficar correto. Para a conexão do banco de dados utilizamos a criação da Config, que contém todas as configurações de acesso para o banco de dados. O Index.js é entrada da aplicação, ele fica responsável por carregar as rotas e iniciar o servidor. Os endpoints foram implementados para permitir as operações CRUD (Create, Read, Update, Delete) para produtos e usuários, oque permite a interação do Usuário com o banco de dados.

Lógica dos Endpoints: GET - Usuários/Produtos - Busca todos os produtos e usuários cadastrados; GET - Usuários/Produtos + ID - Busca todos os produtos e usuários cadastrados por meio do ID fornecido; POST - Usuários/Produtos - Valida os dados de entrada e cria um novo registro no banco de dados; PUT - Usuários/Produtos + ID - Atualiza os dados de um registro existente após validação; DELETE - Usuários/Produtos + ID - Deleta os dados relacionados ao ID fornecido;

Erros e Soluções:

1- Erro de conexão com o Banco - A aplicação não conseguia se conectar ao MySQL, retornando um erro de autenticação. Solução: Revisamos as credenciais no arquivo .env e confirmamos que o MySQL estava rodando corretamente. Após ajustar as configurações de conexão no database.js, a conexão funcionou.

2 - Erro ao Criar Registros - O sequelize indicava um erro ao criar produtos novos, deixam alguns campos sem serem preenchidos corretamente. Solução: Implementamos validações nos controllers para garantir que todos os campos obrigatórios fossem passados antes da criação do registro.

3 - Erro na exclusão de Dados - Ao excluir um produto ou usuário, não era possível verificar corretamente se o ID existia antes de remover. Solução: Implementamos uma verificação no controller antes de excluir um registro para garantir que ele existia antes da operação.

4 - Erro na definição de senha do banco de dados - O banco de dados MySQL rejeitava a conexão devido a problemas na senha do usuário configurado, oque fazia o terminar uma mensagem de erro de credenciais e falha de conexão. Solução: Reinstalamos as dependências do Node.js, corrigimos as credenciais no arquivo .env e garantimos que o servidor MySQL estava rodando corretamente. Também ajustamos os scripts para reiniciar a aplicação corretamente.

Validação dos Dados:
Para garantir a integridade dos dados, foram aplicadas as seguintes regras:

Usuários:

--Nome deve ter pelo menos 3 caracteres.

--Email deve ser válido e único.

Produtos:

--Nome deve ter pelo menos 3 caracteres.

--Preço deve ser um valor positivo.

--Estoque deve ser um número inteiro maior ou igual a zero.

O Sequelize foi configurado para tratar essas validações antes de inserir ou atualizar registros no banco.

Testes com Postman:

[Teste com Postman.docx](https://github.com/user-attachments/files/19598078/Teste.com.Postman.docx)
=======

REFERÊNCIAS: PEREIRA, Caio Ribeiro. Livro de NodeJS. [S.l.]: Casa do Código, 2013.

NODE.JS padrão MVC - https://medium.com/@habbema/nodejs-padr%C3%A3o-mvc-2f4e16b79cb8;

Documentação MySQL - https://dev.mysql.com/doc/
