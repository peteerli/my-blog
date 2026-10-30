import { defineConfig } from 'astro/config';

// Static HTML only. Suitable for Cloudflare Pages Free.
// Change `site` if the real pages.dev subdomain or custom domain differs.
export default defineConfig({
  site: 'https://my-blog.pages.dev',
  output: 'static',
});
