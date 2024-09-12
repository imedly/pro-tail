/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "original-civet-561.convex.cloud",
        },
      ],
    },
  };
  
  export default nextConfig;