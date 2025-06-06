/** @type {import('next').NextConfig} */
const appEnv = process.env.NODE_ENV || 'development'
const {
  serverRuntimeConfig,
  publicRuntimeConfig,
} = require(`./.env/env.${appEnv}`)

const { i18n } = require('./next-i18next.config.js')

const nextConfig = {
  basePath: '/ewallet3/ewallet-client-uaa-cms',
  i18n,
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: false,
  pageExtensions: ['page.tsx', 'api.ts'],
  serverRuntimeConfig,
  publicRuntimeConfig: {
    ...publicRuntimeConfig,
    basePath: '/ewallet3/ewallet-client-uaa-cms',
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
}

const intercept = require('intercept-stdout')
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}
if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout)
}
module.exports = nextConfig
