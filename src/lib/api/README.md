# API + Auth + RBAC layer

This directory (plus `src/lib/session`, `src/lib/rbac`, `src/features/auth`,
`src/providers`, and the BFF route handlers in `src/app/api/auth`) implements
authentication, session management, token refresh, and role-based access
control for the QBTECH frontend.

> **Source of truth for endpoints/DTOs:** the backend Swagger at
> `http://localhost:4000/docs`. URLs are built once from
> `NEXT_PUBLIC_API_BASE_URL` → `${BASE}/api/v1` in [`config.ts`](./config.ts).
> Never hardcode versioned URLs.

---

## 1. Auth flow (login)

```
LogInForm
  └─ useAuth().login({ email, password })
       └─ features/auth → POST /api/auth/login   (same-origin BFF route handler)
            └─ backend POST /api/v1/auth/email/login
                 → { token, refreshToken, tokenExpires, user }
            └─ BFF sets httpOnly cookies: qb_rt (refresh), qb_sess (role hint),
               and qb_auth (non-httpOnly presence flag)
            └─ returns { accessToken, tokenExpires, user } to the browser
       └─ setSession(accessToken)        → stored IN MEMORY only
       └─ getMe()                        → GET /api/v1/auth/me (Bearer access)
       └─ resolveHome(user)              → redirect to /admin | /educator | /learner
```

The **refresh token never reaches client JavaScript** — it lives only in the
`qb_rt` httpOnly cookie, read server-side by the BFF.

**Admin portal** (`/admin/login`): `AdminLoginForm` calls
`useAuth().login(input, { portal: 'admin' })`, which posts to
`POST /api/auth/admin/login` instead. Both login routes are thin wrappers
around the shared handler in `src/app/api/auth/_lib/handle-login.ts`; the
admin route passes `requiredRole: ROLE.ADMIN`, so non-admin accounts get a
**403 before any session cookies are set**. Refresh and logout stay shared —
they are role-agnostic.

## 2. Refresh flow (silent, single-flight)

The shared axios instance ([`http.ts`](./http.ts)) has a response interceptor:

```
request → 401
  → refreshSession()           (src/lib/session/refresh.ts)
       POST /api/auth/refresh   (BFF reads qb_rt, calls backend refresh,
                                 rotates qb_rt, returns new access token)
  → success: retry the original request once with the new token
  → failure: clearSession() + redirect to /auth/login
```

`refreshSession()` is **single-flight**: concurrent 401s all await the _same_
in-flight promise, so the refresh endpoint is hit exactly once and every queued
request replays with the new token. Each request is retried at most once
(`_retry` guard) to avoid loops.

## 3. Session layer (`src/lib/session`)

| Concern                                  | Where                   | Storage                 |
| ---------------------------------------- | ----------------------- | ----------------------- |
| Access token + expiry                    | `access-token-store.ts` | **memory only**         |
| `getSession`/`setSession`/`clearSession` | `session.ts`            | memory                  |
| Silent refresh (single-flight)           | `refresh.ts`            | calls BFF               |
| Cookie names + options                   | `cookie-names.ts`       | shared constants        |
| httpOnly cookie read/write               | `server-cookies.ts`     | `next/headers` (server) |

Cookies:

- `qb_rt` — httpOnly refresh token (XSS-safe).
- `qb_sess` — httpOnly JSON `{ roleIds }`, used by middleware for routing.
- `qb_auth` — non-httpOnly `"1"` flag so the client knows whether to attempt a
  silent refresh on load (anonymous users skip the call).

All are `sameSite=lax` and `secure` in production (CSRF-aware; state-changing
auth calls are same-origin POSTs and API calls authenticate via the
`Authorization` header rather than a cookie).

## 4. RBAC resolution (`src/lib/rbac`, `src/constants/roles.ts`)

- Role UUIDs live **only** in `src/constants/roles.ts` (`ROLE`).
- `hasRole(user, role)` / `hasAnyRole(user, roles)` — a user owns a role iff
  `user.roles.some(r => r.id === ROLE_UUID)`.
- `resolveHome(user)` — primary role by `ROLE_PRIORITY`
  (admin → educator → learner) → its `ROLE_HOME` route.

## 5. Proxy behaviour (`src/proxy.ts`, Next 16 — formerly "middleware")

For protected prefixes (see `PROTECTED_ROUTES`):

1. No `qb_rt` cookie → redirect `/auth/login?from=<path>`.
2. `qb_sess` role hint lacks the required role → redirect `/unauthorized`.
3. Otherwise continue.

This is a **UX gate**. The real authorization boundary is the backend (every
API call is verified there). If `qb_rt` is actually invalid, the page's silent
refresh fails and the client redirects to login.

> Next.js 16 renamed the `middleware` file convention to `proxy` (file
> `src/proxy.ts`, exported function `proxy`). Behaviour is identical.

## 6. Adding a new role-protected route

1. Add the route group/pages as usual.
2. Add one entry to `PROTECTED_ROUTES` in
   `src/lib/rbac/protected-routes.ts`: `{ prefix: '/reports', role: ROLE.ADMIN }`.
3. Add the matching prefix to the `config.matcher` array in
   `src/proxy.ts` (the matcher is static and can't import the table).
4. (Optional) Wrap in-page UI with `<RoleGate roles={[ROLE.ADMIN]}>` for a
   second client-side gate.

## 7. Future extension points

- **New domains** (courses, enrollments, …): add `src/features/<domain>/
<domain>.api.ts` with zod-validated functions using the shared `http`
  instance; re-export from a barrel. Never call axios directly in components.
- **Caching/dedup**: `@tanstack/react-query` can wrap these functions later;
  the API layer stays unchanged.
- **New roles**: extend `ROLE`, `ROLE_PRIORITY`, `ROLE_HOME`, `ROLE_LABEL` in
  one file.
