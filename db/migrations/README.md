## Database Migrations via Sqitch

Db migrations are managed with [Sqitch](https://sqitch.org/)

Sqitch is wrapped as docker container and can be used the following way

```
npm run sqitch status dev
npm run sqitch deploy dev
```

### Local installation

<https://sqitch.org/download/>

##### Debian

```
sudo apt-get install sqitch libdbd-pg-perl postgresql-client libdbd-sqlite3-perl sqlite3
```

### Usage via sqitch container

- Status
- Deploy migrations
- Revert migrations
- Rebase migrations (Revert + Deploy)

#### Status

Check current db state:

```
npm run sqitch status
```

#### Deploy

Deploy (if there are changes):

```
npm run sqitch deploy
```

:information_source: If importing from staging or production, note that DB will be downgraded to the version that is deployed respectively on staging or production.

#### Revert

```
npm run sqitch revert --to @v1.0.999
```

:information_source: Where @v1.0.999 is the tag to revert to eg. ~@v1.0.303~

or

```
npm run sqitch revert --to @HEAD^N
```

:information_source: where **N** is number of steps to revert

#### Rebasing

Rebase **N** step behind

```
npm run sqitch rebase @HEAD^N
```

:information_source: Most used for developing sql functionality.

Rebase onto specific version:

```
npm run sqitch rebase --onto @v1.0.303
```

## Usage via locally installed sqitch

- Add migrations
- Rework migrations

:warning: In order to recognize `sqitch.conf` automatically we need to be in the directory `{projectRoot}/db/migrations/`

### Naming convention

- `fn_` functions
- `table_` tables
- `trg_` table triggers
- `seq_` sequences
- `schema_` schemas
- `role_` roles
- `rls_` row-level security
- `grants_` | `grant_` grants
- `extension_` extensions
- `domain_` domains
- `data_` predefined inserts into tables
- `view_` views

### Create new migration (only locally)

```
cd db/migrations
sqitch add new_migration_name --requires req_step_1 --requires req_step_2 -m "message"
```

### Create new version of existing migration (only locally)

```
cd db/migrations
sqitch rework old_migration_name
```

1. The current `old_migration_name` scripts are copied in `reworked/[deploy|revert|verify]/old_migration_name@v1.33.44` respectively to the latest version
1. You need to adjust the `revert` script so it actually reverts the step in the back order
1. You need to make sure that the `deploy` step is forward compatible
   - For functions add `CREATE OR REPLACE FUNCTION`
   - For types `DROP FUNCTION` & `DROP TYPE`
   - Etc.
1. Adjust `tests/old_migration_name` so they reflect the latest version of the DB history - DB tests are not being reworked/versioned in the same way

### Create new tag version

When we get the below error while `sqitch rework table_name`

> Cannot rework "table_name" without an intervening tag.
> Use "sqitch tag" to create a tag and try again

Follow the below commands,

```
cd db/migrations
sqitch tag tag_name
```

_Note: Tag version should be the incremental version of the existing, and last tag version can be verified by using `sqitch tag` command._

After which follow `sqitch rework`

```
sqitch deploy dev
```

Rebase last migration (dev purposes)

```
sqitch rebase HEAD^
```

rebase (undeploy and deploy) migrations up to some tag

```
npm run sqitch rebase --onto @v1.0.312
```

rebase (undeploy and deploy) last N (N=4) migrations

```
npm run sqitch rebase --onto @HEAD^4
```

### RLS

1. Rework `rls_` files
1. Add new section with the new policy name
1. Update `r`,`a`,`w`,`d` to match the policy
1. Find definitions for policies with `\dp api.<table>`
1. Add the compiled definition for the policy text in the expression section `-- policy using expression ---^`
1. Add the compiled definition for the policy text in the check section `-- policy check expression ---^`

Check dedicated migrations RLS verify helper at
https://github.com/camplight/parkhands/blob/master/db/migrations/verify/README.md

## Testing & Logs

You might dump any statements from function body to the logs via:

```sql
RAISE EXCEPTION '>>>>>> %', 'any object here';
```

Watching for the same structure in the DB logs:

```shell
npm run logs-db | grep '>>>>>>' -C 10
```

## Sqitch and Git

Sqitch stores the state of the database internally in schema `sqitch`

```sql
\d sqitch.
```

#### Basic flow

![image](https://user-images.githubusercontent.com/893608/92686205-df1f0f80-f341-11ea-9185-dd1e0edad8dd.png)

#### Stash & Rebase

If you need to stash your local changes keep in mind that your database might be left in a future state. In this case you can `revert` the changes to a common version used on `master` branch.

![image](https://user-images.githubusercontent.com/893608/92686260-fb22b100-f341-11ea-8aeb-e4c20028d730.png)
