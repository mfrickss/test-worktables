# Weather API (Backend)

Uma API RESTful desenvolvida em **Node.js** e **TypeScript** focada em fornecer dados climáticos precisos a partir do nome de um país. A API foi arquitetada priorizando performance, manutenibilidade e segurança no consumo de serviços externos.

## Tecnologias e Arquitetura

- **Runtime & Framework:** Node.js, Express v5
- **Linguagem:** TypeScript
- **Integração Externa:** Axios (para comunicação direta com a [WeatherAPI](https://www.weatherapi.com/))
- **Cache Local In-Memory:** `node-cache` para otimização de requisições, melhora drástica da latência e prevenção contra *rate limits* da API terceira
- **Testes & Cobertura:** Vitest + Supertest
- **Qualidade & Padronização:** Biome (Linting e Formatting de rotina)

---

## Como Executar Localmente

### 1. Pré-requisitos
- Node.js (versão 18+)
- Gerenciador NPM

### 2. Instalação
Clone o projeto e instale as dependências:
```bash
npm install
```

### 3. Variáveis de Ambiente
Crie as variáveis de configuração no seu ambiente a partir do exemplo fornecido. Em seguida, adicione sua chave de API meteorológica:
```bash
cp .env.example .env
```
_**Nota:** A variável `WEATHER_API_KEY` deve conter uma chave de API válida gerada no console da weatherapi.com._

### 4. Iniciando o Servidor
Para iniciar com Live-Reload via `tsx` (ideal para desenvolvimento):
```bash
npm run dev
```
A API estará recebendo requisições localmente (Ex: `http://localhost:3001`, a depender da porta estipulada via `.env`).

---

## Endpoints da Rota REST

A aplicação segue boas práticas RESTful na exposição do seus recursos.

### Obter clima por país
`GET /weather/:country`

Retorna os dados climáticos em tempo real associados à região e à capital de um país específico.

**Exemplo de Resposta Bem Sucedida (`200 OK`)**
```json
{
  "success": true,
  "data": {
    "country": "Brazil",
    "city": "São Paulo",
    "localtime": "2026-04-12 10:30",
    "temperature_c": 26.5,
    "temperature_f": 79.7,
    "condition": "Partly cloudy",
    "condition_icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
    "feels_like_c": 28.5,
    "feels_like_f": 83.3
  }
}
```

### Tipos de Erro e Tratamento Global

A API utiliza códigos e status HTTP semânticos prevenidos por um bloco unificado. Os erros são normalizados da seguinte maneira:

**Exemplo de Erro (`404 Not Found` / `503 Service Unavailable`)**
```json
{
  "success": false,
  "code": "COUNTRY_NOT_FOUND",
  "message": "Não foi possível localizar o país informado ou sua capital."
}
```

---

## Estrutura de Diretórios Básica

```text
src/
├── config/           # Setup inicial, injeção de dependências e variáveis de ambiente
├── controllers/      # Controladores de Rota (Intermediadores Req/Res)
├── services/         # Lógica central da aplicação (Fetch da API Externa, Formatação, Caching)
├── routes/           # Definição e agrupamento dos Endpoints (Express Router)
├── tests/            # Testes (Unitários para regras de negócio e de Integração com a API)
└── server.ts         # Arquivo principal inicializador (Entrypoint)
```

---

## Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local com recarregamento a quente ativo |
| `npm run build` | Transpila e empacota o TypeScript de toda arquitetura em JavaScript para a pasta `/dist` |
| `npm start` | Inicia o Worker do servidor otimizado em produção a partir da Build gerada |
| `npm run test` | Roda testes contínuos utilizando o provedor interativo do Vitest em Watch Mode |
| `npm run test:run`| Executa a matriz de testes uma única vez (Indicado em processos automatizados e pipelines de CI/CD) |
| `npm run lint` | Audita problemas lógicos ou estéticos no código utilizando as políticas do Biome |
| `npm run format`| Formata toda a source de forma forçada aplicando Code Style guidelines da equipe |
| `npm run check` | Aplica as opções Lint e Format ao mesmo tempo verificando aderência completa |

---

## Boas Práticas e Implementações

1. **Gestão de Carga do Sistema Externo**: A integração de um recurso de _Cache-aside_ (via pacote `node-cache`) ampara o backend ao guardar dados válidos previamente requisitados na sua memória. Isso viabiliza melhoria estrondosa na velocidade de processamento (`Tempo de Resposta em ms`) e impossibilita cobranças extras devidas a Rate Limits esgotados.
2. **Robustez Baseada em Camadas:** Emprega a segregação Controller => Service. Além de tornar manutenções mais fáceis, isso permite mocks flexíveis na bateria de testes de uma lógica específica, sem engatilhar ações dependentes.