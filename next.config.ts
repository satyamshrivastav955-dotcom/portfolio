import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  webpack(webpackConfig, { dev }) {
    // Windows-mounted WSL files may not deliver filesystem watch events.
    if (dev && process.platform === 'linux' && process.cwd().startsWith('/mnt/')) {
      webpackConfig.watchOptions = { ...webpackConfig.watchOptions, poll: 1000, aggregateTimeout: 200 };
    }
    return webpackConfig;
  },
};

export default config;
