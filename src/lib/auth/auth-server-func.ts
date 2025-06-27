import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "@/lib/auth/auth-middleware";

export const getUserID = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context?.user?.id;
  });

export const getAvatar = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context?.user?.image;
  });

export const getUserSession = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return context;
  });
