/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configuração para produção
  output: 'standalone',
  // Variáveis de ambiente públicas
  env: {
    NEXT_PUBLIC_APP_NAME: 'Skorpa',
  },
}

module.exports = nextConfig
