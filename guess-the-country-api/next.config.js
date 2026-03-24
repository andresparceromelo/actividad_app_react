/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from flags API
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
