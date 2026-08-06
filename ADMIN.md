# Admin dashboard setup

The property admin lives at `/admin`.

## Required environment variables

Add these in `.env.local` and in the Vercel project settings:

```
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
BLOB_READ_WRITE_TOKEN=
SESSION_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=Commonwealth Realty <forms@pinpointmailer.com>
```

### Create the stores

1. **Upstash Redis** — In the Vercel dashboard: Storage → Create → Upstash Redis → connect to this project (auto-sets the Redis env vars).
2. **Vercel Blob** — Storage → Create → Blob → connect to this project (sets `BLOB_READ_WRITE_TOKEN`).
3. **SESSION_SECRET** — Generate a long random string, e.g. `openssl rand -hex 32`.

### Allowed admin emails

Only these addresses can receive login codes:

- commonwealthagent@gmail.com
- fryar.renee@gmail.com
- kev@foxpointwd.com
- kev@rockmartholding.com

### Usage

1. Visit `/admin`
2. Enter an allowlisted email
3. Enter the 6-digit code from email
4. Add or delete properties (images upload to Vercel Blob)
