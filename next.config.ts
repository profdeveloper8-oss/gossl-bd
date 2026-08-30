/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tkjgrlfreygjsbmoqxwo.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig