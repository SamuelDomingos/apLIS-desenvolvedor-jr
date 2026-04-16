# 🩺 Backend PHP - Gestão de Médicos

Este é um backend simplificado desenvolvido em PHP para a gestão de médicos, fornecendo uma API RESTful para operações de CRUD (Create, Read, Update, Delete).

## 🚀 Funcionalidades

- **Listar Médicos**: Retorna todos os médicos cadastrados.
- **Cadastrar Médico**: Adiciona um novo médico ao sistema.
- **Atualizar Médico**: Altera os dados de um médico existente.
- **Excluir Médico**: Remove um médico do sistema.

## 🛠️ Tecnologias Utilizadas

- **PHP 8.x** (com tipagem estrita)
- **MySQL** (Banco de dados)
- **PDO** (PHP Data Objects para conexão segura com o banco)
- **Composer** (Gerenciador de dependências)

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- PHP >= 8.0
- Servidor Web (Apache ou Nginx)
- MySQL Server
- Composer

## ⚙️ Instalação e Configuração

1. **Clonar o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd backendphp
   ```

2. **Configurar o Banco de Dados**
   Crie um banco de dados no MySQL e execute a seguinte query para criar a tabela de médicos:
   ```sql
   CREATE TABLE medicos (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nome VARCHAR(255) NOT NULL,
       CRM VARCHAR(50) NOT NULL,
       UFCRM CHAR(2) NOT NULL
   );
   ```

3. **Configurar Variáveis de Ambiente**
   Crie um arquivo chamado `.env` na raiz do projeto (`backendphp/.env`) com as seguintes informações:
   ```env
   DB_HOST=localhost
   DB_NAME=nome_do_seu_banco
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   ```

4. **Instalar Dependências**
   ```bash
   composer install
   ```

5. **Iniciar o Servidor**
   Se estiver usando o servidor embutido do PHP para testes:
   ```bash
   php -S localhost:8000 -t public
   ```

## 🛣️ Documentação da API

A URL base da API é: `http://localhost:8000/api/v1/medicos`

### Endpoints

| Método | Endpoint | Descrição | Corpo da Requisição (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/medicos` | Lista todos os médicos | N/A |
| **POST** | `/api/v1/medicos` | Cadastra um médico | `{"nome": "...", "CRM": "...", "UFCRM": "..."}` |
| **PUT** | `/api/v1/medicos/{id}` | Atualiza um médico | `{"nome": "...", "CRM": "...", "UFCRM": "..."}` |
| **DELETE** | `/api/v1/medicos/{id}` | Remove um médico | N/A |

## 🛡️ Segurança Implementada

- **CORS**: Configurado para aceitar requisições apenas de origens autorizadas (por padrão `http://localhost:3000`).
- **Proteção contra SQL Injection**: Utilização de *Prepared Statements* via PDO.
- **Rate Limiting**: Proteção básica contra ataques de DoS, limitando o número de requisições por sessão (100 requisições a cada 15 min).
- **Sanitização**: Limpeza básica de strings utilizando `trim()` e `strtoupper()`.
