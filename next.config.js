/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    NEXT_PUBLIC_MAPBOXTOKEN: process.env.NEXT_PUBLIC_MAPBOXTOKEN,
    NEXT_PUBLIC_WEATHER:process.env.NEXT_PUBLIC_WEATHER,
    NEXT_PUBLIC_URLAPI: process.env.NEXT_PUBLIC_URLAPI,
    NEXT_PUBLIC_TELEGRAMURL:process.env.NEXT_PUBLIC_TELEGRAMURL,
    NEXT_PUBLIC_WHATSAPP:process.env.NEXT_PUBLIC_WHATSAPP
  },
  images: {
    domains: ['dl.memuplay.com', 'source.unsplash.com']
  }
}

module.exports = nextConfig
