/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  //assetPrefix: '/~s335113/',
  //basePath: '/~s335113',
  env: {
    API: "http://localhost:8080/api",
    USER: "http://localhost:8080/api/users",
    AUTH: "http://localhost:8080/api/auth",
    CITIES: "http://localhost:8080/api/cities",
    HUMAN: "http://localhost:8080/api/human",
    ADMIN: "http://localhost:8080/api/admin",
    LOGOUT: "http://localhost:8080/api/auth/logout",
  },
};

export default nextConfig;
