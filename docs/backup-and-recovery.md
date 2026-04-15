# Backup And Recovery

## Scope
- PostgreSQL content and inquiry data
- `public/uploads/admin/` media files
- Environment variables stored outside the repository

## Recommended schedule
- Database: daily full backup plus point-in-time recovery if managed Postgres is available
- Media files: daily incremental backup plus weekly full snapshot
- Secrets: store in the deployment platform secret manager and export a versioned backup on every credential rotation

## Minimum retention
- Daily backups retained for 14 days
- Weekly backups retained for 8 weeks
- Monthly backups retained for 6 months

## Restore drill
1. Restore the database into an isolated staging environment first.
2. Restore media files into the matching `public/uploads/admin/` path.
3. Run `npx prisma migrate deploy`.
4. Smoke test the public site, admin login, inquiry submission, and image rendering.
5. Only then promote the restored environment or repeat the process in production.

## Operational notes
- Published content and redirects should be backed up together so old URLs keep resolving after a restore.
- Inquiry data may contain personal information, so backup storage should remain encrypted and access-controlled.
- Keep one restore rehearsal per quarter to verify that migrations, uploads, and redirects recover cleanly.
