/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: true,
  },
  redirects: async () => {
    return [
      {
        source: '/whatsapp',
        destination: 'https://wa.me/' + process.env.WHATSAPP_LOJA,
        permanent: false,
        basePath: false
      },
    ]
  },
};

module.exports = nextConfig;
