/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ljgdfxvbwvrxsltyjutg.supabase.co',
        port: '',
        pathname: '/storage/**'
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/whatsapp',
        destination: 'https://wa.me/' + process.env.WHATSAPP_LOJA,
        permanent: false,
        basePath: false
      },
      {
        source: '/',
        destination: '/exclusivos/obsidian',
        permanent: false,
        basePath: false
      },
      {
        source: '/obsidian',
        destination: '/exclusivos/obsidian',
        permanent: false,
        basePath: false
      }
    ]
  },
};

module.exports = nextConfig;
