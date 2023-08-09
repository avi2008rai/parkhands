BEGIN;

  SELECT * FROM plan(6);

  SELECT sequences_are('cron'::NAME,
                       ARRAY[
                         'jobid_seq'
                         ]);

  SELECT functions_are('cron'::NAME, ARRAY[
                                    'job_cache_invalidate'
                                    , 'schedule'
                                    , 'unschedule'
                                  ]);

  SELECT types_are('cron'::NAME, '{}');

  SELECT domains_are('cron'::NAME, '{}');

  SELECT views_are('cron'::NAME, '{}');

  SELECT tables_are('cron'::NAME, ARRAY[
                                    'job'
                                  ]);

  SELECT * FROM finish();

ROLLBACK;
