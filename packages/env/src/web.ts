import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: (import.meta as any).env,
  emptyStringAsUndefined: true,
});
