-- Deploy MM:domain_url_t to pg

BEGIN;

CREATE DOMAIN public.url_t AS TEXT
  CONSTRAINT relaxed_url_check
  CHECK (
    VALUE ~* (
    '^'                           -- from start of value
    || 'https?:'                  -- scheme
    || '[/]{2}'                   -- authority start
    || '(\w+(:.+)?@)?'            -- optional userinfo (username:password@)
    || '[0-9a-z._-]{2,254}[.]'    -- host and domain name with trailing dot
    || '[^:/]{2,30}'              -- TLD
    || '(:[0-9]{2,5})?'           -- optional port (authority end)
    || '[/]?[^?#]*'               -- optional path
    || '([?][+%a-z0-9*._~=&-]+)?' -- optional query string
    || '(#\S+)?'                  -- optional fragment identifier
    || '$'                        -- to the end of value
    )::TEXT
  );

COMMENT ON DOMAIN public.url_t
  IS 'Relaxed URL validation based on https://en.wikipedia.org/wiki/URL#Syntax';

COMMIT;
