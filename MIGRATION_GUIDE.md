# Guia de Migração - Express para Next.js 15

## 🔄 Mudanças Principais

### Stack Anterior vs Nova Stack

| Antes | Depois |
|-------|--------|
| Express.js | Next.js 15 (App Router) |
| JavaScript | TypeScript 5.7 |
| HTML/CSS | React 19 + Tailwind CSS |
| Arquivos estáticos | Componentes React |
| Rotas Express | API Routes + Pages |
| CSS customizado | Tailwind + Shadcn/ui |

## 📂 Estrutura de Arquivos

### Antes (Express)
```
src/
├── server.js              # Servidor Express
├── routes/
│   └── aporte.js         # Rotas
└── api/
    └── brapi.js          # API externa

public/
├── index.html            # HTML estático
├── css/                  # CSS customizado
└── js/                   # JavaScript vanilla
```

### Depois (Next.js)
```
src/
├── app/                   # App Router
│   ├── api/              # API Routes (substituiu Express routes)
│   ├── dashboard/        # Páginas
│   ├── login/
│   └── layout.tsx
├── components/           # Componentes React
├── lib/                  # Utilitários e serviços
│   ├── services/        # Lógica de negócio
│   └── auth.ts          # Autenticação
└── types/               # TypeScript types

public/                   # Assets estáticos (imagens, etc)
```

## 🔑 Principais Diferenças

### 1. Rotas

**Antes (Express):**
```javascript
// src/routes/aporte.js
router.post("/login", (req, res) => {
  if (login.email === "admin@gmail.com") {
    res.send("Login realizado")
  }
});
```

**Depois (Next.js API Route):**
```typescript
// src/app/api/login/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validação + JWT
  return NextResponse.json({ success: true, token });
}
```

### 2. Frontend

**Antes (HTML/CSS/JS):**
```html
<!-- public/index.html -->
<div class="nav">
  <div class="nav-logo">Skorpa</div>
</div>
<script src="/js/gp.js"></script>
```

**Depois (React/TypeScript):**
```tsx
// src/components/sidebar.tsx
export function Sidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">Skorpa</div>
    </div>
  );
}
```

### 3. Autenticação

**Antes:**
- Login simples sem token
- Sem proteção de rotas

**Depois:**
- JWT tokens
- Middleware de autenticação
- LocalStorage no cliente
- Headers Authorization

### 4. Cotações

**Antes:**
- Sem cache
- Sem scheduler
- Array hardcoded de ações

**Depois:**
- Cache inteligente com TTL
- Scheduler automático (node-cron)
- Busca dinâmica das top 15 ações
- Atualização periódica

## 🚀 Como Testar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

```bash
cp .env.example .env
# Editar .env com sua BRAPI_API_KEY
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

### 4. Testar fluxo completo

1. **Login:**
   - Acesse `/login`
   - Use: admin@gmail.com / 732714
   - Token JWT é salvo no localStorage

2. **Dashboard:**
   - Redirecionado automaticamente após login
   - Sidebar com menu navegável
   - Footer com ticker de cotações animado

3. **API:**
   - `/api/quotes` - Cotações (requer autenticação)
   - `/api/cache-info` - Info do cache
   - `/api/login` - Autenticação

### 5. Testar com Docker

```bash
# Desenvolvimento
docker-compose --profile dev up -d

# Produção
docker-compose up -d

# Ver logs
docker-compose logs -f
```

## 📝 Checklist de Migração

- [x] Configuração Next.js 15 + TypeScript
- [x] Configuração Tailwind CSS
- [x] Sistema de autenticação JWT
- [x] API Routes (login, quotes, cache-info)
- [x] Serviço de cotações com cache
- [x] Scheduler automático
- [x] Página de Login
- [x] Dashboard com Sidebar
- [x] Stock Ticker (footer animado)
- [x] Componentes UI (Button, Card, Input)
- [x] Docker + Docker Compose
- [x] TypeScript types
- [x] Documentação (README)
- [x] .gitignore atualizado

## 🔧 Próximos Passos

### Funcionalidades do HTML original a migrar:

1. **Sistema de Pastas/Favoritos:**
   - Criar/editar pastas
   - Adicionar ações nas pastas
   - Modal de gestão

2. **Páginas faltantes:**
   - `/dashboard/carteira/aportes`
   - `/dashboard/carteira/meus-ativos`
   - `/dashboard/acoes/todos`
   - `/dashboard/acoes/favoritas`
   - `/dashboard/relatorios/*`
   - `/dashboard/config/*`

3. **Banco de Dados:**
   - Prisma + PostgreSQL
   - Models: User, Portfolio, Asset, Contribution, Folder

4. **Features avançadas:**
   - Upload de logos de empresas
   - Cálculos de rentabilidade
   - Gráficos (Chart.js / Recharts)
   - Sistema de notificações

## 🐛 Troubleshooting

### Erro: "Module not found"
```bash
rm -rf node_modules .next
npm install
```

### Erro: "BRAPI_API_KEY not defined"
- Criar arquivo `.env` com `BRAPI_API_KEY=sua_chave`

### Erro no Docker
```bash
docker-compose down
docker-compose up -d --build
```

### TypeScript errors
```bash
npm run type-check
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Brapi Docs](https://brapi.dev/docs)

## 💡 Dicas

1. **Hot Reload**: O Next.js recarrega automaticamente ao salvar arquivos
2. **TypeScript**: Use `Ctrl+Space` para autocompletar
3. **Tailwind**: Use a extensão "Tailwind CSS IntelliSense" no VSCode
4. **Debug**: Use `console.log` ou VSCode debugger
5. **API Testing**: Use Postman ou Thunder Client

---

**Status:** ✅ Migração base completa - Pronto para desenvolvimento de features
