import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Activa el MCP server en /_next/mcp (Next.js 16+)
  experimental: {
    mcpServer: true,
  },
  async rewrites() {
    return [
      // El lead magnet es un HTML estático en public/; esta reescritura le da
      // una URL limpia para los anuncios y el pixel.
      {
        source: "/test-empleabilidad",
        destination: "/test-empleabilidad.html",
      },
    ];
  },
};

export default nextConfig;
