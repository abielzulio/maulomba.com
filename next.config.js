/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.in`,
      "maulomba.vercel.app",
      "maulomba.com",
    ], // Add your CDN image url here
  },
}

module.exports = nextConfig
