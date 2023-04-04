export { default } from 'next-auth/middleware';

export const config = { matcher: ['/', '/profile/:id*', '/my-profile', '/mumble/:id*'] };
