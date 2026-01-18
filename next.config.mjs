/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_WEBSITE_API_KEY: 'e5362baf-c777-4d57-a609-6eaf1f9e87f6',
  },
};

export default nextConfig;
