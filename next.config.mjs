/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "firebasestorage.googleapis.com"
        },
        {
          protocol: "https",
          hostname: "utfs.io"
        },
        {
          protocol: "https",
          hostname: "img.clerk.com"
        },
        {
          protocol: "https",
          hostname: "subdomain"
        },
        {
          protocol: "https",
          hostname: "via.placeholder.com"
        }
      ],
    }
  };
  
  export default nextConfig;
  