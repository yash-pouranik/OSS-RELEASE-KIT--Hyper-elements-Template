/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@resvg/resvg-js',
      '@hyper-elements/react',
      '@hyper-elements/email-clients',
      '@hyper-elements/cli',
      '@react-pdf/renderer',
      'satori',
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '@resvg/resvg-js', '@hyper-elements/email-clients'];
    }
    return config;
  },
};

module.exports = nextConfig;
