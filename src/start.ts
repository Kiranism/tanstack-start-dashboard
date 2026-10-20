import { createCsrfMiddleware, createStart } from '@tanstack/react-start';

// Defining a custom start instance disables Start's built-in CSRF protection,
// so register it explicitly for server function requests.
export const startInstance = createStart(() => ({
  requestMiddleware: [createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === 'serverFn' })]
}));
