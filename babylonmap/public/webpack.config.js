module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/public/index",
        permanent: true,
      },
    ];
  },
};
