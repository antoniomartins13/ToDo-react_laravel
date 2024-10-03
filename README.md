# ToDo React Laravel

Este é um projeto completo de uma aplicação **ToDo** (lista de tarefas) desenvolvido com **React** no front-end e **Laravel** no back-end. A aplicação permite que usuários criem, visualizem, atualizem e excluam suas tarefas de maneira eficiente, além de possuir autenticação de usuários via **Laravel Sanctum**.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **Laravel 10**: Framework PHP para o back-end.
- **MySQL**: Banco de dados relacional.
- **Laravel Sanctum**: Sistema de autenticação simplificado para SPAs.
- **Axios**: Biblioteca para realizar requisições HTTP no front-end.

## Estrutura do Projeto

- **todo-front-end**: Contém o código fonte do front-end desenvolvido com React.
- **todo-back-end/laravel-10-rest-api**: Contém o código fonte do back-end desenvolvido com Laravel.

## Funcionalidades

- **Autenticação de Usuário**: Cadastro, login e logout utilizando o Laravel Sanctum.
- **Gerenciamento de Tarefas**: O usuário pode:
  - Criar uma nova tarefa.
  - Visualizar suas tarefas pendentes e concluídas.
  - Marcar uma tarefa como concluída.
  - Excluir tarefas.
- **Proteção de Rotas**: As rotas da aplicação são protegidas e acessíveis apenas para usuários autenticados.

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** e **npm** instalados para rodar o front-end.
- **PHP**, **Composer**, **DOCKER** e **MySQL** configurados para rodar o back-end.
- **Git** para controle de versão.

### Clonando o Repositório

  ```
    git clone https://github.com/antoniomartins13/ToDo-react-laravel.git
    cd ToDo-react-laravel
  ```

### Configuração do Front-end

1. Entre no diretório `todo-front-end`:

   ```
   cd todo-front-end
   ```

2. Instale as dependências do projeto:

   ```
   npm install
   ```

3. Execute o projeto:

   ```
   npm start
   ```

   O projeto estará disponível em (http://localhost:3000).

### Configuração do Back-end

1. Entre no diretório `todo-back-end/laravel-10-rest-api`:

   ```
   cd todo-back-end/laravel-10-rest-api
   ```
2. Suba os containers do projeto
 ```
  docker-compose up -d
 ```
3. Acessar o container
 ```
  docker-compose exec app bash
 ```

4. Instalar as dependências do projeto
 ```
  composer install
 ```
5. Gerar a key do projeto Laravel
```
  php artisan key:generate
```

Acessar o projeto http://localhost:8989
