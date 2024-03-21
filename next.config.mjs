/** @type {import('next').NextConfig} */
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
