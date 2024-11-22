import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
        return [
            {
                source: '/api/quotes',
                destination: 'https://secret-message-api.netlify.app/.netlify/functions/server',
            },
        ];
    }
};

export default nextConfig;
