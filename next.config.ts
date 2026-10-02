import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // O repositório mantém diretrizes próprias em português no AGENTS.md.
  agentRules: false,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
