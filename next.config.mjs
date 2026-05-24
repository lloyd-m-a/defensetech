/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gzip/Brotli compress all responses
  compress: true,

  // Serve optimized images as AVIF then WebP
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Long-lived cache headers for static assets + security headers
  async headers() {
    return [
      {
        // Security headers on every route
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options",         value: "SAMEORIGIN" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://player.vimeo.com https://f.vimeocdn.com https://server.fillout.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://i.vimeocdn.com https://f.vimeocdn.com https://images.unsplash.com",
              "frame-src https://player.vimeo.com https://*.fillout.com",
              "connect-src 'self' https://player.vimeo.com https://f.vimeocdn.com https://api.vimeo.com https://fresnel.vimeocdn.com https://vimeo.com https://*.fillout.com",
              "media-src 'self' blob: https://f.vimeocdn.com https://4d3wdlklqcdgstyo.public.blob.vercel-storage.com",
              "worker-src blob:",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/:path*.(jpg|jpeg|png|webp|avif|gif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
