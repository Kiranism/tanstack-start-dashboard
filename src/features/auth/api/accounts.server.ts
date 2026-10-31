////////////////////////////////////////////////////////////////////////////////
// In-memory account store for the demo. Swap these two functions for your
// database (Prisma / Drizzle) or replace the whole auth feature with a provider
// (Supabase, Auth.js, Clerk). Server-only via the `.server.ts` suffix.
////////////////////////////////////////////////////////////////////////////////

import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { DEMO_ACCOUNT } from '../constants';
import type { SessionUser } from './types';

type Account = SessionUser & { passwordHash: string };

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':');
  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

const accounts = new Map<string, Account>([
  [
    DEMO_ACCOUNT.email,
    {
      id: 'demo',
      name: DEMO_ACCOUNT.name,
      email: DEMO_ACCOUNT.email,
      passwordHash: hashPassword(DEMO_ACCOUNT.password)
    }
  ]
]);

const toSessionUser = ({ id, name, email }: Account): SessionUser => ({ id, name, email });

/** Returns the user when the credentials match, otherwise null. */
export function verifyCredentials(email: string, password: string): SessionUser | null {
  const account = accounts.get(email.toLowerCase());
  if (!account || !verifyPassword(password, account.passwordHash)) return null;
  return toSessionUser(account);
}

/** Creates an account, or returns null when the email is already registered. */
export function createAccount(name: string, email: string, password: string): SessionUser | null {
  const key = email.toLowerCase();
  if (accounts.has(key)) return null;
  const account = { id: randomUUID(), name, email: key, passwordHash: hashPassword(password) };
  accounts.set(key, account);
  return toSessionUser(account);
}
