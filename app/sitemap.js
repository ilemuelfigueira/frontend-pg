export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/exclusivos`, lastModified: new Date() },
  ];
}
