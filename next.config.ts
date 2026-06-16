import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // antd uses CSS-in-JS; transpile it for stable SSR output.
  transpilePackages: ["antd", "@ant-design/icons", "rc-util", "rc-pagination", "rc-picker"],
};

export default nextConfig;
