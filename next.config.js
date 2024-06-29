/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ljgdfxvbwvrxsltyjutg.supabase.co",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/whatsapp",
        destination: "https://wa.me/" + process.env.WHATSAPP_LOJA,
        permanent: false,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
