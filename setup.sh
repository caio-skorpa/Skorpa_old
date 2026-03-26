#!/bin/bash

echo "🚀 Skorpa - Setup inicial"
echo "========================="
echo ""

# Verifica se .env já existe
if [ -f .env ]; then
    echo "⚠️  Arquivo .env já existe!"
    read -p "Deseja sobrescrever? (s/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "Setup cancelado."
        exit 1
    fi
fi

# Copia .env.example para .env
echo "📝 Criando arquivo .env..."
cp .env.example .env

# Gera JWT_SECRET seguro
echo "🔐 Gerando JWT_SECRET..."
JWT_SECRET=$(openssl rand -base64 32)
sed -i "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" .env

echo ""
echo "✅ Arquivo .env criado com sucesso!"
echo ""
echo "⚠️  IMPORTANTE: Configure sua BRAPI_API_KEY"
echo "   1. Acesse: https://brapi.dev/"
echo "   2. Crie uma conta gratuita"
echo "   3. Copie sua API Key do Dashboard"
echo "   4. Edite o arquivo .env:"
echo ""
echo "   vim .env"
echo "   # ou"
echo "   nano .env"
echo ""
echo "   Substitua: BRAPI_API_KEY=your_brapi_api_key_here"
echo "   Por:       BRAPI_API_KEY=sua_chave_aqui"
echo ""
echo "Próximos passos:"
echo "  npm install    # Instalar dependências"
echo "  npm run dev    # Rodar em desenvolvimento"
echo ""
echo "  Ou com Docker:"
echo "  docker compose --profile dev up -d"
echo ""
