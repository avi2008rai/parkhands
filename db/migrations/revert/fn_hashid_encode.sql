-- Revert PH:fn_hashid_encode to pg

BEGIN;

DROP FUNCTION util.hashid_encode(num BIGINT, hash_length INTEGER);

COMMIT;
