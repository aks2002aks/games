/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.jagranjosh.com",
        port: "",
      },
    ],
  },
};

