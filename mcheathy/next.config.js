// next.config.js
module.exports = {
    images: {
        domains: ["images.pexels.com"], // Thêm hostname vào đây
    },
    reactStrictMode: false,
    async redirects() {
        return [
          {
            source: "/",
            destination: "/login",
            permanent: true,
          },
        ];
      },
};
