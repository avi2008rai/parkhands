-- Deploy PH:type_slot_status_t to pg

SET client_min_messages TO WARNING;

ALTER TYPE public.slot_status_t ADD VALUE IF NOT EXISTS 'unlisted';
ALTER TYPE public.slot_status_t ADD VALUE IF NOT EXISTS 'deleted';

RESET client_min_messages;
