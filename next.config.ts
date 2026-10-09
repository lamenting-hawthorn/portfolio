import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory otherwise makes Next infer the
  // wrong workspace root, which breaks module resolution for nested deps.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
