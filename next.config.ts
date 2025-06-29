import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/boostn-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/boostn-platform/' : '',
};

export default withNextIntl(nextConfig);
