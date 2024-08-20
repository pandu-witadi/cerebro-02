/** @type {import('next').NextConfig} */
const nextConfig = {
    "output": "export",
    reactStrictMode: false,
    // "typescript": {
    //     "ignoreBuildErrors": true,
    // }
}

// Set assetPrefix only in production/export mode
if (process.env.NODE_ENV === 'production') {
    nextConfig.assetPrefix = '/static';
}

module.exports = nextConfig;
