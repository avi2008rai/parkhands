BEGIN;

  SELECT * FROM plan(4);

    SELECT has_role('authenticator');
    SELECT has_role('app_anonymous');
    SELECT has_role('app_single_member');
    SELECT has_role('app_super_admin');

  SELECT * FROM finish();

ROLLBACK;
