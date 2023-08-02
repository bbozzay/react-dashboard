/** @type {import('next').NextConfig} */
const nextConfig = {
  // bugged for some reason
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path",
  //       destination: "http://localhost:8000/api/v1/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
