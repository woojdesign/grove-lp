/**
 * Configuration for Grove MVP Showcase iframe URLs
 *
 * Development: Points to localhost:5175 (Grove MVP dev server)
 * Production: Points to deployed Grove MVP showcase app
 */

const isDevelopment = import.meta.env.MODE === 'development';

export const SHOWCASE_BASE_URL = isDevelopment
  ? 'http://localhost:3005'
  : 'https://grove-fe-mvp.vercel.app/'; // Update this URL after deploying Grove MVP

export const SHOWCASE_ROUTES = {
  LISTEN: '/showcase/listen',
  LEARN: '/showcase/learn',
  CONNECT: '/showcase/connect',
} as const;
