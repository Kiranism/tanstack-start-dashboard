/** The signed-in user, as stored in the session cookie and exposed to routes. */
export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

/** Server functions return expected failures (wrong password, taken email) as data. */
export type AuthResult = { user: SessionUser; error?: never } | { user?: never; error: string };
