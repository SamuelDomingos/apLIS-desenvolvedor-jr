# 🩺 Backend Node.js - Gestão de Pacientes

Este é um backend desenvolvido em Node.js para a gestão de pacientes, fornecendo uma API RESTful para operações de CRUD (Create, Read, Update, Delete).

## 🚀 Funcionalidades

- **Listar Pacientes**: Retorna todos os pacientes cadastrados.
- **Cadastrar Paciente**: Adiciona um novo paciente ao sistema.
- **Atualizar Paciente**: Altera os dados de um paciente existente.
- **Excluir Paciente**: Remove um paciente do sistema.

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express** (Framework web)
- **MySQL** (Banco de dados)
- **mysql2** (Driver de conexão com suporte a Promises)
- **dotenv** (Gerenciamento de variáveis de ambiente)
- **cors** (Controle de acesso de origens cruzadas)
- **express-rate-limit** (Proteção contra ataques de DoS)

## 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- Node.js (LTS recomendado)
- MySQL Server
- npm (instalado junto com o Node)

## ⚙️ Instalação e Configuração

1. **Clonar o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd backendjs
   ```

2. **Configurar o Banco de Dados**
   Crie um banco de dados no MySQL e execute a seguinte query para criar a tabela de pacientes:
   ```sql
   CREATE TABLE pacientes (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nome VARCHAR(255) NOT NULL,
       dataNascimento DATE,
       carteirinha VARCHAR(50) NOT NULL,
       cpf VARCHAR(14) NOT NULL UNIQUE
   );
   ```

3. **Configurar Variáveis de Ambiente**
   Crie um arquivo chamado `.env` na raiz do projeto (`backendjs/.env`) com as seguintes informações:
   ```env
   PORT=3001
   DB_HOST=localhost
   DB_NAME=nome_do_seu_banco
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   FRONTEND_URL=http://localhost:3000
   ```

4. **Instalar Dependências**
   ```bash
   npm install
   ```

5. **Iniciar o Servidor**
   ```bash
   npm start
   # ou, se usar nodemon:
   npm run dev
   ```

## 🛣️ Documentação da API

A URL base da API é: `http://localhost:3001/api/v1/pacientes`

### Endpoints

| Método | Endpoint | Descrição | Corpo da Requisição (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/pacientes` | Lista todos os pacientes | N/A |
| **POST** | `/api/v1/pacientes` | Cadastra um paciente | `{"nome": "...", "dataNascimento": "YYYY-MM-DD", "carteirinha": "...", "cpf": "..."}` |
| **PUT** | `/api/v1/pacientes/{id}` | Atualiza um paciente | `{"nome": "...", "dataNascimento": "YYYY-MM-DD", "carteirinha": "...", "cpf": "..."}` |
| **DELETE** | `/api/v1/pacientes/{id}` | Remove um paciente | N/A |

## 🛡️ Segurança Implementada

- **CORS Restrito**: A API só aceita requisições de domínios autorizados via `FRONTEND_URL`.
- **Proteção contra DoS**: Implementado *Rate Limiting* para evitar abusos e ataques de negação de serviço (limite de 100 requisições a cada 15 min).
- **Proteção contra SQL Injection**: Utilização de *Prepared Statements* através do driver `mysql2`.
- **Tratamento de Erros**: Respostas padronizadas com `error_code` para facilitar a integração com o frontend.
