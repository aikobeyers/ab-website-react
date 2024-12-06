import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
        return [
            {
                source: '/api',
                // destination: 'http://localhost:3456/.netlify/functions/server',
                destination: 'https://secret-message-api.netlify.app/.netlify/functions/server',
            },
        ];
    }
};

export default nextConfig;
