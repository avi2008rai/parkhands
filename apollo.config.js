module.exports = {
  client: {
    includes: [
      "./web/admin/gql/{queries,mutations}/**/*.{ts,tsx}",
      // "./admin/gql/schema.tsx",
    ],
    service: {
      name: "parkhands-app",
      url: "http://localhost:5000/graphql",
    },
  },
};
