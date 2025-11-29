export const __esModule: boolean;
/**
 * Auth middleware factory.
 * - `auth()` → just requires a valid token.
 * - `auth(['Admin'])` → requires valid token + role in ['Admin'].
 * - `auth(['Officer','Supervisor','Admin'])`
 */
export function auth(allowedRoles: any): (req: any, res: any, next: any) => Promise<any>;
