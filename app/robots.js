export default function robots() {
const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

return {
  rules: {
    allow: [
      `${baseUrl}/exclusivos/*`,
      `${baseUrl}/login`,
    ],
    disallow: [
      `${baseUrl}/api/*`,
      `${baseUrl}/_next/*`,
    ],
  },
  sitemap: `${baseUrl}/sitemap.xml`
}

}