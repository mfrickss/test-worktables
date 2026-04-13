# Global Weather Dashboard

## Visão Geral

O Global Weather Dashboard é um widget de visualização de quadro (Board View) personalizado construído para o monday.com. Ele permite que os usuários visualizem dados meteorológicos em tempo real para os países listados em seus quadros do monday.com. O projeto apresenta uma interface de usuário moderna e minimalista, oferecendo integração contínua com a plataforma monday.com.

O sistema está dividido em dois componentes principais:
- **Frontend**: Uma aplicação Next.js que é incorporada de forma segura dentro da interface do monday.com, renderizando uma barra de pesquisa responsiva, grids de países e modais meteorológicos acessíveis.
- **Backend**: Uma API em Node.js e Express que atua como proxy para buscar dados meteorológicos de provedores externos, implementando uma camada de cache para garantir desempenho e evitar problemas de limite de requisições.

## Arquitetura

Este projeto adota uma arquitetura desacoplada com forte separação de responsabilidades.

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Estilização**: Tailwind CSS 4 com CSS modules padrão
- **Integração**: `monday-sdk-js` para buscar os itens do quadro de forma contextual
- **Qualidade de Código**: Biome para linting e formatação, Vitest para testes
- **Utilitários**: `i18n-iso-countries` para padronizar nomes de locais e bandeiras

### Backend
- **Framework**: Node.js com Express.js
- **Linguagem**: TypeScript
- **Cache**: `node-cache` para armazenar consultas recentes de dados meteorológicos
- **Cliente HTTP**: Axios para consumo de API externa
- **Qualidade de Código**: Biome para linting e formatação, Vitest para testes

## Pré-requisitos

Antes de configurar o projeto localmente, certifique-se de ter os seguintes itens instalados:
- Node.js (v20 ou superior recomendado)
- npm ou yarn

Além disso, você precisará de uma conta de desenvolvedor do monday.com para instalar e testar o widget dentro de um quadro de uma área de trabalho, assim como uma chave de API para o serviço meteorológico externo subjacente (como OpenWeatherMap ou equivalente, conforme configurado no backend).

## Instruções de Configuração

### 1. Configuração do Backend

Navegue até o diretório do backend e instale as dependências necessárias:

```bash
cd backend
npm install
```

Crie um arquivo `.env` no diretório `backend` baseado nas variáveis de ambiente necessárias:

```env
PORT=3001
WEATHER_API_KEY=sua_chave_de_api_de_clima_aqui
```

Inicie o servidor de desenvolvimento do backend:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`.

### 2. Configuração do Frontend

Navegue até o diretório do frontend e instale as dependências:

```bash
cd frontend
npm install
```

Inicie o servidor de desenvolvimento do Next.js:

```bash
npm run dev
```

O frontend será executado, por padrão, em `http://localhost:3000`.

### 3. Configuração da Integração com o monday.com

Para testar a integração dentro do monday.com:
1. Faça login na sua conta do monday.com.
2. Navegue até o Developer Center e crie um novo App.
3. Adicione o recurso "Board View" (Visualização de Quadro) ao seu App.
4. Defina a URL Personalizada da view para apontar diretamente para seu ambiente frontend local (ex: `http://localhost:3000`) ou use um serviço de tunelamento como o ngrok para expor seu servidor local.
5. Crie um quadro de testes contendo colunas de texto ou localização com os nomes dos países.
6. Adicione o widget de Board View recém-criado ao quadro.

## Scripts Disponíveis

Tanto os diretórios `frontend` quanto `backend` oferecem um conjunto unificado de scripts npm para fluxos de desenvolvimento:

- `npm run dev`: Inicia o servidor de desenvolvimento local.
- `npm run build`: Compila o código TypeScript/Next.js para produção.
- `npm start`: Executa a versão de produção gerada no build.
- `npm run test`: Executa a suíte de testes Vitest.
- `npm run lint`: Aciona o linter do Biome.
- `npm run format`: Executa o formatador do Biome para corrigir problemas de estilo de código automaticamente.

## Estrutura do Projeto

```text
/
├── backend/
│   ├── src/
│   │   ├── config/       # Configuração da aplicação e variáveis de ambiente
│   │   ├── middlewares/  # Middlewares do Express (CORS, Tratamento de erros)
│   │   ├── routes/       # Definições das rotas da API
│   │   ├── server.ts     # Ponto de entrada da aplicação
│   │   └── app.ts        # Inicialização do aplicativo Express
│   ├── dist/             # Saída compilada do backend
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/          # Páginas do router do Next.js
│   │   ├── components/   # Componentes de UI reutilizáveis (SearchBar, Modal, etc.)
│   │   ├── hooks/        # Hooks personalizados do React (monday.com data, clima)
│   │   └── services/     # Abstrações de requisições à API
│   └── package.json
└── README.md
```

## Contribuindo

1. Certifique-se de que as melhorias sejam desenvolvidas em branches separadas.
2. Valide a qualidade do código com os comandos `npm run lint` e `npm run format` localmente, em ambos os diretórios, antes de cada commit.
3. Garanta que todos os testes automatizados sejam bem-sucedidos através do comando `npm run test`.
4. Siga as diretrizes de conventional commits para descrever suas alterações.

## Licença

Este projeto está licenciado através de ISC License. Consulte as configurações no package.json para mais detalhes.
