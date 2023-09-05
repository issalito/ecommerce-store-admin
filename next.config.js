// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['mandara-ecommerce.s3.amazonaws.com'], // Add your image domain here
    },
}

module.exports = nextConfig;