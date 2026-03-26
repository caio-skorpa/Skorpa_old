# Skorpa - Plataforma de Gestão de Investimentos

![Next.js](https://img.shields.io/badge/Next.js-15.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

Plataforma moderna para gestão de carteira de investimentos na B3, desenvolvida com Next.js 15, TypeScript e Tailwind CSS.

## ⚡ Quick Start

**Método 1 - Setup automático (recomendado):**
```bash
git clone https://github.com/caiogomesfontoura/The-Skorpa.git
cd Skorpa
./setup.sh        # Configura .env automaticamente
npm install
npm run dev
```

**Método 2 - Setup manual:**
```bash
# 1. Clone o repositório
git clone https://github.com/caiogomesfontoura/The-Skorpa.git
cd Skorpa

# 2. Configure o ambiente
cp .env.example .env
# Edite .env e adicione sua BRAPI_API_KEY (obtenha em https://brapi.dev/)

# 3. Instale e execute
npm install
npm run dev
```

**Método 3 - Com Docker:**
```bash
cp .env.example .env
# Edite .env com sua BRAPI_API_KEY
docker compose --profile dev up -d
```

**Acesse:** http://localhost:3000
**Login:** admin@gmail.com / **Senha:** 732714

## 🚀 Features

- ✅ **Autenticação JWT** - Sistema de login seguro com tokens
- ✅ **Cotações em Tempo Real** - Integração com Brapi API
- ✅ **Cache Inteligente** - Sistema de cache com TTL configurável
- ✅ **Scheduler Automático** - Atualização periódica de cotações
- ✅ **Dashboard Interativo** - Interface moderna e responsiva
- ✅ **Slider de Cotações** - Ticker animado com preços das ações
- ✅ **Sidebar Navegável** - Menu organizado por categorias
- ✅ **TypeScript** - Type safety em toda aplicação
- ✅ **Docker Ready** - Deploy facilitado com containers

## 📋 Pré-requisitos

- Node.js 20+
- npm ou yarn
- Docker e Docker Compose (opcional)
- Chave API da Brapi (https://brapi.dev/)

## 🛠️ Instalação

### 1. Clone o repositório

\`\`\`bash
git clone https://github.com/caiogomesfontoura/The-Skorpa.git
cd Skorpa
\`\`\`

### 2. Configure as variáveis de ambiente

\`\`\`bash
cp .env.example .env
\`\`\`

**IMPORTANTE:** Obtenha sua chave da Brapi API:

1. Acesse: **https://brapi.dev/**
2. Crie uma conta gratuita
3. Acesse o Dashboard e copie sua API Key
4. Edite o arquivo \`.env\` e substitua \`your_brapi_api_key_here\` pela sua chave

\`\`\`env
BRAPI_API_KEY=sua_chave_brapi_aqui
\`\`\`

**Nota:** O \`JWT_SECRET\` já está configurado automaticamente. A aplicação funcionará sem a chave Brapi, mas usará dados de fallback (mock). Para cotações reais da B3, configure a \`BRAPI_API_KEY\`.

### 3. Instale as dependências

\`\`\`bash
npm install
\`\`\`

### 4. Execute a aplicação

**Opção A - Desenvolvimento local (recomendado para desenvolvimento):**
\`\`\`bash
npm run dev
\`\`\`

**Opção B - Com Docker (desenvolvimento com hot-reload):**
\`\`\`bash
# Linux/Mac
docker compose --profile dev up -d

# Ou com sudo se necessário
sudo docker compose --profile dev up -d
\`\`\`

**Opção C - Produção:**
\`\`\`bash
# Sem Docker
npm run build
npm start

# Com Docker
docker compose up -d
\`\`\`

A aplicação estará disponível em: **http://localhost:3000**

**Credenciais de teste:**
- Email: \`admin@gmail.com\`
- Senha: \`732714\`

## 🐳 Docker

### Desenvolvimento

\`\`\`bash
docker-compose --profile dev up -d
\`\`\`

### Produção

\`\`\`bash
docker-compose up -d
\`\`\`

### Comandos úteis

\`\`\`bash
# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Rebuild
docker-compose up -d --build
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
Skorpa/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── api/               # API Routes
│   │   │   ├── login/         # Autenticação
│   │   │   ├── quotes/        # Cotações
│   │   │   └── cache-info/    # Info do cache
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── login/             # Página de login
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Home (redirect)
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes UI base
│   │   ├── sidebar.tsx       # Menu lateral
│   │   └── stock-ticker.tsx  # Slider de cotações
│   ├── lib/                   # Utilitários e serviços
│   │   ├── services/         # Serviços de negócio
│   │   │   ├── quotes.service.ts
│   │   │   └── scheduler.service.ts
│   │   ├── auth.ts           # Autenticação JWT
│   │   └── utils.ts          # Funções utilitárias
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── instrumentation.ts     # Inicialização do scheduler
├── public/                    # Assets estáticos
├── Dockerfile                 # Container de produção
├── Dockerfile.dev            # Container de desenvolvimento
├── docker-compose.yml        # Orquestração Docker
├── next.config.js            # Configuração Next.js
├── tsconfig.json             # Configuração TypeScript
├── tailwind.config.ts        # Configuração Tailwind
└── package.json              # Dependências
\`\`\`

## 🔐 Autenticação

### Login Padrão

- **Email:** admin@gmail.com
- **Senha:** 732714

### API Endpoints

#### POST /api/login
Autentica usuário e retorna JWT token.

**Request:**
\`\`\`json
{
  "email": "admin@gmail.com",
  "password": "732714"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "admin@gmail.com",
    "name": "Caio",
    "role": "admin"
  }
}
\`\`\`

#### GET /api/quotes
Retorna cotações das top 15 ações (Protegido).

**Headers:**
\`\`\`
Authorization: Bearer {token}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "symbol": "PETR4",
      "shortName": "PETROBRAS PN",
      "regularMarketPrice": 38.50,
      "regularMarketChange": 0.75,
      "regularMarketChangePercent": 1.99,
      "regularMarketTime": "2026-03-26T18:00:00.000Z",
      "currency": "BRL",
      "marketCap": 500000000000,
      "volume": 45000000
    }
  ],
  "meta": {
    "lastUpdate": "2026-03-26T14:30:00.000Z",
    "cached": true,
    "count": 15
  }
}
\`\`\`

#### GET /api/cache-info
Informações sobre o cache de cotações (Protegido).

## ⚙️ Configurações

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor | 3000 |
| `NODE_ENV` | Ambiente (development/production) | production |
| `BRAPI_API_KEY` | Chave API Brapi | - |
| `JWT_SECRET` | Segredo JWT | - |
| `JWT_EXPIRES_IN` | Expiração do token | 24h |
| `CACHE_TTL` | TTL do cache (ms) | 900000 (15min) |
| `SCHEDULER_INTERVAL` | Intervalo scheduler (min) | 15 |

## 🎨 Stack Tecnológica

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript 5.7
- **UI:** React 19 + Tailwind CSS 3.4
- **Componentes:** Shadcn/ui + Lucide Icons
- **Estado:** Zustand
- **Autenticação:** JWT (jsonwebtoken)
- **API Financeira:** Brapi
- **Scheduler:** node-cron
- **Container:** Docker + Docker Compose

## 🐛 Troubleshooting

### Erro: "env file .env not found"
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

### Warning: "version is obsolete" (Docker Compose)
Este é apenas um aviso informativo. A aplicação funcionará normalmente. O atributo `version` não é mais necessário no Docker Compose v2+.

### Erro: "Module not found" ou problemas com dependências
```bash
rm -rf node_modules .next package-lock.json
npm install
```

### Erro: "BRAPI_API_KEY not defined"
1. Certifique-se de ter criado o arquivo `.env`
2. Obtenha sua chave em: https://brapi.dev/
3. Adicione a chave no arquivo `.env`

### Erro no Docker: "port already in use"
```bash
# Verifique se algo está rodando na porta 3000
sudo lsof -i :3000
# Ou mude a porta no .env
PORT=3001
```

### Problemas com permissão no Docker (Linux)
```bash
# Adicione seu usuário ao grupo docker
sudo usermod -aG docker $USER
# Faça logout e login novamente
```

### TypeScript errors
```bash
npm run type-check
```

### Rebuild completo do Docker
```bash
docker compose down
docker compose up -d --build
```

## 🚧 Roadmap

- [ ] Integração com banco de dados (Prisma + PostgreSQL)
- [ ] Sistema de carteira de investimentos
- [ ] Cálculo de rentabilidade
- [ ] Histórico de aportes
- [ ] Relatórios e gráficos
- [ ] Sistema de favoritos e pastas
- [ ] Notificações de dividendos
- [ ] Dark mode
- [ ] PWA

## 📝 Licença

ISC

## 👨‍💻 Autor

Desenvolvido com ❤️ por Caio

---

**Deploy:** Ready for Vercel, Railway, AWS, or any Node.js hosting platform
